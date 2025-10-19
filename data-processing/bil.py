import psycopg2
lines=[]
with open("complete.txt", 'r') as f:
    for line in f:
        lines.append(line[:-1])

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
    cursor.execute("SELECT uid FROM bills")
    bill_uid_fax = [uid[0] for uid in cursor.fetchall()]
    print(len(bill_uid_fax)-len(bill_uids))