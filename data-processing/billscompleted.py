import os

for root, _, files in os.walk('../bill-data'):
    for name in files:
        if name.endswith('.json'):
            base = os.path.splitext(name)[0]
            print(base)