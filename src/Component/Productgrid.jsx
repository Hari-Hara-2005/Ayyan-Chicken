import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Check } from "lucide-react";
import { addToCart, selectCartItems } from "../Redux/CartSlice";

const ICONS = {
  scale: "/assets/scale.svg",
  chickenLeg: "/assets/chicken-leg.svg",
  cart: "/assets/add_shopping_cart.svg",
};

const rawProducts = [
  {
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800&auto=format&fit=crop",
    badge: "3 Kg Pack",
    title: "3 kg Super Saver Pack - Chicken Curry Cut...",
    weight: "3 kgs",
    pieces: null,
    price: "Rs. 1040",
    mrp: null,
  },
  {
    image:
      "https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=800&auto=format&fit=crop",
    badge: "3 Kg Pack",
    title: "3 kg Super Saver Pack - Breast Boneless",
    weight: "3 kgs",
    pieces: "6-7 pieces",
    price: "Rs. 1662",
    mrp: null,
  },
  {
    image:
      "https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=800&auto=format&fit=crop",
    discount: "31% OFF",
    title: "Chicken Hot Wings Marinades",
    weight: "250 grams",
    pieces: "5-6 pieces",
    price: "Rs. 109",
    mrp: "Rs. 159",
  },
  {
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop",
    title: "Fresh-Chicken Kebab",
    weight: "250 grams",
    pieces: "6 - 8 pieces",
    price: "Rs. 109",
    mrp: null,
  },
  {
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800&auto=format&fit=crop",
    badge: "3 Kg Pack",
    title: "3 kg Super Saver Pack - Chicken Curry Cut...",
    weight: "3 kgs",
    pieces: null,
    price: "Rs. 1040",
    mrp: null,
  },
  {
    image:
      "https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=800&auto=format&fit=crop",
    badge: "3 Kg Pack",
    title: "3 kg Super Saver Pack - Breast Boneless",
    weight: "3 kgs",
    pieces: "6-7 pieces",
    price: "Rs. 1662",
    mrp: null,
  },
  {
    image:
      "https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=800&auto=format&fit=crop",
    discount: "31% OFF",
    title: "Chicken Hot Wings Marinades",
    weight: "250 grams",
    pieces: "5-6 pieces",
    price: "Rs. 109",
    mrp: "Rs. 159",
  },
  {
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop",
    title: "Fresh-Chicken Kebab",
    weight: "250 grams",
    pieces: "6 - 8 pieces",
    price: "Rs. 109",
    mrp: null,
  },
];

const products = rawProducts.map((p, index) => ({ ...p, id: index }));

// "Rs. 1040" -> 1040 (CartSlice stores numeric price for totals)
function parsePrice(display) {
  if (!display) return 0;
  const digits = display.replace(/[^\d.]/g, "");
  return Number(digits) || 0;
}

function RibbonBadge({ text }) {
  return (
    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
      <div className="absolute top-2 -right-8 w-32 rotate-45 bg-red-800 text-white text-[10px] font-bold text-center py-1 leading-tight shadow">
        {text}
      </div>
    </div>
  );
}

function DiscountBadge({ text }) {
  return (
    <div className="absolute bottom-0 right-0 bg-red-800 text-white text-xs font-bold px-3 py-1.5 rounded-tl-md">
      {text}
    </div>
  );
}

function CartQtyBadge({ qty }) {
  if (!qty) return null;
  return (
    <div
      key={qty}
      className="absolute top-2 left-2 min-w-[22px] h-[22px] px-1.5 rounded-full bg-gray-900/85 text-white text-[11px] font-bold flex items-center justify-center [animation:badge-pop_0.25s_ease-out]"
    >
      {qty}
    </div>
  );
}

