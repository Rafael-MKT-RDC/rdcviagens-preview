import requests
import json

# Mapeamento de parceiros para seus domínios oficiais
partners_domains = {
    "Nike": "nike.com.br",
    "Centauro": "centauro.com.br",
    "Renner": "lojasrenner.com.br",
    "Hering": "hering.com.br",
    "Netshoes": "netshoes.com.br",
    "Fila": "fila.com.br",
    "The North Face": "thenorthface.com.br",
    "Dafiti": "dafiti.com.br",
    "Zattini": "zattini.com.br",
    "Le Postiche": "lepostiche.com.br",
    "Puket": "puket.com.br",
    "Umbro": "umbro.com.br",
    "Olympikus": "olympikus.com.br",
    "Riachuelo": "riachuelo.com.br",
    "O Boticário": "boticario.com.br",
    "Sephora": "sephora.com.br",
    "Océane": "oceane.com.br",
    "Ikesaki": "ikesaki.com.br",
    "Jequiti": "jequiti.com.br",
    "SalonLine": "salonline.com.br",
    "Dr Shape": "drshape.com.br",
    "Probiótica": "probiotica.com.br",
    "Drogarias Pacheco": "drogariaspacheco.com.br",
    "Drogarias São Paulo": "drogariasaopaulo.com.br",
    "Extra Farma": "extrafarma.com.br",
    "Pague Menos": "paguemenos.com.br",
    "Odonto Special": "odontospecial.com.br",
    "Samsung": "samsung.com",
    "LG": "lg.com",
    "Canon": "canon.com.br",
    "Tok&Stok": "tokstok.com.br",
    "Imaginarium": "imaginarium.com.br",
    "Stanley": "stanley1913.com.br",
    "Kaspersky": "kaspersky.com.br",
    "Sem Parar": "semparar.com.br",
    "Sam's Club": "samsclub.com.br",
    "Compra Certa": "compracerta.com.br",
    "Go Case": "gocase.com.br",
    "Giuliana Flores": "giulianaflores.com.br",
    "Schultz": "schultz.com.br",
    "Open English": "openenglish.com",
    "English Fluency": "englishfluency.com.br",
    "Hablas Online": "hablasonline.com.br",
    "Impacta Educacional": "impacta.com.br",
    "Escola Ana Hickmann": "escolaanahickmann.com.br",
    "Petz": "petz.com.br",
    "Pet Love": "petlove.com.br",
    "Dog Hero": "doghero.com.br",
    "Clube04 Pet Store": "clube04.com.br",
    "Carrefour": "carrefour.com.br",
    "Domino's Pizza": "dominos.com.br",
    "Luckau": "luckau.com.br",
}

TOKEN = "pk_X-1ZO13GSgeOoUrIuJ6GMQ"

results = {}
ok_count = 0
fail_count = 0

for name, domain in partners_domains.items():
    url = f"https://img.logo.dev/{domain}?token={TOKEN}&size=128&format=png"
    try:
        resp = requests.head(url, timeout=10, allow_redirects=True)
        if resp.status_code == 200:
            content_type = resp.headers.get('content-type', '')
            if 'image' in content_type:
                results[name] = {"url": url, "domain": domain, "status": "ok"}
                ok_count += 1
            else:
                results[name] = {"url": url, "domain": domain, "status": f"not-image: {content_type}"}
                fail_count += 1
        else:
            results[name] = {"url": url, "domain": domain, "status": f"fail-{resp.status_code}"}
            fail_count += 1
    except Exception as e:
        results[name] = {"url": url, "domain": domain, "status": f"error"}
        fail_count += 1

print(f"\n=== RESULTS: {ok_count} OK, {fail_count} FAILED ===\n")

for name, data in results.items():
    status_icon = "✅" if data["status"] == "ok" else "❌"
    print(f"{status_icon} {name} ({data['domain']}): {data['status']}")

# Generate TypeScript map
print("\n\n=== TS MAP ===\n")
print("const partnerLogos: Record<string, string> = {")
for name, data in results.items():
    if data["status"] == "ok":
        print(f'  "{name}": "https://img.logo.dev/{data["domain"]}?token={TOKEN}&size=128&format=png",')
print("};")

print(f"\n\nFailed ({fail_count}):")
for name, data in results.items():
    if data["status"] != "ok":
        print(f"  {name}: {data['status']}")
