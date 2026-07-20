import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { toast } from "sonner";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Wrench,
  ShieldCheck,
  Zap,
  Flame,
  AlertTriangle,
  CheckCircle2,
  Menu,
  X,
  Star,
  ChevronDown,
} from "lucide-react";
import { MobileCarousel } from "@/components/MobileCarousel";
import { SiteLogo } from "@/components/SiteLogo";
import { PartnersSection } from "@/components/PartnersSection";
import { StickyCallBar } from "@/components/StickyCallBar";
import { HowItWorks } from "@/components/HowItWorks";
import { GoogleReviewsSection } from "@/components/GoogleReviewsSection";
import { Reveal } from "@/components/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/use-reveal";
import { submitLeadForm } from "@/lib/web3forms";

import {
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_CITY,
  PHONE_DISPLAY,
  PHONE_HREF,
  EMAIL,
  EMAIL_HREF,
  CONTACT_LOCATION,
  CONTACT_LOCATION_LABEL,
  HAS_PHYSICAL_ADDRESS,
  HOURS,
  MAPS_URL,
  NIP,
  GALLERY,
  GOOGLE_REVIEWS_URL,
  HERO_IMAGE,
  HERO_HEADLINE,
  HERO_BULLETS,
  FOOTER_TAGLINE,
  SERVICES_SECTION_SUBTITLE,
  GALLERY_SECTION_SUBTITLE,
  SERVICES,
  FAQS,
  SERVICE_OPTION_GROUPS,
  SECTIONS,
  SECTION_TITLES,
} from "@/lib/site";
import type { ServiceIcon, ServiceItem } from "@/lib/presets";

export const Route = createFileRoute("/")({
  loader: async () => {
    const { getGoogleReviews } = await import("@/lib/google-reviews.server");
    return { googleReviews: await getGoogleReviews() };
  },
  component: Index,
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
    ],
  }),
});

const NAV_LINKS = [
  { href: "#uslugi", label: "Usługi" },
  ...(SECTIONS.howItWorks ? [{ href: "#jak-dzialamy", label: "Jak to działa" }] : []),
  ...(SECTIONS.reviews ? [{ href: "#opinie", label: "Opinie" }] : []),
  ...(SECTIONS.gallery ? [{ href: "#realizacje", label: "Realizacje" }] : []),
  ...(SECTIONS.faq ? [{ href: "#faq", label: "FAQ" }] : []),
  { href: "#kontakt", label: "Kontakt" },
];

const SERVICE_ICONS: Record<ServiceIcon, typeof Wrench> = {
  wrench: Wrench,
  "shield-check": ShieldCheck,
  zap: Zap,
  "alert-triangle": AlertTriangle,
  "check-circle": CheckCircle2,
  flame: Flame,
};

const services = SERVICES.map((s) => ({ ...s, icon: SERVICE_ICONS[s.icon] }));

const gallery = GALLERY;
const GALLERY_PREVIEW_COUNT = 3;

const faqs = FAQS;


function HeroGoogleRating({
  rating,
  reviewCount,
  profileUrl,
}: {
  rating: number;
  reviewCount: number;
  profileUrl: string;
}) {
  return (
    <a
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-xs text-white/85 backdrop-blur-sm transition-smooth hover:border-white/25 hover:bg-white/10 sm:text-sm"
    >
      <div className="flex shrink-0" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400 sm:h-3.5 sm:w-3.5" />
        ))}
      </div>
      <span className="font-semibold text-white">{rating.toFixed(1)}</span>
      <span className="text-white/65">· {reviewCount} opinii Google</span>
    </a>
  );
}

function CTAButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={PHONE_HREF}
      className={cn(
        "btn-cta px-6 py-3.5 text-sm md:px-10 md:py-4 md:text-lg",
        className,
      )}
    >
      <Phone className="h-6 w-6 shrink-0 md:h-6 md:w-6" />
      <span>Zadzwoń: {PHONE_DISPLAY}</span>
    </a>
  );
}

