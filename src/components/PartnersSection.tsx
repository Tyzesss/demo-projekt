import { Reveal } from "@/components/Reveal";
import { PARTNERS } from "@/lib/site";

export function PartnersSection() {
  if (PARTNERS.length === 0) return null;

  return (
    <Reveal className="relative z-10 px-4 pb-6 md:pb-8">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-xs font-medium uppercase tracking-wide text-white/55 md:text-sm">Autoryzowany partner</p>

        <ul className="mx-auto mt-3 flex max-w-[18rem] flex-wrap justify-center gap-x-3 gap-y-2 text-xs font-medium text-white/80 sm:max-w-md sm:text-sm md:hidden">
          {PARTNERS.map((partner) => (
            <li key={partner} className="whitespace-nowrap">
              {partner}
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-2 hidden max-w-4xl text-sm font-medium text-white/80 md:block md:text-base lg:text-lg">
          {PARTNERS.join(" · ")}
        </p>
      </div>
    </Reveal>
  );
}
