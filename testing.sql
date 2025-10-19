CREATE TYPE state AS ENUM ('introduced', 'house', 'senate', 'conference', 'conference_house', 'conference_senate', 'conference_passed', 'president', 'veto', 'veto_house', 'veto_senate', 'veto_overridden', 'law');
CREATE TYPE party AS ENUM ('D', 'R', 'I');
CREATE TYPE bill_type AS ENUM ('hr', 's');
CREATE TABLE reps (
  uid TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  state VARCHAR(2) NOT NULL,
  party party NOT NULL
);
CREATE TABLE votes (
  uid TEXT PRIMARY KEY,
  yeas TEXT[] NOT NULL,
  nays TEXT[] NOT NULL,
  yea_count INTEGER NOT NULL,
  nay_count INTEGER NOT NULL,
  date DATE NOT NULL
);
CREATE TABLE bills (
  uid TEXT PRIMARY KEY,
  congress INTEGER NOT NULL,
  type bill_type NOT NULL,
  number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sponsors TEXT[] NOT NULL,
  committees TEXT[] NOT NULL,
  cosponsors TEXT[] NOT NULL,
  states state[] NOT NULL,
  last_transition DATE NOT NULL,
  house_vote TEXT REFERENCES votes,
  senate_vote TEXT REFERENCES votes
);