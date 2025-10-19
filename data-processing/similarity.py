import os
import json


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
        for tag in bill["tags"]:
            aggregate_tags.append(tag)
    
    unique_tags = set(aggregate_tags)
    return unique_tags

TAGS = {c: tags_per_category(c) for c in CATEGORIES}

def jaccard_index_between_categories(category_a, category_b):
    tags_a = TAGS[category_a]
    tags_b = TAGS[category_b]

    intersection = len(tags_a.intersection(tags_b))
    union = len(tags_a.union(tags_b))
    
    return intersection / union if union != 0 else 0
folders = os.listdir("../bill-data/")
array = [[None for c in CATEGORIES] for c2 in CATEGORIES]

for folder in folders:
    for folder2 in folders:
        array[CATEGORIES.index(folder)][CATEGORIES.index(folder2)] = jaccard_index_between_categories(folder,folder2)


while True:
    a = int(input("Choose"))
    b = int(input("Choose"))
    print(array[a][b])