import { withPresetDefaults } from "./shared";

const siteCity = "Kraków i okolice";
const cityLocative = "w Krakowie";
const siteName = "KLIMATPRO";

/** Demo lidera branży: gotowa wizytówka matki KLIMATPRO do podglądu i klonowania pod klienta. */
export const defaultPreset = withPresetDefaults({
  id: "default",
  label: "Demo: KLIMATPRO Kraków",
  hvacProfile: "mix-hvac",
  siteName,
  companyLegalName: "KLIMATPRO Instalacje Sp. z o.o.",
  siteCity,
  cityLocative,
  siteDefaultUrl: "https://klimatpro-demo.pl",
  email: "kontakt@klimatpro.pl",
  phoneDisplay: "12 654 32 10",
  phoneE164: "+48126543210",
  address: "ul. Instalatorska 12, 30-001 Kraków",
  addressStreet: "ul. Instalatorska 12",
  addressCity: "Kraków",
  addressPostal: "30-001",
  serviceArea: "Kraków i okolice, dojazd do klienta",
  mapsQuery: "KLIMATPRO Kraków klimatyzacja HVAC",
  nip: "678-000-12-34",
  regon: "123456789",
  hours: "Pn - Pt: 8:00 - 17:00",
  logoUrl: "/logo.png",
  logoIncludesName: true,
  faviconUrl: "/favicon.png",
  heroImage: "/gallery/hero-pompa-ciepla.webp",
  siteTitle: `Klimatyzacja ${siteCity} | ${siteName}`,
  siteKeywords:
    "klimatyzacja Kraków, pompy ciepła, montaż klimatyzacji, serwis HVAC, serwis kotłów, rekuperacja",
  siteDescription: `Montaż i serwis klimatyzacji, pomp ciepła i instalacji HVAC ${cityLocative} i okolicach. Dojazd do klienta. Zadzwoń: 12 654 32 10.`,
  ogImage: "/gallery/hero-pompa-ciepla.webp",
  googleRating: 4.9,
  googleReviewCount: 47,
  partners: ["Daikin", "Mitsubishi Electric", "Vaillant", "Bosch", "Buderus", "Samsung"],
  gallery: [
    {
      image: "/gallery/klima-01.webp",
      alt: "Montaż klimatyzacji w biurze, realizacja KLIMATPRO Kraków",
      caption: "Klimatyzacja biurowa",
    },
    {
      image: "/gallery/klima-02.webp",
      alt: "Montaż klimatyzacji w mieszkaniu 60 m², Kraków",
      caption: "Klimatyzacja w mieszkaniu",
    },
    {
      image: "/gallery/klima-03.webp",
      alt: "Instalacja klimatyzacji domowej, realizacja Kraków",
      caption: "Klimatyzacja domowa",
    },
    {
      image: "/gallery/klima-04.webp",
      alt: "Montaż klimatyzacji w lokalu użytkowym, Kraków",
      caption: "Klimatyzacja komercyjna",
    },
    {
      image: "/gallery/klima-05.webp",
      alt: "Montaż jednostek klimatyzacji split, serwis HVAC",
      caption: "Montaż klimatyzacji split",
    },
    {
      image: "/gallery/biuro-centrum.webp",
      alt: "Montaż klimatyzacji w biurze w centrum Krakowa",
      caption: "Klimatyzacja w biurze",
    },
    {
      image: "/gallery/pompy-01.webp",
      alt: "Instalacja pompy ciepła, realizacja KLIMATPRO",
      caption: "Montaż pompy ciepła",
    },
    {
      image: "/gallery/pompy-02.webp",
      alt: "Kocioł gazowy kondensacyjny, instalacja grzewcza Kraków",
      caption: "Kocioł kondensacyjny",
    },
    {
      image: "/gallery/pompy-03.webp",
      alt: "Serwis i montaż urządzeń grzewczych Termet",
      caption: "Instalacja grzewcza",
    },
    {
      image: "/gallery/pompy-04.webp",
      alt: "Montaż pompy ciepła powietrze-woda, Kraków i okolice",
      caption: "Pompa ciepła powietrze-woda",
    },
    {
      image: "/gallery/pompy-05.webp",
      alt: "Pompa ciepła na elewacji budynku, realizacja montażowa",
      caption: "Pompa ciepła na elewacji",
    },
    {
      image: "/gallery/pompy-06.webp",
      alt: "Konfiguracja i uruchomienie pompy ciepła, serwis HVAC",
      caption: "Uruchomienie pompy ciepła",
    },
  ],
  reviews: [
    {
      name: "Marek K.",
      text: "Montaż klimatyzacji w domu zrobiony sprawnie i czytelnie. Ekipa punktualna, po pracy porządek na miejscu.",
      source: "google",
      rating: 5,
      relativeTime: "2 mies. temu",
    },
    {
      name: "Anna W.",
      text: "Serwis pompy ciepła po sezonie grzewczym. Konkretna diagnostyka i sensowne wytłumaczenie, co zostało zrobione.",
      source: "google",
      rating: 5,
      relativeTime: "3 mies. temu",
    },
    {
      name: "Tomasz R.",
      text: "Awaria kotła w zimie, szybka reakcja i naprawa tego samego dnia. Polecam na serwis ogrzewania.",
      source: "google",
      rating: 5,
      relativeTime: "4 mies. temu",
    },
    {
      name: "Karolina S.",
      text: "Montaż rekuperacji w nowym domu. Dobre doradztwo przy doborze mocy i termin dotrzymany.",
      source: "google",
      rating: 5,
      relativeTime: "5 mies. temu",
    },
    {
      name: "Piotr L.",
      text: "Klimatyzacja w lokalu firmowym. Fachowo, bez zbędnego czekania. Kontakt telefoniczny bez problemu.",
      source: "google",
      rating: 5,
      relativeTime: "6 mies. temu",
    },
  ],
  heroHeadline: "Montaż i serwis klimatyzacji",
  heroBullets: [
    "Dobór, montaż i serwis bez niespodzianek w zakresie prac.",
    "Koszt potwierdzamy przed rozpoczęciem prac.",
  ],
  footerTagline: "Klimatyzacja, pompy ciepła i HVAC",
  servicesSectionSubtitle:
    "Montaż, serwis i przeglądy klimatyzacji, pomp ciepła, wentylacji oraz urządzeń grzewczych.",
  gallerySectionSubtitle: "Realizacje montażowe i serwisowe KLIMATPRO w Krakowie i okolicach.",
  services: [
    {
      icon: "check-circle",
      title: "Montaż klimatyzacji",
      desc: "Dobór mocy, montaż split i multi-split. Uruchomienie i przekazanie dokumentacji.",
    },
    {
      icon: "wrench",
      title: "Serwis klimatyzacji",
      desc: "Czyszczenie, odgrzybianie, uzupełnianie czynnika i naprawa usterek.",
    },
    {
      icon: "zap",
      title: "Montaż i serwis pomp ciepła",
      desc: "Instalacja, pierwsze uruchomienie, diagnostyka i naprawy gwarancyjne oraz pogwarancyjne.",
    },
    {
      icon: "shield-check",
      title: "Wentylacja i rekuperacja",
      desc: "Montaż i serwis instalacji wentylacyjnych. Regulacja i konserwacja rekuperatorów.",
    },
    {
      icon: "flame",
      title: "Serwis kotłów i ogrzewania",
      desc: "Przeglądy, naprawy i pierwsze uruchomienia kotłów gazowych i urządzeń grzewczych.",
    },
    {
      icon: "alert-triangle",
      title: "Naprawa awaryjna HVAC",
      desc: "Szybka reakcja przy awarii klimatyzacji, pompy lub ogrzewania.",
    },
  ],
  faqs: [
    {
      q: "Czy montujecie i serwisujecie klimatyzację?",
      a: `Tak. Montaż, serwis i przeglądy klimatyzacji na terenie ${siteCity.toLowerCase()}.`,
    },
    {
      q: "Ile kosztuje montaż klimatyzacji?",
      a: "Koszt zależy od mocy urządzenia i zakresu prac. Wycenę przedstawimy po oględzinach lub rozmowie.",
    },
    {
      q: "Czy serwisujecie pompy ciepła i kotły?",
      a: `Tak. Obsługujemy pompy ciepła, wentylację oraz urządzenia grzewcze ${cityLocative} i okolicach.`,
    },
    {
      q: "Jak szybko możecie pomóc przy awarii?",
      a: "W pilnych przypadkach reagujemy jak najszybciej. Zadzwoń, a potwierdzimy możliwy termin dojazdu.",
    },
    {
      q: "Czy dojeżdżacie do klienta?",
      a: `Tak. Obsługujemy ${siteCity.toLowerCase()}. Przyjeżdżamy na montaż i serwis.`,
    },
  ],
  serviceOptionGroups: [
    {
      label: "Klimatyzacja",
      options: [
        "Montaż klimatyzacji split",
        "Serwis i przegląd klimatyzacji",
        "Naprawa awaryjna klimatyzacji",
      ],
    },
    {
      label: "Pompy ciepła",
      options: [
        "Montaż pompy ciepła",
        "Pierwsze uruchomienie pompy ciepła",
        "Serwis gwarancyjny / pogwarancyjny",
      ],
    },
    {
      label: "Wentylacja i ogrzewanie",
      options: [
        "Montaż rekuperacji",
        "Serwis kotła gazowego",
        "Przegląd i konserwacja ogrzewania",
      ],
    },
    {
      label: "Inne",
      options: ["Potrzebuję doradztwa", "Naprawa awaryjna HVAC"],
    },
  ],
});
