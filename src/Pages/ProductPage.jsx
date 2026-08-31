import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { X, Plus, Minus, ShoppingCart, Flame, Check, Zap } from "lucide-react";
import { addToCart, selectCartItems } from "../Redux/CartSlice";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import CustomerReview from "../Component/Customerreview";
import Title from "../Component/Title";

const PLACEHOLDER_PHOTO = "assets/images.jpg";
const ICONS = {
  scale: "/assets/scale.svg",
  chickenLeg: "/assets/chicken-leg.svg",
  cart: "/assets/add_shopping_cart.svg",
};
const FALLBACK_IMAGE = "assets/images.jpg";
const PRODUCTS = [
  {
    id: 1,
    title: "Chicken Drumstick",
    image: PLACEHOLDER_PHOTO,
    description:
      "A fleshy bone-in cut from the lower leg comprising dark meat that's the chicken's most flavourful and tender part.",
    bestFor: "Grilling and deep-frying.",
    variants: [
      { weight: "500 g", pieces: "5-6 pieces", price: 209, mrp: null },
      { weight: "1 kg", pieces: "10-12 pieces", price: 399, mrp: 419 },
      { weight: "2 kg", pieces: "20-24 pieces", price: 769, mrp: 838 },
    ],
  },
  {
    id: 2,
    title: "Chicken Curry Cut, Skinless",
    image: PLACEHOLDER_PHOTO,
    description:
      "Mixed bone-in pieces from the whole bird, cut to size for a curry pot. Skin removed for a lighter finish.",
    bestFor: "Curries and slow-cooking.",
    variants: [
      { weight: "500 g", pieces: "8-10 pieces", price: 179, mrp: null },
      { weight: "1 kg", pieces: "16-18 pieces", price: 349, mrp: null },
      { weight: "3 kg", pieces: "48-52 pieces", price: 1040, mrp: 1120 },
    ],
  },
  {
    id: 3,
    title: "Breast Boneless",
    image: PLACEHOLDER_PHOTO,
    description:
      "Lean, boneless breast fillets trimmed of fat and cartilage. Mild-flavoured and quick to cook through.",
    bestFor: "Grilling, stir-fry, and salads.",
    variants: [
      { weight: "250 g", pieces: "2 pieces", price: 149, mrp: null },
      { weight: "500 g", pieces: "3-4 pieces", price: 289, mrp: null },
      { weight: "3 kg", pieces: "6-7 pieces", price: 1662, mrp: null },
    ],
  },
  {
    id: 4,
    title: "Chicken Hot Wings, Marinated",
    image: PLACEHOLDER_PHOTO,
    description:
      "Whole wings marinated in a smoked-paprika chilli rub, ready to go straight from the fridge to the pan.",
    bestFor: "Air-fry, oven-bake, or deep-fry.",
    variants: [
      { weight: "250 g", pieces: "5-6 pieces", price: 109, mrp: 159 },
      { weight: "500 g", pieces: "10-12 pieces", price: 199, mrp: 299 },
    ],
  },
  {
    id: 5,
    title: "Fresh Chicken Kebab",
    image: PLACEHOLDER_PHOTO,
    description:
      "Hand-minced kebab, seasoned and shaped fresh to order. Skewer and grill, or shallow-fry as patties.",
    bestFor: "Pan-fry or grill on skewers.",
    variants: [
      { weight: "250 g", pieces: "6-8 pieces", price: 109, mrp: 200 },
      { weight: "500 g", pieces: "12-14 pieces", price: 199, mrp: null },
    ],
  },
  {
    id: 6,
    title: "Boneless Chicken Curry Cut",
    image: PLACEHOLDER_PHOTO,
    description:
      "All the flavour of curry cut without the bone-picking. Cubed thigh meat, evenly sized for even cooking.",
    bestFor: "Curries, kebabs, and stews.",
    variants: [
      { weight: "500 g", pieces: "—", price: 259, mrp: null },
      { weight: "1 kg", pieces: "—", price: 499, mrp: 529 },
    ],
  },
];

function fmt(rupees) {
  return `Rs. ${rupees.toLocaleString("en-IN")}`;
}

/* Single static image with a fallback if it ever fails to load. */
function ProductImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  return (
    <img
      src={failed ? FALLBACK_IMAGE : src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  );
}

function WeightTicket({ variants, index, onChange, size = "sm" }) {
  const pad = size === "lg" ? "px-3.5 py-2 text-sm" : "px-2.5 py-1 text-xs";
  return (
    <div className="flex flex-wrap gap-1.5">
      {variants.map((v, i) => (
        <button
          key={v.weight}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onChange(i);
          }}
          className={`relative font-mono font-semibold rounded-md border transition-colors duration-150 ${pad} ${
            i === index
              ? "bg-[#A32020] border-[#A32020] text-white"
              : "bg-white border-[#ECE1D2] text-[#2B2320] hover:border-[#D98E2B]"
          }`}
        >
          {v.weight}
        </button>
      ))}
    </div>
  );
}