function ProductCard({ product, index, onAdd, justAdded, cartQty }) {
  const { image, badge, discount, title, weight, pieces, price, mrp } = product;
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-orange-100
        transition-all duration-300 overflow-hidden flex flex-col w-full max-w-[300px]
        opacity-0 [animation:card-in_0.5s_ease-out_forwards]
        motion-reduce:opacity-100 motion-reduce:[animation:none]"
      style={{ animationDelay: `${Math.min(index, 7) * 70}ms` }}
    >
      <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden">
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100" />
        )}
        <img
          src={image}
          alt={title}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out
            group-hover:scale-[1.08] ${imgLoaded ? "opacity-100" : "opacity-0"}`}
        />
        {badge && <RibbonBadge text={badge} />}
        {discount && <DiscountBadge text={discount} />}
        <CartQtyBadge qty={cartQty} />
      </div>

      <div className="flex flex-col flex-1 px-4 pt-3 pb-4">
        <h3 className="text-[15px] font-semibold text-gray-900 leading-snug line-clamp-2 min-h-[2.6em]">
          {title}
        </h3>

        <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
          {weight && (
            <span className="flex items-center gap-1.5">
              <img
                src={ICONS.scale}
                alt=""
                className="w-4 h-4 object-contain"
              />
              {weight}
            </span>
          )}
          {pieces && (
            <span className="flex items-center gap-1.5">
              <img
                src={ICONS.chickenLeg}
                alt=""
                className="w-4 h-4 object-contain"
              />
              {pieces}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-gray-900">{price}</span>
            {mrp && (
              <span className="text-sm text-gray-400 line-through">{mrp}</span>
            )}
          </div>

          <button
            type="button"
            onClick={() => onAdd(product)}
            className={`flex items-center gap-2 active:scale-90 transition-all duration-150 text-white text-xs font-bold uppercase tracking-wide pl-1 pr-4 py-1 rounded-full shadow-sm hover:shadow-md ${
              justAdded
                ? "bg-green-600 [animation:btn-pop_0.3s_ease-out]"
                : "bg-[#ED7D2C] hover:bg-orange-500"
            }`}
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white shrink-0">
              {justAdded ? (
                <Check
                  className="w-4 h-4 text-green-600 [animation:check-in_0.25s_ease-out]"
                  strokeWidth={3}
                />
              ) : (
                <img
                  src={ICONS.cart}
                  alt=""
                  className="w-4 h-4 object-contain transition-transform duration-200 group-hover:rotate-[-6deg]"
                />
              )}
            </span>
            {justAdded ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductGrid() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [addedId, setAddedId] = useState(null);

  const handleAdd = (product) => {
    const lineId = `${product.id}-${product.weight}`;
    const alreadyInCart = cartItems.some((item) => item.lineId === lineId);

    dispatch(
      addToCart({
        productId: product.id,
        title: product.title,
        image: product.image,
        weight: product.weight,
        pieces: product.pieces,
        price: parsePrice(product.price),
        mrp: product.mrp ? parsePrice(product.mrp) : null,
        qty: 1,
      }),
    );

    if (alreadyInCart) {
      toast.info(`${product.title} quantity updated in cart`, {
        autoClose: 1800,
      });
    } else {
      toast.success(`${product.title} added to cart`, {
        autoClose: 1800,
      });
    }

    setAddedId(product.id);
    window.setTimeout(
      () => setAddedId((cur) => (cur === product.id ? null : cur)),
      1200,
    );
  };

  return (
    <section className="relative w-full bg-[#F3EEE6] py-10">
      <style>{`
        @keyframes card-in {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes badge-pop {
          0% { transform: scale(0.4); opacity: 0; }
          60% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); }
        }
        @keyframes btn-pop {
          0% { transform: scale(0.92); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes check-in {
          from { transform: scale(0) rotate(-20deg); opacity: 0; }
          to { transform: scale(1) rotate(0); opacity: 1; }
        }
      `}</style>

      <ToastContainer position="bottom-center" theme="light" />

      {/* edge fade hints that the row scrolls, mobile only */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[#F3EEE6] to-transparent md:hidden z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[#F3EEE6] to-transparent md:hidden z-10" />

      <div
        className="
          flex md:grid
          overflow-x-auto md:overflow-visible
          snap-x snap-mandatory md:snap-none
          gap-4 md:gap-6
          px-6 sm:px-10 md:px-10
          md:grid-cols-3 lg:grid-cols-4
          max-w-7xl mx-auto
          md:justify-items-center
          pb-4 md:pb-0
          [&::-webkit-scrollbar]:hidden
          [-ms-overflow-style:none]
          [scrollbar-width:none]
        "
      >
        {products.map((p, i) => {
          const lineId = `${p.id}-${p.weight}`;
          const cartQty = cartItems
            .filter((item) => item.lineId === lineId)
            .reduce((sum, item) => sum + (item.qty || 0), 0);

          return (
            <div
              key={p.id}
              className="shrink-0 w-[72%] sm:w-[45%] md:w-full snap-start"
            >
              <ProductCard
                product={p}
                index={i}
                onAdd={handleAdd}
                justAdded={addedId === p.id}
                cartQty={cartQty}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
