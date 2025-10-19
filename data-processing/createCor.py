import os
import json

# Directory to search
directory = "../bill-data/"   # change this to your path
output_file = "bills.cor"

# Open output file in append mode
uids = []
with open(output_file, "w", encoding="utf-8") as out_f:
    # Walk through directory recursively
    for cat in os.listdir("../bill-data"):
        for file in os.listdir(f"../bill-data/{cat}"):
            if file.endswith(".json"):
                uid = file[:-5]
                try:
                    with open(f"../bill-data/{cat}/{file}", "r", encoding="utf-8") as f:
                        data = json.load(f)
                        if "summary" in data:
                            summary = data["summary"].strip().replace("\n", " ")
                            out_f.write(summary + "\n")
                            print(f"Added summary from: {cat}/{file}")
                        uids.append(uid)
                except Exception as e:
                    print(f"Error reading {cat}/{file}: {e}")
with open("uids.txt", 'w') as f:
    for uid in uids:
        f.write(uid + "\n")
