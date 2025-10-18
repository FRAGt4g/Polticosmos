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

def load_json_files(directory):
    files = [f for f in os.listdir(directory) if f.endswith('.json')]
    bills = []
    for file in files:
        with open(os.path.join(directory, file), 'r') as f:
            bills.append(json.load(f))
    return bills

def tags_per_category(category):
    categorized_bills = load_json_files(f"../bill-data/{category}/")
    aggregate_tags = []
    
    for bill in categorized_bills:
        for tag in bill.tags:
            aggregate_tags.append(tag)
    
    unique_tags = set(aggregate_tags)
    return unique_tags

def jaccard_index_between_categories(category_a, category_b):
    tags_a = tags_per_category(category_a)
    tags_b = tags_per_category(category_b)

    intersection = len(tags_a.intersection(tags_b))
    union = len(tags_a.union(tags_b))
    
    return intersection / union if union != 0 else 0