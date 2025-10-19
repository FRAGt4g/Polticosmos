import os

CATEGORIES = [
    "Legislation & Policy", "Criminal Justice & Law Enforcement", "Economic & Fiscal Policy", 
    "Healthcare & Public Health", "Social & Civil Rights", "Environmental & Energy Policy", 
    "National Security & Defense", "Education & Workforce Development", "Immigration & Border Security", 
    "Foreign Relations & Diplomacy", "Technology & Innovation", "Veterans Affairs", "Taxation & Budget", 
    "Housing & Urban Development", "Transportation & Infrastructure", "Labor & Employment", 
    "Agriculture & Rural Development", "Disaster Relief & Recovery", "Consumer Protection & Safety", 
    "Family & Social Services"
]

lengths = [len([f for f in os.listdir(f"../bill-data/{cat}/") if f.endswith(".json")]) for cat in CATEGORIES]

cat_points = []
with open("cat_points.txt") as f:
    for line in f:
        line = line.strip()
        cat_points.append([float(d) for d in line.split(" ")])

print(sum(lengths))
with open("points.txt") as f:
    print(len(f.read().split("\n")))

points = []
with open("points.txt") as f:
    catIdx = 0
    withinCatIdx = 0
    for line in f:
        line = line.strip()
        points.append([float(d)+cat_points[catIdx][i] for i,d in enumerate(line.split(" "))])
        withinCatIdx += 1
        if withinCatIdx >= lengths[catIdx]:
            withinCatIdx = 0
            catIdx += 1
            catIdx = min(catIdx, len(cat_points)-1)

with open("adjusted_points.txt", "w") as f:
    for p in points:
        f.write(' '.join([str(d) for d in p])+"\n")

import matplotlib.pyplot as plt
x_vals = [p[0] for p in points]
y_vals = [p[1] for p in points]
z_vals = [p[2] for p in points]

fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')

# Scatter plot
ax.scatter(x_vals, y_vals, z_vals, c='r', marker='o')

plt.show()
