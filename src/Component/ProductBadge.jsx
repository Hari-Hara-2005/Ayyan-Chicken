import {
  Drumstick,
  CookingPot,
  Egg,
  Flame,
  Sandwich,
  Microwave,
} from "lucide-react";

const products = [
  { label: "Chicken", icon: Drumstick },
  { label: "Fresh Marinades", icon: CookingPot },
  { label: "Eggs", icon: Egg },
  { label: "Ready to Cook", icon: Flame },
  { label: "Cold Cuts", icon: Sandwich },
  { label: "Heat and Eat", icon: Microwave },
];

function ProductBadge({ label, icon: Icon }) {
  return (
    <div className="flex flex-col items-center gap-3 group cursor-pointer">
      <div
        className="flex items-center justify-center rounded-full border-2
          w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24
          border-red-200 bg-gradient-to-b from-orange-50 to-white
          shadow-sm transition-all duration-200
          group-hover:shadow-md
          group-hover:border-red-500
          group-hover:-translate-y-0.5"
      >
        <Icon
          strokeWidth={1.75}
          className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10
            text-orange-500
            group-hover:text-red-600
            transition-colors duration-200"
        />
      </div>

      <span
        className="text-[11px] sm:text-xs md:text-sm
          font-bold uppercase tracking-wide
          text-red-900 text-center leading-snug
          max-w-[6.5rem]"
      >
        {label}
      </span>
    </div>
  );
}

export default function ProductsSection() {
  return (
    <section className="w-full bg-white px-6 py-10 sm:px-10 sm:py-12 flex justify-center">
      <div
        className="grid gap-x-20 gap-y-10
          grid-cols-3
          xs:grid-cols-3
          sm:grid-cols-4
          md:grid-cols-6
          max-w-5xl"
      >
        {products.map((p) => (
          <ProductBadge key={p.label} label={p.label} icon={p.icon} />
        ))}
      </div>
    </section>
  );
}
