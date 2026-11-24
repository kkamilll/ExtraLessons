import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Mail, MapPin, Phone, Star, X } from "lucide-react";
import { TUTOR, LEVELS, PHOTOS, REVIEWS, BUSY } from "./data/tutorData";

const DAYS = ["ndz", "pon", "wt", "śr", "czw", "pt", "sob"];

function buildWeeks() {
  const weeks = [];
  const d = new Date();
  d.setDate(d.getDate() + 1);
  let n = 0;
  for (let w = 0; w < 2; w++) {
    const days = [];
    while (days.length < 6) {
      if (d.getDay() !== 0) {
        const times = d.getDay() === 6 ? ["10:00", "11:30", "13:00"] : ["15:00", "16:30", "18:00", "19:30"];
        const dd = String(d.getDate()).padStart(2, "0");
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        days.push({
          key: `${d.getFullYear()}-${mm}-${dd}`,
          day: DAYS[d.getDay()],
          date: `${dd}.${mm}`,
          slots: times.map((t) => ({ time: t, busy: (BUSY[n] || []).includes(t) })),
        });
        n++;
      }
      d.setDate(d.getDate() + 1);
    }
    weeks.push(days);
  }
  return weeks;
}

// Zdjęcie z zapasowym "zeszytem", jeśli pliku w public/img jeszcze nie ma
function Photo({ src, alt, className, formula = "f(x) = ax² + bx + c" }) {
  const [broken, setBroken] = useState(false);
  if (broken)
    return (
      <div className={`grid-paper flex items-center justify-center ${className}`}>
        <span className="-rotate-3 font-hand text-3xl text-sage-dark">{formula}</span>
      </div>
    );
  return <img src={src} alt={alt} onError={() => setBroken(true)} className={`object-cover ${className}`} />;
}

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function App() {
  const weeks = useMemo(buildWeeks, []);
  const [week, setWeek] = useState(0);
  const [level, setLevel] = useState("mp");
  const [len, setLen] = useState(60);
  const [slot, setSlot] = useState(null);
  const [form, setForm] = useState({ name: "", contact: "", topic: "" });
  const [done, setDone] = useState(null);
  const [bookings, setBookings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("km_bookings") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => localStorage.setItem("km_bookings", JSON.stringify(bookings)), [bookings]);

  const lvl = LEVELS.find((l) => l.id === level);
  const price = len === 90 ? lvl.price90 : lvl.price60;
  const isTaken = (key, time) => bookings.some((b) => b.key === key && b.time === time);

  const firstFree = useMemo(() => {
    for (const days of weeks)
      for (const day of days)
        for (const s of day.slots) if (!s.busy && !isTaken(day.key, s.time)) return { ...day, time: s.time };
    return null;
  }, [weeks, bookings]);

  const submit = (e) => {
    e.preventDefault();
    if (!slot) return;
    const b = { id: Date.now(), ...slot, level: lvl.name, len, price, ...form };
    setBookings((p) => [...p, b]);
    setDone(b);
    setSlot(null);
    setForm({ name: "", contact: "", topic: "" });
  };

  return (
    <div className="min-h-screen bg-cream font-sans text-ink">
      {/* NAV */}
      <nav className="sticky top-0 z-30 border-b border-line/70 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#" className="font-serif text-xl font-semibold">
            Kamil<span className="text-coral">.</span>{" "}
            <span className="font-sans text-sm font-medium text-muted">matematyka</span>
          </a>
          <div className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
            <a href="#cennik" className="hover:text-ink">Cennik</a>
            <a href="#terminy" className="hover:text-ink">Terminy</a>
            <a href="#kontakt" className="hover:text-ink">Kontakt</a>
          </div>
          <button
            onClick={() => go("terminy")}
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-sage-dark"
          >
            Umów lekcję
          </button>
        </div>
      </nav>

      {/* HERO */}
      <header className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-12 md:grid-cols-2 md:pt-20">
        <div>
          <p className="font-hand text-2xl text-coral">cześć, jestem Kamil 👋</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Matematyka, która wreszcie ma <span className="highlight">sens</span>.
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted">
            Podstawówka, matura, studia. Online albo na miejscu w {TUTOR.city}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => go("terminy")}
              className="group flex items-center gap-2 rounded-full bg-sage px-6 py-3.5 font-semibold text-white transition hover:bg-sage-dark"
            >
              Zarezerwuj termin
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => go("cennik")}
              className="rounded-full border border-ink/15 bg-paper px-6 py-3.5 font-semibold transition hover:border-ink/40"
            >
              Zobacz ceny
            </button>
          </div>
          <div className="mt-10 flex items-center gap-8 text-sm">
            <div>
              <div className="font-serif text-2xl font-semibold">{TUTOR.years} lat</div>
              <div className="text-muted">uczę</div>
            </div>
            <div className="h-10 w-px bg-line" />
            <div>
              <div className="font-serif text-2xl font-semibold">{TUTOR.students}+</div>
              <div className="text-muted">uczniów</div>
            </div>
            <div className="h-10 w-px bg-line" />
            <div>
              <div className="flex items-center gap-1 font-serif text-2xl font-semibold">
                5.0 <Star className="h-5 w-5 fill-sun text-sun" />
              </div>
              <div className="text-muted">opinie</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-3 -top-3 h-full w-full rounded-[2rem] bg-sun/60" />
          <Photo
            src="/img/hero.jpg"
            alt="Biurko z zeszytem do matematyki"
            formula="Δ = b² − 4ac"
            className="relative aspect-[4/3] w-full rounded-[2rem] shadow-xl"
          />
          {firstFree && (
            <button
              onClick={() => {
                setSlot({ key: firstFree.key, day: firstFree.day, date: firstFree.date, time: firstFree.time });
                go("terminy");
              }}
              className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-paper px-5 py-4 text-left shadow-lg transition hover:-translate-y-0.5"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sage" />
              </span>
              <span>
                <span className="block text-xs text-muted">najbliższy wolny termin</span>
                <span className="font-semibold">
                  {firstFree.day} {firstFree.date}, {firstFree.time}
                </span>
              </span>
            </button>
          )}
          <div className="absolute -right-2 bottom-10 rotate-6 rounded-md bg-coral px-4 py-2 font-hand text-2xl text-white shadow-md">
            od {LEVELS[0].price60} zł
          </div>
        </div>
      </header>

      {/* ZDJĘCIA */}
      <section className="mx-auto grid max-w-6xl gap-5 px-5 pb-24 sm:grid-cols-3">
        {PHOTOS.map((p, i) => (
          <figure key={p.src} className={`group overflow-hidden rounded-3xl bg-paper ${i === 1 ? "sm:translate-y-8" : ""}`}>
            <Photo
              src={p.src}
              alt={p.label}
              formula={["sin²x + cos²x = 1", "a² + b² = c²", "∫ x dx = x²/2"][i]}
              className="aspect-square w-full transition duration-500 group-hover:scale-105"
            />
            <figcaption className="px-5 py-4 font-medium">{p.label}</figcaption>
          </figure>
        ))}
      </section>

      {/* CENNIK */}
      <section id="cennik" className="border-y border-line bg-paper py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-4xl font-semibold">Cennik</h2>
            <div className="flex rounded-full border border-line bg-cream p-1 text-sm font-semibold">
              {[60, 90].map((m) => (
                <button
                  key={m}
                  onClick={() => setLen(m)}
                  className={`rounded-full px-5 py-2 transition ${len === m ? "bg-ink text-cream" : "text-muted hover:text-ink"}`}
                >
                  {m} min
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {LEVELS.map((l) => {
              const active = l.id === level;
              return (
                <button
                  key={l.id}
                  onClick={() => setLevel(l.id)}
                  className={`flex flex-col rounded-3xl p-6 text-left transition ${l.tone} ${
                    active ? "ring-2 ring-ink" : "hover:-translate-y-1"
                  }`}
                >
                  <span className="font-serif text-2xl font-semibold">{l.name}</span>
                  <span className="mt-1 text-sm text-muted">{l.sub}</span>
                  <span className="mt-10 font-serif text-4xl font-semibold">
                    {len === 90 ? l.price90 : l.price60}
                    <span className="ml-1 font-sans text-base font-medium text-muted">zł</span>
                  </span>
                  <span className="mt-4 flex items-center gap-1 text-sm font-semibold">
                    {active ? "wybrane ✓" : "wybierz"} <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-6 font-hand text-xl text-muted">pakiet 4 lekcji −10% · w parze −30% za osobę</p>
        </div>
      </section>

      {/* TERMINY */}
      <section id="terminy" className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="font-serif text-4xl font-semibold">Wolne terminy</h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <div className="grid-paper rounded-3xl border border-line p-5 lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-semibold">
                {weeks[week][0].date} – {weeks[week][5].date}
              </span>
              <div className="flex gap-2">
                <button disabled={week === 0} onClick={() => setWeek(0)} className="rounded-full border border-line bg-paper p-2 disabled:opacity-30">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button disabled={week === 1} onClick={() => setWeek(1)} className="rounded-full border border-line bg-paper p-2 disabled:opacity-30">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {weeks[week].map((day) => (
                <div key={day.key} className="rounded-2xl bg-paper/90 p-2">
                  <div className="mb-2 text-center">
                    <div className="text-xs font-semibold uppercase text-muted">{day.day}</div>
                    <div className="font-serif text-lg font-semibold">{day.date}</div>
                  </div>
                  <div className="space-y-1.5">
                    {day.slots.map((s) => {
                      const mine = isTaken(day.key, s.time);
                      const sel = slot?.key === day.key && slot?.time === s.time;
                      if (s.busy || mine)
                        return (
                          <div
                            key={s.time}
                            className={`rounded-lg py-1.5 text-center text-xs ${mine ? "bg-sun font-semibold" : "text-muted/50 line-through"}`}
                          >
                            {s.time}
                          </div>
                        );
                      return (
                        <button
                          key={s.time}
                          onClick={() => setSlot({ key: day.key, day: day.day, date: day.date, time: s.time })}
                          className={`w-full rounded-lg py-1.5 text-xs font-semibold transition ${
                            sel ? "bg-sage text-white" : "bg-sage-light text-sage-dark hover:bg-sage hover:text-white"
                          }`}
                        >
                          {s.time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={submit} className="rounded-3xl bg-ink p-6 text-cream lg:col-span-2">
            <div className="rounded-2xl bg-white/5 p-4">
              <div className="text-sm text-cream/60">{lvl.name} · {len} min</div>
              <div className="mt-1 font-serif text-2xl font-semibold">
                {slot ? `${slot.day} ${slot.date}, ${slot.time}` : "wybierz godzinę"}
              </div>
              <div className="mt-1 text-sun">{price} zł</div>
            </div>

            <div className="mt-5 space-y-3">
              {[
                ["name", "Imię", true],
                ["contact", "Telefon lub e-mail", true],
                ["topic", "Temat (opcjonalnie)", false],
              ].map(([k, ph, req]) => (
                <input
                  key={k}
                  required={req}
                  placeholder={ph}
                  value={form[k]}
                  onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder-cream/40 outline-none focus:border-sun"
                />
              ))}
            </div>

            <button
              disabled={!slot}
              className="mt-5 w-full rounded-full bg-sun py-3.5 font-semibold text-ink transition hover:brightness-95 disabled:opacity-40"
            >
              Rezerwuję
            </button>

            {done && (
              <p className="mt-4 text-center text-sm text-sun">
                ✓ Do zobaczenia {done.day} {done.date} o {done.time}!
              </p>
            )}
          </form>
        </div>

        {bookings.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {bookings.map((b) => (
              <span key={b.id} className="flex items-center gap-2 rounded-full bg-sun/70 py-1.5 pl-4 pr-2 text-sm font-medium">
                {b.day} {b.date}, {b.time} · {b.level}
                <button onClick={() => setBookings((p) => p.filter((x) => x.id !== b.id))} className="rounded-full p-1 hover:bg-ink/10" title="Odwołaj">
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </section>

      {/* OPINIE */}
      <section className="bg-sage-light py-20">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <blockquote
              key={r.who}
              className={`rounded-3xl bg-paper p-7 shadow-sm ${i % 2 ? "md:-rotate-1" : "md:rotate-1"}`}
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-sun text-sun" />
                ))}
              </div>
              <p className="mt-4 font-serif text-xl leading-snug">„{r.text}”</p>
              <footer className="mt-4 text-sm text-muted">— {r.who}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* KONTAKT */}
      <footer id="kontakt" className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <h2 className="font-serif text-4xl font-semibold">
            Napisz albo <span className="highlight">zadzwoń</span>.
          </h2>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${TUTOR.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 rounded-full bg-paper px-5 py-3 font-medium shadow-sm hover:shadow">
              <Phone className="h-4 w-4 text-sage" /> {TUTOR.phone}
            </a>
            <a href={`mailto:${TUTOR.email}`} className="flex items-center gap-2 rounded-full bg-paper px-5 py-3 font-medium shadow-sm hover:shadow">
              <Mail className="h-4 w-4 text-coral" /> {TUTOR.email}
            </a>
            <span className="flex items-center gap-2 rounded-full bg-paper px-5 py-3 font-medium shadow-sm">
              <MapPin className="h-4 w-4 text-muted" /> {TUTOR.city} / online
            </span>
          </div>
        </div>
        <p className="mt-16 text-sm text-muted">© {new Date().getFullYear()} Kamil · korepetycje z matematyki</p>
      </footer>
    </div>
  );
}
