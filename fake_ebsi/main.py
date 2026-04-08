from fastapi import FastAPI
from pydantic import BaseModel
from storage import load_did, save_did
from crypto import generate_keypair, sign_jws, verify_jws, create_did_document
import json

app = FastAPI()


def parse_jws_compact(jws_token: str):
    """
    Trasforma una JWS compatta in un dict con payload + signature
    """
    try:
        payload_b64, signature_b64 = jws_token.split(".")
        return {
            "payload": payload_b64,
            "signature": signature_b64
        }
    except Exception as e:
        return {"error": f"Invalid JWS format: {e}"}

class RegisterRequest(BaseModel):
    method: str = "ebsi"
    controller: str | None = None

@app.get("/status")
def status():
    return {"service": "fake-ebsi", "status": "running"}

@app.post("/did/register")
def register_did(req: RegisterRequest):
    did, jwk = generate_keypair(req.method)
    doc = create_did_document(did, jwk)
    save_did(did, doc, jwk)
    return {"did": did, "didDocument": doc, "keys": jwk}

@app.get("/did/resolve/{did}")
def resolve_did(did: str):
    record = load_did(did)
    if not record:
        return {"error": "DID not found"}
    return record["document"]

class JWSObject(BaseModel):
    payload: str
    protected: str
    signature: str
class JWSVerifyRequest(BaseModel):
    jws: JWSObject
    did: str

@app.post("/jws/verify")
def api_verify(req: JWSVerifyRequest):
    record = load_did(req.did)
    if not record:
        return {"verified": False, "error": "Unknown DID"}

    public_key = record["keys"]["public"]

    # Converti JWSObject in dict
    jws_obj = req.jws.dict()

    valid = verify_jws(jws_obj, public_key)
    return {"verified": valid}

class JWSSignRequest(BaseModel):
    did: str
    payload: dict


@app.post("/jws/sign")
def api_sign(req: JWSSignRequest):
    record = load_did(req.did)
    if not record:
        return {"error": "Unknown DID"}
    private_key = record["keys"]["private"]
    jws_token = sign_jws(req.payload, private_key)
    jws_dict = json.loads(jws_token)

    return jws_dict