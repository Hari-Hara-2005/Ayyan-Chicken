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

// "Rs. 1040" -> 1040 (cartSlice stores numeric price for totals)
function parsePrice(display) {
  if (!display) return 0;
  const digits = display.replace(/[^\d.]/g, "");
  return Number(digits) || 0;
}

function RibbonBadge({ text }) {
  return (
    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
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

function ProductCard({ product, onAdd, justAdded }) {
  const { image, badge, discount, title, weight, pieces, price, mrp } = product;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col w-full max-w-[300px]">
      <div className="relative w-full aspect-[4/3] bg-gray-50">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        {badge && <RibbonBadge text={badge} />}
        {discount && <DiscountBadge text={discount} />}
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
            className={`flex items-center gap-2 active:scale-95 transition-all duration-150 text-white text-xs font-bold uppercase tracking-wide pl-1 pr-4 py-1 rounded-full shadow-sm ${
              justAdded ? "bg-green-600" : "bg-[#ED7D2C] hover:bg-orange-500"
            }`}
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white shrink-0">
              {justAdded ? (
                <Check className="w-4 h-4 text-green-600" strokeWidth={3} />
              ) : (
                <img
                  src={ICONS.cart}
                  alt=""
                  className="w-4 h-4 object-contain"
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
    <section className="w-full bg-[#F3EEE6] py-10">
      <ToastContainer position="bottom-center" theme="light" />

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
        {products.map((p) => (
          <div
            key={p.id}
            className="shrink-0 w-[72%] sm:w-[45%] md:w-full snap-start"
          >
            <ProductCard
              product={p}
              onAdd={handleAdd}
              justAdded={addedId === p.id}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
