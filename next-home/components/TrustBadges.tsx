const badges = ["Great Place to Work", "Selo RA1000 · Reclame Aqui", "IATA", "EMBRATUR", "ABAV"];

export default function TrustBadges() {
  return (
    <section className="py-12 bg-white border-t border-[#F0F0F0]">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {badges.map((b) => (
            <div key={b} className="rounded-2xl border border-[#E8E8E8] bg-[#F6F6F6] px-4 py-6 text-center text-sm font-medium text-[#555555] flex items-center justify-center">
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
