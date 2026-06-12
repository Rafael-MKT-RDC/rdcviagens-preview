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
    "Samsung": "samsung.com.br",
    "LG": "lg.com.br",
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
    "Open English": "openenglish.com.br",
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

results = {}
for name, domain in partners_domains.items():
    logo_url = f"https://logo.clearbit.com/{domain}"
    try:
        resp = requests.head(logo_url, timeout=5, allow_redirects=True)
        if resp.status_code == 200:
            results[name] = {"url": logo_url, "status": "ok"}
        else:
            # Try without .br
            alt_domain = domain.replace(".com.br", ".com")
            alt_url = f"https://logo.clearbit.com/{alt_domain}"
            resp2 = requests.head(alt_url, timeout=5, allow_redirects=True)
            if resp2.status_code == 200:
                results[name] = {"url": alt_url, "status": "ok"}
            else:
                results[name] = {"url": logo_url, "status": f"fail-{resp.status_code}"}
    except Exception as e:
        results[name] = {"url": logo_url, "status": f"error-{str(e)[:50]}"}

# Print results
ok_count = sum(1 for v in results.values() if v["status"] == "ok")
fail_count = len(results) - ok_count
print(f"\n=== RESULTS: {ok_count} OK, {fail_count} FAILED ===\n")

for name, data in results.items():
    status_icon = "✅" if data["status"] == "ok" else "❌"
    print(f"{status_icon} {name}: {data['url']} ({data['status']})")

# Generate JS-ready output
print("\n\n=== JS MAP ===\n")
print("const partnerLogos: Record<string, string> = {")
for name, data in results.items():
    if data["status"] == "ok":
        print(f'  "{name}": "{data["url"]}",')
print("};")

# List failures
print("\n\n=== FAILURES ===\n")
for name, data in results.items():
    if data["status"] != "ok":
        print(f"  {name}: {data['status']}")
