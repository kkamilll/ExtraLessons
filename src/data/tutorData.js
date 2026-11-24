// Tu zmieniasz swoje dane, ceny i zajęte godziny.
export const TUTOR = {
  name: "Kamil",
  phone: "+48 512 840 920",
  email: "kontakt@kamilmat.pl",
  city: "Warszawa",
  years: 6,
  students: 340,
};

export const LEVELS = [
  { id: "e8", name: "Podstawówka", sub: "klasy 4–8, egzamin ósmoklasisty", price60: 90, price90: 130, tone: "bg-sage-light" },
  { id: "mp", name: "Liceum", sub: "matura podstawowa", price60: 110, price90: 155, tone: "bg-[#FCEFD2]" },
  { id: "mr", name: "Rozszerzenie", sub: "matura rozszerzona", price60: 130, price90: 185, tone: "bg-[#F9E0D8]" },
  { id: "st", name: "Studia", sub: "analiza, algebra, kolokwia", price60: 150, price90: 210, tone: "bg-[#E4E8F3]" },
];

export const PHOTOS = [
  { src: "/img/lesson.jpg", label: "Online z tablicą" },
  { src: "/img/notes.jpg", label: "Notatki po każdej lekcji" },
  { src: "/img/books.jpg", label: "Arkusze i zadania" },
];

export const REVIEWS = [
  { text: "Z 35% na próbnej do 92% na rozszerzeniu.", who: "Zuzia, maturzystka" },
  { text: "Pierwszy raz rozumiem, co robię na matmie.", who: "Michał, 2 LO" },
  { text: "Syn napisał egzamin ósmoklasisty na 96%.", who: "Pani Agnieszka" },
];

// dzień (0 = jutro, kolejne dni robocze) : zajęte godziny
export const BUSY = {
  0: ["16:30", "18:00"],
  1: ["15:00", "19:30"],
  2: ["18:00"],
  3: ["16:30"],
  4: ["15:00"],
  5: ["11:30"],
  7: ["18:00"],
  9: ["15:00", "16:30"],
};
