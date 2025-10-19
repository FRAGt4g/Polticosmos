import psycopg2
from urllib.parse import quote
conn = psycopg2.connect(
        dbname="postgres",
        user="postgres",
        password="dev",
        host="75.81.64.177"
    )
cursor = conn.cursor()
cursor.execute("SELECT * FROM bills")
bills = cursor.fetchall()
cursor.execute("SELECT * FROM reps")
reprs = cursor.fetchall()
cursor.execute("SELECT * FROM votes")
votes = cursor.fetchall()
rep_percs = []
confidences = []
importances = [] 
titles = []
with open("uids.txt") as uids:
    for uid in uids:
        uid = uid.strip()
        values = [r for r in bills if r[0] == uid][0]
        
        dems = 0
        reps = 0
        confidence = 1
        importance = 0
        if values[-1] != None or values[-2] != None:
            for i in range(-2, 0):
                if values[i] != None:
                    importance += 3
                    vote = [v for v in votes if v[0] == values[i]][0]
                    dems += len([r for r in vote[1] if [rep for rep in reprs if rep[0] == r][0][3] == 'D'])
                    reps += len([r for r in vote[1] if [rep for rep in reprs if rep[0] == r][0][3] == 'R'])
        else:
            dems += len([r for r in values[-5] if [rep for rep in reprs if rep[0] == r][0][3] == 'D'])
            reps += len([r for r in values[-5] if [rep for rep in reprs if rep[0] == r][0][3] == 'R'])
            dems += len([r for r in values[6] if [rep for rep in reprs if rep[0] == r][0][3] == 'D'])
            reps += len([r for r in values[6] if [rep for rep in reprs if rep[0] == r][0][3] == 'R'])
            confidence = min((dems+reps)/15, 1)
        if dems+reps == 0:
            confidence = 0
            rep_perc = 0
        else:
            rep_perc = reps/(dems+reps)
        confidences.append(confidence)
        importance += 2*(len([c for c in values[-4] if c == ','])+1)
        importance += len(values[8])
        rep_percs.append(rep_perc)
        importances.append(importance)
        titles.append(quote(values[4]))

with open("colors.txt", "w") as f:
    for num in range(len(rep_percs)):
        f.write(str(confidences[num]) + " " + str(rep_percs[num]) +  " " + str(importances[num])+" "+titles[num] + "\n")

