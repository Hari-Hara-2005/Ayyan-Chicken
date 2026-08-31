import { useDispatch } from "react-redux";
import { Plus, Minus, Trash2 } from "lucide-react";
import { incrementQty, decrementQty } from "../Redux/cartSlice"; // adjust path to match your project

const MUTED = "#8a7a6d";
const PISTACHIO = "#5B7553";
const PAPER_LINE = "rgba(122,62,46,0.18)";

const formatINR = (amount) => `₹${Math.round(amount).toLocaleString("en-IN")}`;

export default function CartItemCard({ product, onRemove }) {
  const dispatch = useDispatch();
  const { lineId, title, image, weight, pieces, price, mrp, qty } = product;

  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-white"
      style={{ borderColor: PAPER_LINE }}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FBE7D8]">
        <img src={image} alt={title} className="h-full w-full object-cover" />
        <button
          onClick={onRemove}
          aria-label="Remove item"
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#7A3E2E] shadow-sm transition-colors hover:bg-[#7A3E2E] hover:text-white"
        >
          <Trash2 size={15} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 px-4 pb-4 pt-3">
        <h3
          className="text-[15px] font-semibold leading-snug text-[#2B1B12]"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {title}
        </h3>

        <div
          className="flex items-center gap-2 text-xs"
          style={{ color: MUTED }}
        >
          <span>{weight}</span>
          {pieces && pieces !== "—" && <span>· {pieces}</span>}
        </div>

        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span
              className="text-base font-bold text-[#2B1B12]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {formatINR(price)}
            </span>
            {mrp && (
              <span className="font-mono text-xs text-[#B4A99A] line-through">
                {formatINR(mrp)}
              </span>
            )}
          </div>

          <div
            className="flex items-center rounded-full border"
            style={{ borderColor: PAPER_LINE }}
          >
            <button
              onClick={() => dispatch(decrementQty(lineId))}
              aria-label="Decrease quantity"
              className="flex h-7 w-7 items-center justify-center rounded-full text-[#2B1B12] hover:bg-[#FBE7D8]"
            >
              <Minus size={13} />
            </button>
            <span
              className="w-6 text-center text-sm font-semibold text-[#2B1B12]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {qty}
            </span>
            <button
              onClick={() => dispatch(incrementQty(lineId))}
              aria-label="Increase quantity"
              className="flex h-7 w-7 items-center justify-center rounded-full text-[#2B1B12] hover:bg-[#FBE7D8]"
            >
              <Plus size={13} />
            </button>
          </div>
        </div>

        <p
          className="text-right text-xs font-semibold"
          style={{ color: PISTACHIO }}
        >
          Subtotal: {formatINR(price * qty)}
        </p>
      </div>
    </div>
  );
}
