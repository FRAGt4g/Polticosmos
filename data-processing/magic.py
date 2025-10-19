import numpy as np
from sklearn.manifold import TSNE
import matplotlib.pyplot as plt
array = []

with open("similarityMatrix.txt", "r", encoding="utf-8") as f:
    for line in f:
        # Split the line by spaces and convert each element to float (or int if needed)
        row = [abs(1 - float(x)) for x in line.strip().split()]
        array.append(row)
X= np.array(array)
points = TSNE(n_components=3, learning_rate='auto',
                  init='random', metric = 'precomputed', perplexity=3).fit_transform(X)
x_vals = [p[0] for p in points]
y_vals = [p[1] for p in points]
z_vals = [p[2] for p in points]

with open("points.txt", "w") as f:
    for row in points:
        for col in row:
            f.write(str(col) + " ")
        f.write("\n")
# Create 3D figure
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')

# Scatter plot
ax.scatter(x_vals, y_vals, z_vals, c='r', marker='o')

plt.show()
