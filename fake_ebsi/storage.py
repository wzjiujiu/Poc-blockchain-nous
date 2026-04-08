import json, os

DB_FILE = "/mnt/data/fake-ebsi/db.json"

def _load_db():
    if not os.path.exists(DB_FILE):
        return {}
    with open(DB_FILE, "r") as f:
        return json.load(f)

def _save_db(db):
    with open(DB_FILE, "w") as f:
        json.dump(db, f, indent=2)

def save_did(did, doc, keys):
    db = _load_db()
    db[did] = {"document": doc, "keys": keys}
    _save_db(db)

def load_did(did):
    db = _load_db()
    return db.get(did)