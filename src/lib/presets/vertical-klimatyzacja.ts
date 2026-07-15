import { withPresetDefaults } from "./shared";

const siteCity = "Kraków i okolice";
const cityLocative = "w Krakowie";
const siteName = "KlimaSerwis";

/** Wzorzec startowy: firma od klimatyzacji. */
export const verticalKlimatyzacjaPreset = withPresetDefaults({
  id: "vertical-klimatyzacja",
  label: "Wzorzec: klimatyzacja",
  hvacProfile: "klimatyzacja",
  siteName,
  companyLegalName: "KlimaSerwis Jan Kowalski",
  siteCity,
  cityLocative,
  siteDefaultUrl: "https://przyklad-klima.pl",
  email: "kontakt@przyklad-klima.pl",
  phoneDisplay: "12 345 67 89",
  phoneE164: "+48123456789",
  address: "",
  addressStreet: "",
  addressCity: "Kraków",
  addressPostal: "",
  serviceArea: "Kraków i okolice, dojazd do klienta",
  mapsQuery: "KlimaSerwis Kraków",
  nip: "000-000-00-00",
  regon: "000000000",
  hours: "Pn - Pt: 8:00 - 17:00",
  logoUrl: "/logo.svg",
  heroImage: "/gallery/placeholder-1.svg",
  siteTitle: `Klimatyzacja ${siteCity} | ${siteName}`,
  siteKeywords:
    "klimatyzacja, montaż klimatyzacji, serwis klimatyzacji, split, multi-split, odgrzybianie",
  siteDescription: `Montaż i serwis klimatyzacji ${cityLocative} i okolicach. Dobór mocy, uruchomienie, przeglądy. Zadzwoń: 12 345 67 89.`,
  ogImage: "/gallery/placeholder-1.svg",
  googleRating: 4.9,
  googleReviewCount: 18,
  partners: ["Daikin", "Mitsubishi", "Gree", "Samsung"],
  gallery: [
    {
      image: "/gallery/placeholder-1.svg",
      alt: "Montaż klimatyzacji split w Krakowie",
      caption: "Montaż klimatyzacji",
    },
    {
      image: "/gallery/placeholder-2.svg",
      alt: "Serwis i odgrzybianie klimatyzacji",
      caption: "Serwis klimatyzacji",
    },
    {
      image: "/gallery/placeholder-5.svg",
      alt: "Klimatyzacja w lokalu usługowym",
      caption: "Klimatyzacja komercyjna",
    },
  ],
  reviews: [],
  heroHeadline: "Montaż i serwis klimatyzacji",
  heroBullets: [
    "Split i multi-split. Dobór mocy, montaż i uruchomienie.",
    "Serwis, odgrzybianie i naprawa awaryjna z dojazdem do klienta.",
  ],
  footerTagline: "Klimatyzacja domowa i komercyjna",
  servicesSectionSubtitle:
    "Montaż, serwis i przeglądy klimatyzacji. Dobór urządzeń pod metraż i sposób użytkowania.",
  gallerySectionSubtitle: "Realizacje montażowe i serwisowe klimatyzacji w okolicy.",
  services: [
    {
      icon: "check-circle",
      title: "Montaż klimatyzacji split",
      desc: "Dobór mocy, montaż jednostek, uruchomienie i przekazanie dokumentacji.",
    },
    {
      icon: "check-circle",
      title: "Montaż multi-split",
      desc: "Instalacje wielu jednostek w domu lub lokalu. Projekt i wykonanie.",
    },
    {
      icon: "wrench",
      title: "Serwis klimatyzacji",
      desc: "Czyszczenie, odgrzybianie, uzupełnianie czynnika i diagnostyka.",
    },
    {
      icon: "shield-check",
      title: "Przeglądy okresowe",
      desc: "Konserwacja przed sezonem letnim. Sprawdzenie szczelności i wydajności.",
    },
    {
      icon: "alert-triangle",
      title: "Naprawa awaryjna",
      desc: "Szybka reakcja przy awarii klimatyzacji. Termin potwierdzamy telefonicznie.",
    },
  ],
  faqs: [
    {
      q: "Czy montujecie klimatyzację w mieszkaniu i domu?",
      a: `Tak. Montujemy split i multi-split ${cityLocative} i okolicach. Dobieramy moc pod metraż.`,
    },
    {
      q: "Ile kosztuje montaż klimatyzacji?",
      a: "Koszt zależy od mocy, liczby jednostek i trudności montażu. Wycenę podamy po oględzinach.",
    },
    {
      q: "Czy robicie odgrzybianie i serwis?",
      a: "Tak. Oferujemy przeglądy, czyszczenie i odgrzybianie instalacji klimatyzacyjnych.",
    },
    {
      q: "Jakie marki montujecie?",
      a: "Pracujemy na sprawdzonych markach. Dobór urządzenia ustalamy indywidualnie z klientem.",
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
        "Montaż multi-split",
        "Serwis i przegląd klimatyzacji",
        "Naprawa awaryjna klimatyzacji",
      ],
    },
    {
      label: "Inne",
      options: ["Potrzebuję doradztwa", "Wycena montażu"],
    },
  ],
});
