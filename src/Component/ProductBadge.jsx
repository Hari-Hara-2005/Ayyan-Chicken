import { useState } from "react";
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

function ProductBadge({ label, icon: Icon, index, active, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className="flex flex-col items-center gap-3 group cursor-pointer
        opacity-0 [animation:badge-in_0.5s_ease-out_forwards]
        motion-reduce:opacity-100 motion-reduce:[animation:none]
        focus:outline-none"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div
        className={
          "relative flex items-center justify-center rounded-full border-2 " +
          "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 " +
          "transition-all duration-300 ease-out " +
          "group-hover:-translate-y-1 group-active:translate-y-0 group-active:scale-95 " +
          "group-focus-visible:ring-2 group-focus-visible:ring-red-400 group-focus-visible:ring-offset-2 " +
          (active
            ? "border-red-500 bg-gradient-to-b from-red-500 to-orange-500 shadow-lg shadow-red-200"
            : "border-red-200 bg-gradient-to-b from-orange-50 to-white shadow-sm group-hover:shadow-md group-hover:border-red-500")
        }
      >
        {/* pulse ring on active */}
        {active && (
          <span className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping [animation-iteration-count:1]" />
        )}

        <Icon
          strokeWidth={1.75}
          className={
            "w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 transition-all duration-300 " +
            "group-hover:scale-110 group-hover:-rotate-6 " +
            (active ? "text-white" : "text-orange-500 group-hover:text-red-600")
          }
        />
      </div>

      <span
        className={
          "relative text-[11px] sm:text-xs md:text-sm " +
          "font-bold uppercase tracking-wide text-center leading-snug " +
          "max-w-[6.5rem] transition-colors duration-200 " +
          (active ? "text-red-600" : "text-red-900 group-hover:text-red-600")
        }
      >
        {label}
        <span
          className={
            "absolute left-1/2 -bottom-1.5 h-0.5 -translate-x-1/2 bg-red-500 rounded-full " +
            "transition-all duration-300 ease-out " +
            (active ? "w-6" : "w-0 group-hover:w-6")
          }
        />
      </span>
    </button>
  );
}

export default function ProductsSection() {
  const [selected, setSelected] = useState(products[0].label);

  return (
    <section className="w-full bg-[#F3EEE6] px-6 py-10 sm:px-10 sm:py-12 flex justify-center">
      <style>{`
        @keyframes badge-in {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        className="grid gap-x-20 gap-y-10
          grid-cols-3
          xs:grid-cols-3
          sm:grid-cols-4
          md:grid-cols-6
          max-w-5xl"
      >
        {products.map((p, i) => (
          <ProductBadge
            key={p.label}
            label={p.label}
            icon={p.icon}
            index={i}
            active={selected === p.label}
            onSelect={() => setSelected(p.label)}
          />
        ))}
      </div>
    </section>
  );
}