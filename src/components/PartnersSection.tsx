import { Reveal } from "@/components/Reveal";
import { PARTNERS } from "@/lib/site";

export function PartnersSection() {
  if (PARTNERS.length === 0) return null;

  return (
    <Reveal className="relative z-10 px-4 pb-6 md:pb-8">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-xs font-medium uppercase tracking-wide text-white/55">Autoryzowany partner</p>

        <ul className="mx-auto mt-3 grid max-w-sm grid-cols-2 gap-x-4 gap-y-2.5 text-xs font-medium leading-snug text-white/80 sm:max-w-md sm:text-sm md:hidden">
          {PARTNERS.map((partner) => (
            <li key={partner} className="text-center">
              {partner}
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-2 hidden max-w-3xl text-sm font-medium text-white/80 md:block md:text-base">
          {PARTNERS.join(" · ")}
        </p>
      </div>
    </Reveal>
  );
}
