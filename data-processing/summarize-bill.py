from google import genai
import psycopg2
import requests
import re

client = genai.Client()

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

def call_gemini_api(bill_text, tags, categories):
    # Construct the prompt to guide the LLM
    prompt = f"""
    You are tasked with processing a congressional bill. Here is the bill text:
    
    "{bill_text}"
    
    Please perform the following tasks:
    1. Generate a concise 100-word summary of the bill.
    2. Create a list of relevant tags based on the bill's content. Use the tags from the list below:
        {', '.join(tags)}
    3. Assign a single category to the bill from the list below:
        {', '.join(categories)}

    Please output the response text in a JSON format similar to below:
    {{
        "summary": "This bill aims to prevent gun trafficking by introducing new criminal penalties for trafficking firearms. Violators could face up to 20 years in prison, and the U.S. Sentencing Commission is directed to review sentencing guidelines. It also allows exceptions for certain firearm gifts and ensures stricter penalties for those involved in large-scale trafficking operations.",
        "tags": ["Gun trafficking", "Firearm regulation", "Criminal justice", "National security"],
        "category": "Legislation & Policy"
    }}
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    return reponse.text

# Define the function to save the output to a JSON file
def save_LLM_response_to_json(response_text, filename="bill_summary.json"):
    output_data = json.loads(response_text)
    output_dir = f"../bill-data/{output_data["category"]}/"
    with open(output_dir + filename, "w") as f:
        json.dump(output_data, f, indent=4)

def process_bill(bill_text, tags, categories, filename="bill_summary.json"):
    # Call the Gemmini API to get the bill summary, tags, and category
    response_text = call_gemini_api(bill_text, tags, categories)

    # If the result is valid, save the output to a JSON file
    if result:
        save_LLM_response_to_json(response_text, filename)

# Scrape raw text from congress given a specific bill uid
def get_bill_text(uid):
    congress = uid.split("-")[0]
    chamber = "house" if uid.split("-")[1] == "hr" else "senate"
    number = uid.split("-")[2]
    html = requests.get(f"https://www.congress.gov/bill/{congress}th-congress/{chamber}-bill/{number}/text/pcs?format=txt").text

    return re.search('(?<=<pre id="billTextContainer">)((.|\n)*)(?=</pre>)').group(1)

if __name__ == '__main__':
    # Connect to the bill database
    conn = psycopg2.connect(
        dbname="postgres",
        user="postgres",
        password="dev",
        host="fe80::14b2:c1e1:3c47:8748%en0"
    )

    # Fetch every row in the database (where each one represents a different bill)
    cursor = conn.cursor()
    cursor.execute("SELECT uid FROM bills")
    bill_uids = cursor.fetchall()

    for uid in bill_uids:
        bill_text = get_bill_text(uid)
        filename = f"{uid}.json"
        process_bill(bill_text, TAGS, CATEGORIES, filename)
