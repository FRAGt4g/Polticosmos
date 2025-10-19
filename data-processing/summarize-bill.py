import os
import psycopg2
import requests
import json
from xml.etree import ElementTree
from concurrent.futures import ThreadPoolExecutor, as_completed
from openai import OpenAI

# Initialize client
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key="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",
)

lines=[]
with open("complete.txt", 'r') as f:
    for line in f:
        lines.append(line[:-1])

# All possible tags for bills
TAGS = [
    "Education", "Healthcare", "Gun control", "Immigration", "Criminal justice reform", 
    "Economic recovery", "Environmental protection", "National security", "Labor rights", 
    "Social security", "Infrastructure", "Tax reform", "Veterans' issues", "Consumer protection", 
    "Housing", "Civil rights", "Technology regulation", "Cybersecurity", "Trade policy", 
    "Foreign relations", "Bipartisanship", "Public safety", "Economic stimulus", "National defense", 
    "Privacy", "Free speech", "Equality", "Transparency", "Constitutional rights", "COVID-19 response", 
    "Climate change", "Voting rights", "Police reform", "Immigration reform", "Opioid crisis", 
    "Terrorism prevention", "Healthcare access", "LGBTQ+ rights", "Gun violence prevention", 
    "Rural development", "Urban renewal", "Minority rights", "Women's rights", "Indigenous communities", 
    "LGBTQ+ community", "Youth programs", "Elderly care", "Executive orders", "Supreme Court rulings", 
    "Constitutional amendments", "International treaties", "Federal agency action", "Judicial reform", 
    "Infrastructure projects", "Public works", "Worker rights", "Minimum wage", "Unions", 
    "Job creation", "Workplace safety", "Farming", "Agriculture subsidies", "Food security", 
    "Natural disaster recovery", "Emergency response", "Government aid", "Family services", "Welfare programs"
]

# All possible categories for bills
CATEGORIES = [
    "Legislation & Policy", "Criminal Justice & Law Enforcement", "Economic & Fiscal Policy", 
    "Healthcare & Public Health", "Social & Civil Rights", "Environmental & Energy Policy", 
    "National Security & Defense", "Education & Workforce Development", "Immigration & Border Security", 
    "Foreign Relations & Diplomacy", "Technology & Innovation", "Veterans Affairs", "Taxation & Budget", 
    "Housing & Urban Development", "Transportation & Infrastructure", "Labor & Employment", 
    "Agriculture & Rural Development", "Disaster Relief & Recovery", "Consumer Protection & Safety", 
    "Family & Social Services"
]


def xml_to_text(xml_string):
    """Convert XML to plain text."""
    try:
        root = ElementTree.fromstring(xml_string)
        return ''.join(root.itertext()).strip()
    except ElementTree.ParseError as e:
        print(f"Error parsing XML: {e}")
        return ""


def get_bill_text(uid):
    """Scrape bill text from congress.gov XML."""
    try:
        congress, chamber, number = uid.split("-")
        for magic in ['i'+chamber[0], 'r'+chamber[0], 'e'+chamber[0], 'rfs', 'rfh', 'pc'+chamber[0], 'enr']:
            code = f"{congress}{chamber}{number}{magic}"
            xml = requests.get(f"https://www.govinfo.gov/content/pkg/BILLS-{code}/xml/BILLS-{code}.xml", timeout=10).text
            if 'DOCTYPE html' in xml: continue
            
            return xml_to_text(xml)
        raise RuntimeError(f"{uid} FAILED")
    except Exception as e:
        print(f"Failed to fetch bill {uid}: {e}")
        return ""


def call_gemini_api(bill_text, tags, categories):
    """Call LLM API."""
    prompt = f"""
    You are tasked with processing a congressional bill. Here is the bill text:

    "{bill_text}"

    Please:
    1. Summarize the bill in ~100 words.
    2. Suggest relevant tags from: {', '.join(tags)}
    3. Pick one category from: {', '.join(categories)}

    Return JSON:
    {{
        "summary": "...",
        "tags": [...],
        "category": "..."
    }}
    """

    try:
        response = client.chat.completions.create(
            model="google/gemini-2.0-flash-lite-001",
            messages=[{"role": "user", "content": [{"type": "text", "text": prompt}]}]
        )
        print(response.choices[0].message.content.replace("```json", "").replace("```", "").strip())
        return response.choices[0].message.content.replace("```json", "").replace("```", "").strip()
    except Exception as e:
        print(f"API error: {e}")
        return ""


def save_LLM_response_to_json(response_text, filename):
    """Save API response JSON to file."""
    try:
        output_data = json.loads(response_text)
        category = output_data.get("category", "Uncategorized")
        output_dir = os.path.join("..", "bill-data", category)
        os.makedirs(output_dir, exist_ok=True)
        with open(os.path.join(output_dir, filename), "w") as f:
            json.dump(output_data, f, indent=4)
    except Exception as e:
        print(f"Failed to save {filename}: {e}")


def process_bill(uid):
    """Full pipeline for a single bill."""
    bill_text = get_bill_text(uid)
    if not bill_text:
        return f"{uid}: Failed to fetch text."
    response_text = call_gemini_api(bill_text, TAGS, CATEGORIES)
    if not response_text:
        return f"{uid}: API error."

    save_LLM_response_to_json(response_text, f"{uid}.json")
    return f"{uid}: Done."


if __name__ == "__main__":
    # Connect to database
    conn = psycopg2.connect(
        dbname="postgres",
        user="postgres",
        password="dev",
        host="75.81.64.177"
    )
    cursor = conn.cursor()
    cursor.execute("SELECT uid FROM bills")
    bill_uids = [uid[0] for uid in cursor.fetchall() if uid[0] not in lines]

    # === Run parallel threads ===
    MAX_WORKERS = 1000
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        futures = {executor.submit(process_bill, uid): uid for uid in bill_uids}
        for future in as_completed(futures):
            print(future.result())