function LeadForm({
  idPrefix = "lead",
  submitVariant = "primary",
  collapseExtras = false,
}: {
  idPrefix?: string;
  submitVariant?: "primary" | "secondary";
  /** Na mobile: imię i usługa za „Więcej opcji” + zwarty układ pod konwersję. */
  collapseExtras?: boolean;
}) {
  const [service, setService] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const phoneId = `${idPrefix}-phone`;
  const nameId = `${idPrefix}-name`;
  const serviceId = `${idPrefix}-service`;
  const moreId = `${idPrefix}-more`;

  const inputClass =
    "h-11 w-full rounded-lg border border-white/20 bg-white/10 px-3.5 text-sm text-white placeholder:text-white/50 outline-none transition-smooth focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/25";

  const labelClass = "text-xs font-medium text-white/85";

  const selectTriggerClass = cn(
    "h-11 w-full rounded-lg border-white/20 bg-white/10 text-sm text-white shadow-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/25 data-[placeholder]:text-white/50",
  );

  const extraFields = (
    <>
      <div className="grid gap-1.5">
        <Label htmlFor={nameId} className={labelClass}>
          Imię <span className="text-white/50">(opcjonalnie)</span>
        </Label>
        <input
          id={nameId}
          type="text"
          name="name"
          autoComplete="given-name"
          placeholder="Twoje imię"
          className={inputClass}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor={serviceId} className={labelClass}>
          Rodzaj usługi <span className="text-white/50">(opcjonalnie)</span>
        </Label>
        <input type="hidden" name="service" value={service} />
        <Select value={service || undefined} onValueChange={setService}>
          <SelectTrigger id={serviceId} className={selectTriggerClass}>
            <SelectValue placeholder="Wybierz z listy" />
          </SelectTrigger>
          <SelectContent className="rounded-lg">
            {SERVICE_OPTION_GROUPS.map((group) => (
              <SelectGroup key={group.label}>
                <SelectLabel>{group.label}</SelectLabel>
                {group.options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (submitting) return;

        const form = e.currentTarget;
        const formData = new FormData(form);
        const phone = String(formData.get("phone") ?? "").trim();
        const name = String(formData.get("name") ?? "").trim();

        setSubmitting(true);
        try {
          await submitLeadForm({ name, phone, service: service || undefined });
          toast.success("Dziękujemy! Oddzwonimy do Ciebie wkrótce.", {
            description: "Twoje zgłoszenie zostało przyjęte.",
          });
          form.reset();
          setService("");
          setMoreOpen(false);
        } catch {
          toast.error("Nie udało się wysłać zgłoszenia.", {
            description: `Zadzwoń: ${PHONE_DISPLAY}`,
          });
        } finally {
          setSubmitting(false);
        }
      }}
      className={cn("grid text-left", collapseExtras ? "gap-2.5" : "gap-3.5")}
    >
      <div className={cn("grid", collapseExtras ? "gap-0" : "gap-1.5")}>
        <Label htmlFor={phoneId} className={collapseExtras ? "sr-only" : labelClass}>
          Telefon
        </Label>
        <input
          required
          id={phoneId}
          type="tel"
          name="phone"
          autoComplete="tel"
          placeholder="Twój numer"
          className={inputClass}
        />
      </div>

      {collapseExtras ? (
        <div>
          <button
            type="button"
            id={moreId}
            aria-expanded={moreOpen}
            aria-controls={`${idPrefix}-extra`}
            onClick={() => setMoreOpen((open) => !open)}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-white/50 transition-smooth hover:text-white/80"
          >
            <ChevronDown
              className={cn(
                "h-3 w-3 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                moreOpen && "rotate-180",
              )}
              aria-hidden
            />
            {moreOpen ? "Mniej" : "Więcej opcji"}
          </button>

          <div
            id={`${idPrefix}-extra`}
            className={cn(
              "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              moreOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
            )}
            aria-hidden={!moreOpen}
            inert={!moreOpen ? true : undefined}
          >
            <div className="overflow-hidden">
              <div
                className={cn(
                  "mt-2.5 grid gap-3 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  moreOpen ? "opacity-100" : "opacity-0",
                )}
              >
                {extraFields}
              </div>
            </div>
          </div>
        </div>
      ) : (
        extraFields
      )}

      <label
        className={cn(
          "flex cursor-pointer items-center gap-2.5 leading-snug",
          collapseExtras ? "text-[11px] text-white/55" : "text-xs text-white/75",
        )}
      >
        <span className="relative inline-flex h-4 w-4 shrink-0">
          <input
            required
            type="checkbox"
            name="rodo"
            className="peer absolute inset-0 z-10 cursor-pointer opacity-0"
          />
          <span
            className="pointer-events-none flex h-4 w-4 items-center justify-center rounded border border-white/35 bg-white/10 transition-colors peer-checked:border-[var(--brand-cyan)] peer-checked:bg-[var(--brand-cyan)] peer-checked:[&_svg]:opacity-100 peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--brand-cyan)]/40"
            aria-hidden
          >
            <svg
              viewBox="0 0 12 12"
              className="h-2.5 w-2.5 text-white opacity-0 transition-opacity"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 6.2 4.8 9 10 3" />
            </svg>
          </span>
        </span>
        <span className="min-w-0">
          Akceptuję{" "}
          <Link to="/polityka-prywatnosci" className="text-brand-cyan underline underline-offset-2 hover:text-white">
            Politykę prywatności
          </Link>{" "}
          i wyrażam zgodę na kontakt.
        </span>
      </label>
      <button
        type="submit"
        disabled={submitting}
        className={cn(
          "w-full disabled:opacity-60",
          collapseExtras
            ? "btn-cta mt-1 h-10 text-sm"
            : cn("h-11 text-sm", submitVariant === "secondary" ? "btn-secondary" : "btn-cta"),
        )}
      >
        {submitting ? "Wysyłanie…" : "Poproś o kontakt"}
      </button>
    </form>
  );
}

function ServiceCard({ s, index }: { s: ServiceItem & { icon: typeof Wrench }; index: number }) {
  const Icon = s.icon;
  const num = String(index + 1).padStart(2, "0");
  const { ref, className: revealClass } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(
        "card-glass group relative h-full overflow-hidden rounded-xl p-5 text-left transition-smooth md:hover:-translate-y-0.5 md:hover:border-brand-cyan/25 md:hover:shadow-glow",
        revealClass,
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <span className="absolute right-4 top-4 text-xs font-semibold tabular-nums text-white/25">{num}</span>
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/8 text-brand-cyan transition-smooth group-hover:scale-110 group-hover:border-brand-cyan/30 group-hover:bg-brand-cyan/10">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="pr-8 text-base font-semibold text-foreground">{s.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
    </div>
  );
}

function GallerySection() {
  const [expanded, setExpanded] = useState(false);
  const hasMore = gallery.length > GALLERY_PREVIEW_COUNT;
  const visible = expanded ? gallery : gallery.slice(0, GALLERY_PREVIEW_COUNT);

  return (
    <>
      {/* Mobile ma karuzelę — pokazujemy wszystko, bez przycisku "Pokaż wszystkie" */}
      <MobileCarousel dark items={gallery} renderItem={(g) => <GalleryCard g={g} />} />
      <div className="hidden md:grid grid-cols-3 gap-5">
        {visible.map((g, i) => (
          <GalleryCard key={g.image} g={g} index={i} />
        ))}
      </div>

      {hasMore ? (
        <Reveal delay={120} className="mt-8 hidden justify-center md:flex">
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            className="btn-secondary px-6 py-3 text-sm"
            aria-expanded={expanded}
          >
            <ChevronDown
              className={cn("h-4 w-4 transition-transform duration-300", expanded && "rotate-180")}
              aria-hidden
            />
            {expanded ? "Pokaż mniej" : `Pokaż wszystkie realizacje (${gallery.length})`}
          </button>
        </Reveal>
      ) : null}
    </>
  );
}

function GalleryCard({ g, index = 0 }: { g: (typeof gallery)[number]; index?: number }) {
  const { ref, className: revealClass } = useReveal<HTMLDivElement>();
  return (
    <figure
      ref={ref}
      className={cn("group", revealClass)}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/15 bg-brand-deep shadow-card ring-1 ring-white/10 transition-smooth md:group-hover:-translate-y-0.5 md:group-hover:border-brand-cyan/30 md:group-hover:shadow-glow">
        <img
          src={g.image}
          alt={g.alt}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
          decoding="async"
          width={800}
          height={600}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        />
      </div>
    </figure>
  );
}

const contactCards = [
  { type: "phone", icon: Phone, title: "Zadzwoń", value: PHONE_DISPLAY, href: PHONE_HREF },
  { type: "email", icon: Mail, title: "E-mail", value: EMAIL, href: EMAIL_HREF },
  ...(CONTACT_LOCATION
    ? [
        {
          type: HAS_PHYSICAL_ADDRESS ? ("address" as const) : ("area" as const),
          icon: MapPin,
          title: CONTACT_LOCATION_LABEL,
          value: CONTACT_LOCATION,
          href: HAS_PHYSICAL_ADDRESS ? MAPS_URL : (null as string | null),
        },
      ]
    : []),
  { type: "hours", icon: Clock, title: "Godziny", value: HOURS, href: null as string | null },
];

function ContactCard({
  c,
  index = 0,
  compact = false,
  stretch = false,
}: {
  c: (typeof contactCards)[number];
  index?: number;
  compact?: boolean;
  stretch?: boolean;
}) {
  const Icon = c.icon;
  const { ref, className: revealClass } = useReveal<HTMLDivElement>();
  const isPhone = c.type === "phone";
  const inner = (
    <div
      ref={ref}
      className={cn(
        "panel-glass flex min-w-0 items-center text-left transition-smooth md:hover:border-white/15",
        stretch ? "h-full flex-1" : "h-full",
        compact ? "gap-3 rounded-xl p-3.5" : "gap-4 rounded-2xl p-4",
        isPhone && "border-brand-cyan/20",
        revealClass,
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-brand-cyan transition-smooth group-hover:scale-105",
          compact ? "h-10 w-10" : "h-11 w-11",
          isPhone && "border-brand-cyan/25 bg-brand-cyan/10",
        )}
      >
        <Icon className={compact ? "h-[1.125rem] w-[1.125rem]" : "h-5 w-5"} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-white/55">{c.title}</p>
        <p
          className={cn(
            "mt-0.5 font-semibold text-white leading-snug",
            compact ? "text-base" : "text-sm",
            c.type === "email" ? "break-all leading-snug" : "break-words",
          )}
        >
          {c.value}
        </p>
      </div>
    </div>
  );
  return c.href ? (
    <a
      href={c.href}
      target={c.type === "address" ? "_blank" : undefined}
      rel="noreferrer"
      className={cn("group block min-w-0", stretch ? "flex min-h-0 flex-1 flex-col" : "h-full")}
    >
      {inner}
    </a>
  ) : (
    <div className={cn(stretch && "flex min-h-0 flex-1 flex-col")}>{inner}</div>
  );
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-white/10 backdrop-blur-[10px] transition-smooth",
        scrolled ? "bg-background/80 shadow-card" : "bg-background/60",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <a
          href="#top"
          className="flex items-center gap-2"
          onClick={() => setMenuOpen(false)}
        >
          <SiteLogo />
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-smooth hover:text-brand-cyan hover:underline hover:underline-offset-4"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={PHONE_HREF}
            className="btn-cta max-md:!hidden md:inline-flex px-5 py-2.5 text-sm"
          >
            <Phone className="h-4 w-4" /> Zadzwoń
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-smooth hover:bg-white/10 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
          >
            <Menu
              className={cn(
                "h-6 w-6 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                menuOpen ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100",
              )}
              aria-hidden
            />
            <X
              className={cn(
                "absolute h-6 w-6 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                menuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0",
              )}
              aria-hidden
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "grid md:hidden transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
        aria-hidden={!menuOpen}
        inert={!menuOpen ? true : undefined}
      >
        <div className="overflow-hidden">
          <div className="border-b border-white/10 bg-background/98 backdrop-blur-[10px]">
            <nav className="mx-auto flex max-w-6xl flex-col px-4 py-4 text-left">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  tabIndex={menuOpen ? undefined : -1}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "border-b border-white/10 py-3 text-base font-semibold text-foreground transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] last:border-0 hover:text-brand-cyan",
                    menuOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
                  )}
                  style={{ transitionDelay: menuOpen ? `${80 + i * 40}ms` : "0ms" }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

function Index() {
  const { googleReviews } = Route.useLoaderData();

  return (
    <div className="page-shell">
      <div className="page-ambient-scatter" aria-hidden />
      <div className="page-content">
      <SiteHeader />

      <div className="hero-services-unit">
        <div className="hero-services-bg" aria-hidden>
          <div
            className="hero-photo"
            style={{ backgroundImage: `url(${HERO_IMAGE ?? "/gallery/placeholder-1.svg"})` }}
          />
          <div className="hero-photo-scrim" />
        </div>

        <section
          id="top"
          className="relative z-10 scroll-mt-24 px-4 pt-6 pb-12 text-foreground max-md:min-h-[36rem] md:min-h-[34rem] md:pt-12 md:pb-16"
        >
        <div
          className={cn(
            "relative mx-auto max-w-6xl md:items-center",
            SECTIONS.contactForm ? "md:grid md:grid-cols-2 md:gap-12" : "md:text-center",
          )}
        >
          <div
            className={cn(
              "flex flex-col items-center text-center",
              SECTIONS.contactForm ? "md:items-start md:text-left" : "md:mx-auto md:max-w-2xl",
            )}
          >
            <div className="hero-enter hero-enter-delay-0 flex justify-center md:hidden">
              <HeroGoogleRating
                rating={googleReviews.rating}
                reviewCount={googleReviews.reviewCount}
                profileUrl={googleReviews.profileUrl || GOOGLE_REVIEWS_URL}
              />
            </div>

            <h1 className="hero-enter hero-enter-delay-1 mt-3 text-[2.85rem] font-bold leading-[1.05] max-md:mx-auto md:mt-4 md:text-[3.5rem] lg:text-[3.85rem]">
              {HERO_HEADLINE}
            </h1>

            <p className="hero-enter hero-enter-delay-2 mt-2 text-xl font-medium text-white/85 md:mt-2 md:text-2xl">
              {SITE_CITY}
            </p>

            <ul className="hero-enter hero-enter-delay-4 mx-auto mt-4 hidden max-w-xl space-y-2.5 text-left text-base leading-snug text-white/85 md:mx-0 md:block md:text-lg">
              {HERO_BULLETS.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5">
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-cyan shadow-[0_0_8px] shadow-brand-cyan/60"
                    aria-hidden
                  />
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="hero-enter hero-enter-delay-5 mt-5 hidden flex-col items-start gap-3 md:flex">
              <HeroGoogleRating
                rating={googleReviews.rating}
                reviewCount={googleReviews.reviewCount}
                profileUrl={googleReviews.profileUrl || GOOGLE_REVIEWS_URL}
              />
              <CTAButton />
            </div>

            {/* Mobile: Call przy H1 */}
            <div className="hero-enter hero-enter-delay-5 mt-5 flex justify-center md:hidden">
              <CTAButton className="px-7 py-3.5 text-[0.9375rem]" />
            </div>
          </div>

          {SECTIONS.contactForm ? (
            <>
              <div className="hero-enter hero-enter-delay-6 mx-6 my-6 flex items-center gap-3 md:hidden" aria-hidden>
                <span className="h-px flex-1 bg-white/12" />
                <span className="text-xs font-medium uppercase tracking-wide text-white/45">lub</span>
                <span className="h-px flex-1 bg-white/12" />
              </div>

              {/* Mobile: sam formularz */}
              <div className="hero-enter hero-enter-delay-7 w-full rounded-2xl border border-white/[0.06] bg-white/[0.04] p-5 backdrop-blur-[10px] md:hidden">
                <p className="text-center text-base font-semibold text-white">{SECTION_TITLES.formHeadline}</p>
                <p className="mt-1 text-center text-xs text-white/60">{SECTION_TITLES.formSubline}</p>
                <div className="mt-3.5">
                  <LeadForm idPrefix="hero-mobile" collapseExtras />
                </div>
              </div>

              {/* Desktop: formularz */}
              <div className="hero-enter hero-enter-delay-7 mt-5 hidden w-full rounded-2xl border border-white/[0.06] bg-white/[0.04] p-5 text-left backdrop-blur-[10px] md:mt-0 md:block">
                <p className="text-sm font-semibold text-white">{SECTION_TITLES.formHeadline}</p>
                <p className="mt-1 text-xs text-white/75">{SECTION_TITLES.formSubline}</p>
                <div className="mt-4">
                  <LeadForm idPrefix="hero-desktop" />
                </div>
              </div>
            </>
          ) : null}
        </div>
        </section>

        <Section
          id="uslugi"
          eyebrow={SECTION_TITLES.servicesEyebrow}
          title={SECTION_TITLES.servicesTitle}
          subtitle={SERVICES_SECTION_SUBTITLE}
          glow={{ x: "22%", y: "58%", strength: 0.035 }}
        >
          <MobileCarousel dark items={services} renderItem={(s) => <ServiceCard s={s} index={services.indexOf(s)} />} />
          <div className="hidden md:grid grid-cols-3 gap-5">
            {services.map((s, i) => (
              <ServiceCard key={s.title} s={s} index={i} />
            ))}
          </div>

          {SECTIONS.partners ? (
            <div className="mt-8">
              <PartnersSection />
            </div>
          ) : null}
        </Section>
      </div>

      {SECTIONS.howItWorks ? <HowItWorks /> : null}

      {SECTIONS.reviews ? (
        <Section
          id="opinie"
          eyebrow={SECTION_TITLES.reviewsEyebrow}
          title={SECTION_TITLES.reviewsTitle}
          subtitle={SECTION_TITLES.reviewsSubtitle}
          glow={{ x: "78%", y: "36%", cyan: true }}
        >
          <GoogleReviewsSection data={googleReviews} />
        </Section>
      ) : null}

      {SECTIONS.gallery ? (
        <Section
          id="realizacje"
          panel
          eyebrow={SECTION_TITLES.galleryEyebrow}
          title={SECTION_TITLES.galleryTitle}
          subtitle={GALLERY_SECTION_SUBTITLE}
          glow={{ x: "44%", y: "48%" }}
        >
          <GallerySection />
        </Section>
      ) : null}

      {SECTIONS.faq ? (
        <Section
          id="faq"
          eyebrow={SECTION_TITLES.faqEyebrow}
          title={SECTION_TITLES.faqTitle}
          subtitle={SECTION_TITLES.faqSubtitle}
        >
        <Reveal>
          <div className="card-glass mx-auto max-w-3xl rounded-xl px-2 md:px-4">
            <Accordion type="single" collapsible className="w-full text-left">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-white/10 px-2">
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:text-brand-cyan hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground md:text-base">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
            </Accordion>
          </div>
        </Reveal>
      </Section>
      ) : null}

      {/* KONTAKT + WYCENA */}
      <section
        id="kontakt"
        className="relative scroll-mt-24 overflow-hidden px-4 pt-10 pb-14 text-foreground md:pt-16 md:pb-20"
      >
        <div
          className="section-glow section-glow--cyan pointer-events-none"
          style={{ "--glow-x": "16%", "--glow-y": "55%", "--glow-strength": "0.05" } as CSSProperties}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl">
          <div id="wycena" className="scroll-mt-24">
            <div className="panel-glass rounded-2xl p-5 md:hidden">
              <Reveal className="text-center">
                <p className="section-eyebrow">{SECTION_TITLES.contactEyebrow}</p>
                <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-white">
                  {SECTION_TITLES.contactTitle}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-white/75">
                  {SECTION_TITLES.contactSubtitle}
                </p>
              </Reveal>

              <div className="mt-6 flex flex-col gap-3">
                {contactCards.map((c, i) => (
                  <ContactCard key={c.title} c={c} index={i} compact />
                ))}
              </div>

              {SECTIONS.contactForm ? (
                <>
                  <div className="mx-6 my-6 flex items-center gap-3" aria-hidden>
                    <span className="h-px flex-1 bg-white/12" />
                    <span className="text-xs font-medium uppercase tracking-wide text-white/45">lub</span>
                    <span className="h-px flex-1 bg-white/12" />
                  </div>

                  <Reveal delay={80}>
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.04] p-5 backdrop-blur-[10px]">
                      <p className="text-center text-base font-semibold text-white">{SECTION_TITLES.formHeadline}</p>
                      <p className="mt-1 text-center text-xs text-white/60">{SECTION_TITLES.formSubline}</p>
                      <div className="mt-3.5 [&_form]:text-left">
                        <LeadForm idPrefix="contact-mobile" collapseExtras />
                      </div>
                    </div>
                  </Reveal>
                </>
              ) : null}
            </div>

            <div className="panel-glass mx-auto hidden max-w-4xl rounded-2xl p-5 md:block md:p-8 lg:p-10">
              <Reveal className="text-center">
                <p className="section-eyebrow">{SECTION_TITLES.contactEyebrow}</p>
                <h2 className="mt-1.5 text-4xl font-bold tracking-tight text-white">
                  {SECTION_TITLES.contactTitle}
                </h2>
                <p className="mt-1.5 text-base leading-relaxed text-white/75">
                  {SECTION_TITLES.contactSubtitle}
                </p>
              </Reveal>

              {SECTIONS.contactForm ? (
                <div className="mx-auto mt-8 grid w-full md:grid-cols-[minmax(0,24rem)_minmax(0,26rem)] md:items-stretch md:justify-center md:gap-7 lg:mt-10 lg:gap-8">
                  <div className="flex h-full min-h-0 flex-col gap-3">
                    {contactCards.map((c, i) => (
                      <ContactCard key={c.title} c={c} index={i} compact stretch />
                    ))}
                  </div>

                  <Reveal className="h-full text-left">
                    <div className="flex h-full flex-col rounded-2xl border border-white/[0.06] bg-white/[0.04] p-5 backdrop-blur-[10px]">
                      <p className="text-sm font-semibold text-white">{SECTION_TITLES.formHeadline}</p>
                      <p className="mt-1 text-xs text-white/75">{SECTION_TITLES.formSubline}</p>
                      <div className="mt-4 flex flex-1 flex-col">
                        <LeadForm idPrefix="contact-desktop" />
                      </div>
                    </div>
                  </Reveal>
                </div>
              ) : (
                <div className="mx-auto mt-8 grid w-full max-w-md gap-3">
                  {contactCards.map((c, i) => (
                    <ContactCard key={c.title} c={c} index={i} compact stretch />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative px-4 pt-10 pb-24 text-foreground md:pb-8">
        <div className="mx-auto max-w-6xl text-center text-sm text-muted-foreground">
          <p className="font-bold text-foreground">{SITE_NAME} · {FOOTER_TAGLINE}</p>
          <p className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <a href={PHONE_HREF} className="inline-flex items-center gap-1.5 transition-smooth hover:text-foreground">
              <Phone className="h-3.5 w-3.5" /> {PHONE_DISPLAY}
            </a>
            <a
              href={EMAIL_HREF}
              className="inline-flex max-w-full items-center gap-1.5 break-all transition-smooth hover:text-foreground"
            >
              <Mail className="h-3.5 w-3.5 shrink-0" /> {EMAIL}
            </a>
            {CONTACT_LOCATION ? (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 shrink-0" /> {CONTACT_LOCATION}
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 shrink-0" /> {HOURS}
            </span>
          </p>
          <p className="mt-3 text-xs text-white/45">NIP: {NIP}</p>
          <p className="mt-4 text-xs text-white/45">
            <Link
              to="/polityka-prywatnosci"
              className="underline underline-offset-2 transition-smooth hover:text-foreground"
            >
              Polityka Prywatności (RODO)
            </Link>
            {" · "}© {new Date().getFullYear()} {SITE_NAME}. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </footer>

      <StickyCallBar />
      </div>
    </div>
  );
}

type SectionGlow = {
  x: string;
  y: string;
  cyan?: boolean;
  strong?: boolean;
  strength?: number;
};

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  glow,
  panel = false,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  glow?: SectionGlow;
  panel?: boolean;
  className?: string;
}) {
  const glowStyle = glow
    ? ({
        "--glow-x": glow.x,
        "--glow-y": glow.y,
        ...(glow.strength != null ? { "--glow-strength": String(glow.strength) } : {}),
      } as CSSProperties)
    : undefined;

  const header = (
    <Reveal className={`text-center ${eyebrow ? "mb-6 md:mb-10" : "mb-8 md:mb-12"}`}>
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <h2
        className={cn(
          "text-2xl font-bold tracking-tight md:text-4xl",
          panel ? "text-white" : "text-foreground",
          eyebrow && "mt-1.5",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-sm leading-relaxed md:text-base",
            panel ? "text-white/75" : "text-muted-foreground",
            eyebrow ? "mt-1.5" : "mt-2",
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );

  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 overflow-hidden px-4 pt-10 pb-14 text-foreground md:pt-16 md:pb-20",
        className,
      )}
    >
      {glow && (
        <div
          className={cn(
            "section-glow",
            glow.cyan && "section-glow--cyan",
            glow.strong && "section-glow--strong",
          )}
          style={glowStyle}
          aria-hidden
        />
      )}
      <div className="relative mx-auto max-w-6xl">
        {panel ? (
          <div className="panel-glass rounded-2xl p-5 text-center md:p-8 lg:p-10">
            {header}
            {children}
          </div>
        ) : (
          <>
            {header}
            {children}
          </>
        )}
      </div>
    </section>
  );
}