function RibbonSeal() {
  return (
    <div
      className="absolute top-2.5 left-2.5 z-10 flex flex-col items-center justify-center w-11 h-11 rounded-full bg-[#5F8161] text-white shadow-sm"
      style={{ transform: "rotate(-10deg)" }}
    >
      <span className="text-[8px] font-bold uppercase leading-none tracking-wide">
        Fresh
      </span>
      <span className="text-[7px] font-semibold uppercase leading-none mt-0.5">
        Today
      </span>
    </div>
  );
}

function DeliveryRow() {
  return (
    <div className="flex items-center gap-1.5 text-xs text-[#6B5F52]">
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#FBE7D8]">
        <Zap
          className="h-2.5 w-2.5 text-[#D98E2B]"
          fill="#D98E2B"
          strokeWidth={0}
        />
      </span>
      Delivery in 30 mins
    </div>
  );
}

function ProductCard({
  product,
  selectedIndex,
  onSelectVariant,
  onOpen,
  onAdd,
  justAdded,
}) {
  const variant = product.variants[selectedIndex];

  return (
    <div
      onClick={() => onOpen(product.id)}
      className="
    group cursor-pointer bg-white rounded-2xl border border-[#ECE1D2] shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col w-full"
    >
      <div className="relative w-full   aspect-[4/3] bg-[#FBE7D8] overflow-hidden">
        <ProductImage
          src={product.image}
          alt={product.title}
          className="group-hover:scale-105 transition-transform duration-300"
        />
        <RibbonSeal />
        {variant.mrp && (
          <div className="absolute bottom-0 right-0 z-10 bg-[#A32020] text-white text-xs font-bold px-3 py-1.5 rounded-tl-md">
            {Math.round((1 - variant.price / variant.mrp) * 100)}% OFF
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 px-4 pt-3 pb-4 gap-3">
        <h3
          className="text-[15px] font-semibold text-[#2B2320] leading-snug"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {product.title}
        </h3>

        <div className="flex items-center gap-4 text-xs text-[#6B5F52]">
          <span className="flex items-center gap-1.5">
            <img src={ICONS.scale} alt="" className="w-4 h-4 object-contain" />
            {variant.weight}
          </span>
          {variant.pieces !== "—" && (
            <span className="flex items-center gap-1.5">
              <img
                src={ICONS.chickenLeg}
                alt=""
                className="w-4 h-4 object-contain"
              />
              {variant.pieces}
            </span>
          )}
        </div>

        <WeightTicket
          variants={product.variants}
          index={selectedIndex}
          onChange={(i) => onSelectVariant(product.id, i)}
        />

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-baseline gap-2">
            <span
              className="text-base font-bold text-[#2B2320]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {fmt(variant.price)}
            </span>
            {variant.mrp && (
              <span className="text-xs text-[#B4A99A] line-through font-mono">
                {fmt(variant.mrp)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAdd(product.id, 1);
            }}
            className={`flex items-center gap-2 active:scale-95 transition-all duration-150 text-white text-xs font-bold uppercase tracking-wide pl-1 pr-4 py-1 rounded-full shadow-sm ${
              justAdded ? "bg-[#5F8161]" : "bg-[#ED7D2C] hover:bg-[#df6d1c]"
            }`}
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white shrink-0">
              {justAdded ? (
                <Check className="w-4 h-4 text-[#5F8161]" strokeWidth={3} />
              ) : (
                <ShoppingCart
                  className="w-4 h-4 text-[#D98E2B]"
                  strokeWidth={2.2}
                />
              )}
            </span>
            {justAdded ? "Added" : "Add"}
          </button>
        </div>

        <DeliveryRow />
      </div>
    </div>
  );
}

function ProductDialog({
  product,
  selectedIndex,
  onSelectVariant,
  onClose,
  onAdd,
  justAdded,
}) {
  const [qty, setQty] = useState(1);
  const variant = product.variants[selectedIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#2B2320]/50 sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-3xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2"
      >
        {/* Drag-handle affordance, mobile bottom-sheet only */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1">
          <span className="h-1 w-10 rounded-full bg-[#ECE1D2]" />
        </div>

        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-20 flex items-center justify-center w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-white/90 border border-[#ECE1D2] text-[#2B2320] hover:bg-[#FBE7D8] transition-colors"
        >
          <X className="w-4 h-4" strokeWidth={2.4} />
        </button>

        <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-full bg-[#FBE7D8]">
          <ProductImage src={product.image} alt={product.title} />
          <RibbonSeal />
        </div>

        <div className="flex flex-col p-5 sm:p-6 gap-3.5 sm:gap-4">
          <h2
            className="text-xl sm:text-2xl font-bold text-[#A32020] leading-tight"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            {product.title}
          </h2>

          <p className="text-sm text-[#4A4038] leading-relaxed">
            {product.description}
          </p>

          <p className="text-sm text-[#2B2320]">
            <span className="font-semibold">Best suited for:</span>{" "}
            {product.bestFor}
          </p>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#6B5F52] mb-2">
              Choose weight
            </p>
            <WeightTicket
              variants={product.variants}
              index={selectedIndex}
              onChange={(i) => onSelectVariant(product.id, i)}
              size="lg"
            />
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-[#6B5F52]">
            <span className="flex items-center gap-1.5">
              <img
                src={ICONS.scale}
                alt=""
                className="w-4 h-4 object-contain"
              />
              {variant.weight}
            </span>
            {variant.pieces !== "—" && (
              <span className="flex items-center gap-1.5">
                <img
                  src={ICONS.chickenLeg}
                  alt=""
                  className="w-4 h-4 object-contain"
                />
                {variant.pieces}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Flame className="w-4 h-4" strokeWidth={2} />
              Fresh, cut to order
            </span>
          </div>

          <div className="flex items-baseline gap-2 mt-1">
            <span
              className="text-xl sm:text-2xl font-bold text-[#2B2320]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {fmt(variant.price)}
            </span>
            {variant.mrp && (
              <span className="text-sm text-[#B4A99A] line-through font-mono">
                {fmt(variant.mrp)}
              </span>
            )}
          </div>

          <DeliveryRow />

          <div className="flex items-center gap-3 mt-2 pb-1">
            <div className="flex items-center border border-[#ECE1D2] rounded-full shrink-0">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center text-[#2B2320] hover:bg-[#FBE7D8] rounded-full"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-semibold font-mono">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center text-[#2B2320] hover:bg-[#FBE7D8] rounded-full"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => onAdd(product.id, qty)}
              className={`flex-1 flex items-center justify-center gap-2 active:scale-95 transition-all duration-150 text-white text-sm font-bold uppercase tracking-wide py-2.5 rounded-full shadow-sm ${
                justAdded ? "bg-[#5F8161]" : "bg-[#ED7D2C] hover:bg-[#ce651a]"
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" strokeWidth={3} /> Added to cart
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" strokeWidth={2.2} /> Add{" "}
                  {fmt(variant.price * qty)}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const [selections, setSelections] = useState(
    Object.fromEntries(PRODUCTS.map((p) => [p.id, 0])),
  );
  const [openId, setOpenId] = useState(null);
  const [addedId, setAddedId] = useState(null);

  // Lock background scroll while the product dialog is open — important on
  // mobile where the sheet sits over the page rather than replacing it.
  useEffect(() => {
    document.body.style.overflow = openId ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openId]);

  const handleSelectVariant = (id, index) => {
    setSelections((s) => ({ ...s, [id]: index }));
  };

  // id = product id, qty = how many of the selected variant to add
  const handleAdd = (id, qty = 1) => {
    const product = PRODUCTS.find((p) => p.id === id);
    const variant = product.variants[selections[id]];
    const lineId = `${id}-${variant.weight}`;

    const alreadyInCart = cartItems.some((item) => item.lineId === lineId);

    dispatch(
      addToCart({
        productId: product.id,
        title: product.title,
        image: product.image,
        weight: variant.weight,
        pieces: variant.pieces,
        price: variant.price,
        mrp: variant.mrp,
        qty,
      }),
    );

    if (alreadyInCart) {
      toast.info(
        `${product.title} (${variant.weight}) quantity updated in cart`,
        {
          autoClose: 1800,
        },
      );
    } else {
      toast.success(`${product.title} (${variant.weight}) added to cart`, {
        autoClose: 1800,
      });
    }

    setAddedId(id);
    window.setTimeout(
      () => setAddedId((cur) => (cur === id ? null : cur)),
      1200,
    );
  };

  const openProduct = PRODUCTS.find((p) => p.id === openId) || null;

  return (
    <>
      <section className="w-full bg-[#F3EEE6] py-10">
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap');
        section, section * { font-family: 'Inter', sans-serif; }
      `}</style>

        <ToastContainer position="bottom-left" theme="light" />
        <Navbar />
        <div className="max-w-6xl mx-auto px-6 sm:px-10 mb-8 flex items-start justify-between py-10">
          <div>
            <h1
              className="text-3xl font-bold text-[#2B2320]"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Freshly cut, weighed right
            </h1>
            <p className="text-sm text-[#6B5F52] mt-1">
              Pick a weight, see the price update, tap a card for the full cut.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 sm:px-10">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              selectedIndex={selections[product.id]}
              onSelectVariant={handleSelectVariant}
              onOpen={setOpenId}
              onAdd={handleAdd}
              justAdded={addedId === product.id}
            />
          ))}
        </div>

        {openProduct && (
          <ProductDialog
            product={openProduct}
            selectedIndex={selections[openProduct.id]}
            onSelectVariant={handleSelectVariant}
            onClose={() => setOpenId(null)}
            onAdd={handleAdd}
            justAdded={addedId === openProduct.id}
          />
        )}
      </section>
      <section className="pb-20  bg-[#F3EEE6]">
        <img src="assets/fresh-and-healthy-desktop.jpg" />
      </section>
      <section className="bg-[#F3EEE6] pb-">
        <Title
          title="Best Selling Items"
          subtitle="Discover our most popular products."
          align="centre"
        />
        <CustomerReview />
      </section>
      <div className="bg-black">
        <Footer />
      </div>
    </>
  );
}
