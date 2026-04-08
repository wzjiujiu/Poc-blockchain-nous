import json, base64, hashlib
from jwcrypto import jwk, jws

import json, base64, hashlib


def generate_keypair(method="ebsi"):
    key = jwk.JWK.generate(kty='EC', crv='P-256')

    # Genera un kid basato sul thumbprint
    kid = key.thumbprint()
    key.update(kid=kid)

    did = f"did:ebsi:{base64.urlsafe_b64encode(hashlib.sha256(key.export_to_pem(private_key=False, password=None)).digest())[:16].decode()}"

    jwk_dict = {
        "private": json.loads(key.export(private_key=True)),
        "public": json.loads(key.export(private_key=False))
    }

    # Assicurati che il kid sia anche nel JWK esportato
    jwk_dict["private"]["kid"] = kid
    jwk_dict["public"]["kid"] = kid

    return did, jwk_dict


def create_did_document(did, jwk):
    return {
        "@context": "https://www.w3.org/ns/did/v1",
        "id": did,
        "verificationMethod": [{
            "id": f"{did}#key-1",
            "type": "JsonWebKey2020",
            "controller": did,
            "publicKeyJwk": jwk["public"]
        }],
        "assertionMethod": [f"{did}#key-1"]
    }

def sign_jws(payload, private_jwk):
    key = jwk.JWK.from_json(json.dumps(private_jwk))

    # 2️⃣ Genera automaticamente il kid usando il thumbprint della chiave
    key.update(kid=key.thumbprint())  # Questo imposta key.kid
    token = jws.JWS(json.dumps(payload).encode())
    protected_header = {"alg": "ES256", "kid": key.kid}
    token.add_signature(key, protected=protected_header)
    return token.serialize()


def verify_jws(jws_obj, public_jwk):
    """
    jws_obj è un dict con chiavi: payload, protected, signature
    """
    try:
        # Ricostruisci la chiave
        key = jwk.JWK.from_json(json.dumps(public_jwk))
        print("Key:", key)

        # Ricostruisci il JWS compatto
        compact_jws = f"{jws_obj['protected']}.{jws_obj['payload']}.{jws_obj['signature']}"
        print("Compact JWS:", compact_jws)

        # Deserializza e verifica
        token = jws.JWS()
        token.deserialize(compact_jws)
        token.verify(key)  # ritorna True se valido, altrimenti solleva eccezione

        return True

    except Exception as e:
        print("Errore verify:", e)
        return False