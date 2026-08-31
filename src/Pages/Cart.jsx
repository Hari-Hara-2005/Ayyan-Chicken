import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  X,
  ChevronLeft,
  ChevronUp,
  Truck,
  User,
  Mail,
  Phone,
  Home,
  MapPin,
  Check,
  ShoppingBasket,
} from "lucide-react";
import Footer from "../Component/Footer";
import Navbar from "../Component/Navbar";
import Title from "../Component/Title.jsx";
import { removeFromCart, clearCart, selectCartItems } from "../Redux/cartSlice"; // adjust path to match your project
import CartItemCard from "../Component/Cartitemcard.jsx";

/* ----------------------------- Design tokens ----------------------------- */
const BRAND = "#7A3E2E";
const BRAND_DARK = "#4E2A1F";
const GOLD = "#C89B3C";
const PISTACHIO = "#5B7553";
const INK = "#2B1B12";
const CREAM = "#FBF3E6";
const MUTED = "#8a7a6d";
const PAPER_LINE = "rgba(122,62,46,0.18)";

const DELIVERY_ZONES = [
  {
    id: "local",
    label: "Kumbakonam & nearby areas",
    description: "Town + surrounding villages & district",
    fee: 0,
    icon: "home",
  },
  {
    id: "other",
    label: "Rest of Tamil Nadu & India",
    description: "Flat delivery fee applied",
    fee: 0,
    icon: "truck",
  },
];

const formatINR = (amount) => `₹${Math.round(amount).toLocaleString("en-IN")}`;

/* A small custom WhatsApp glyph — lucide-react doesn't ship brand icons */
const WhatsAppIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.762.464 3.484 1.346 4.997L2 22l5.144-1.341a9.96 9.96 0 0 0 4.86 1.238h.004c5.514 0 9.997-4.483 9.997-9.997 0-2.67-1.04-5.18-2.929-7.07a9.935 9.935 0 0 0-7.072-2.827zm0 18.19h-.003a8.26 8.26 0 0 1-4.204-1.152l-.301-.179-3.053.796.815-2.976-.196-.306a8.24 8.24 0 0 1-1.264-4.376c0-4.55 3.703-8.253 8.256-8.253a8.2 8.2 0 0 1 5.838 2.42 8.2 8.2 0 0 1 2.417 5.839c-.001 4.553-3.704 8.257-8.305 8.257z" />
  </svg>
);

/* -------------------------------------------------------------------------- */
/*  Order Summary — the shopkeeper's paper ticket, tear-line perforation and   */
/*  torn bottom edge, all in Tailwind now.                                    */
/* -------------------------------------------------------------------------- */
const TicketDivider = () => (
  <div className="relative my-[18px] h-0">
    <div
      className="absolute -left-7 -right-7 top-0"
      style={{ borderTop: `1.5px dashed ${PAPER_LINE}` }}
    />
    <div
      className="absolute -left-[34px] -top-1.5 h-3 w-3 rounded-full"
      style={{ backgroundColor: CREAM, border: `1.5px solid ${PAPER_LINE}` }}
    />
    <div
      className="absolute -right-[34px] -top-1.5 h-3 w-3 rounded-full"
      style={{ backgroundColor: CREAM, border: `1.5px solid ${PAPER_LINE}` }}
    />
  </div>
);

const ZoneIcon = ({ type, active }) => {
  const Icon = type === "home" ? Home : Truck;
  return (
    <div
      className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] transition-all duration-150 ${
        active
          ? "bg-[#5B7553] text-white"
          : "bg-[#7A3E2E]/[0.07] text-[#7A3E2E]"
      }`}
    >
      <Icon size={17} strokeWidth={2} />
    </div>
  );
};

function OrderSummaryCard({
  itemCount,
  subtotal,
  savings,
  zones,
  selectedZone,
  onZoneChange,
  shippingFee,
  total,
  onPlaceOrder,
  sticky,
}) {
  return (
    <div className={sticky ? "md:sticky md:top-24" : ""}>
      <div
        className="relative overflow-visible rounded-[18px] border bg-[#FBF3E6] px-[26px] pb-[28px] pt-6 shadow-[0_18px_40px_-20px_rgba(74,38,25,0.45)]"
        style={{ borderColor: PAPER_LINE }}
      >
        {shippingFee === 0 && (
          <div
            className="absolute -right-2 top-3.5 rotate-[4deg] rounded-tl-md rounded-bl-sm px-[14px] py-[5px] shadow-[0_4px_10px_rgba(0,0,0,0.18)]"
            style={{ backgroundColor: GOLD, color: "#3a2a0e" }}
          >
            <span
              className="whitespace-nowrap text-[0.62rem] font-extrabold uppercase tracking-wide"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Free delivery
            </span>
            <span
              className="absolute -right-1.5 top-1/2 h-0 w-0 -translate-y-1/2"
              style={{
                borderTop: "7px solid transparent",
                borderBottom: "7px solid transparent",
                borderLeft: `6px solid ${GOLD}`,
              }}
            />
          </div>
        )}

        <div className="flex items-center gap-2">
          <ShoppingBasket size={19} style={{ color: BRAND }} />
          <h2
            className="text-[1.28rem] font-semibold text-[#2B1B12]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Your Order Ticket
          </h2>
        </div>
        <p
          className="mt-1 text-[0.78rem]"
          style={{ color: MUTED, fontFamily: "'Manrope', sans-serif" }}
        >
          {itemCount} {itemCount === 1 ? "item" : "items"} · weighed & packed
          fresh
        </p>

        <TicketDivider />

        <div
          className="flex flex-col gap-[9px]"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          <div className="flex justify-between">
            <span className="text-[0.86rem] text-[#5c4d40]">Subtotal</span>
            <span className="text-[0.86rem] font-bold text-[#2B1B12]">
              {formatINR(subtotal + savings)}
            </span>
          </div>
          {savings > 0 && (
            <div className="flex justify-between">
              <span className="text-[0.86rem] text-[#5c4d40]">You saved</span>
              <span
                className="text-[0.86rem] font-bold"
                style={{ color: PISTACHIO }}
              >
                − {formatINR(savings)}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-[0.86rem] text-[#5c4d40]">Shipping</span>
            <span
              className="text-[0.86rem] font-bold"
              style={{ color: PISTACHIO }}
            >
              {shippingFee > 0 ? formatINR(shippingFee) : "FREE"}
            </span>
          </div>
        </div>

        <p
          className="mb-[9px] mt-[19px] text-[0.7rem] font-bold uppercase tracking-wide"
          style={{ color: BRAND, fontFamily: "'Manrope', sans-serif" }}
        >
          Deliver to
        </p>

        <div className="flex flex-col gap-2">
          {zones.map((zone) => {
            const selected = zone.id === selectedZone;
            return (
              <div
                key={zone.id}
                onClick={() => onZoneChange(zone.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") onZoneChange(zone.id);
                }}
                className={`flex cursor-pointer items-center gap-[10px] rounded-xl border-[1.5px] p-[10px] transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  selected ? "bg-[#5B7553]/[0.08]" : "bg-white/40"
                }`}
                style={{
                  borderColor: selected ? PISTACHIO : "rgba(122,62,46,0.14)",
                }}
              >
                <ZoneIcon type={zone.icon} active={selected} />
                <div className="min-w-0 flex-1">
                  <p
                    className="text-[0.82rem] font-bold text-[#2B1B12]"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {zone.label}
                  </p>
                  <p
                    className="mt-0.5 text-[0.7rem]"
                    style={{
                      color: MUTED,
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  >
                    {zone.description}
                  </p>
                </div>
                <div
                  className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2"
                  style={{ borderColor: selected ? PISTACHIO : "#c9bcae" }}
                >
                  {selected && (
                    <div
                      className="h-[9px] w-[9px] rounded-full"
                      style={{ backgroundColor: PISTACHIO }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <TicketDivider />

        <div className="flex items-baseline justify-between">
          <h3
            className="text-[1.1rem] font-semibold text-[#2B1B12]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Total
          </h3>
          <div className="text-right">
            <p
              className="text-[1.4rem] font-extrabold leading-tight"
              style={{ color: BRAND, fontFamily: "'Manrope', sans-serif" }}
            >
              {formatINR(total)}
            </p>
            <p
              className="text-[0.64rem]"
              style={{ color: MUTED, fontFamily: "'Manrope', sans-serif" }}
            >
              incl. all taxes
            </p>
          </div>
        </div>

        <button
          onClick={onPlaceOrder}
          className="mt-[21px] hidden w-full items-center justify-center gap-2 rounded-full bg-[#7A3E2E] py-[11px] text-[0.92rem] font-bold text-white shadow-[0_10px_22px_rgba(122,62,46,0.35)] transition-all duration-150 hover:-translate-y-px hover:bg-[#4E2A1F] active:translate-y-px md:inline-flex"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          <WhatsAppIcon className="h-[18px] w-[18px]" />
          Place Order
        </button>

        <div
          className="absolute inset-x-0 -bottom-[9px] h-[18px] bg-[length:18px_18px] bg-left-bottom"
          style={{
            backgroundImage: `linear-gradient(135deg, ${CREAM} 25%, transparent 25%), linear-gradient(225deg, ${CREAM} 25%, transparent 25%)`,
          }}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Checkout — genuine two-step flow (contact, then delivery)                 */
/* -------------------------------------------------------------------------- */
const fieldClass = (hasError) => `
  w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition-colors
  ${hasError ? "border-red-400 focus:ring-2 focus:ring-red-200" : "focus:border-[#7A3E2E] focus:ring-2 focus:ring-[#7A3E2E]/15"}
`;

function CheckoutModal({ open, onClose, cartItems, zone, total, onSubmit }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateStep1 = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Enter your full name";
    if (!form.phone.trim()) next.phone = "Enter a phone number";
    else if (!/^\d{10}$/.test(form.phone.trim()))
      next.phone = "Enter a valid 10-digit number";
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim()))
      next.email = "Enter a valid email";
    setErrors((prev) => ({ ...prev, ...next }));
    return Object.keys(next).length === 0;
  };

  const validateStep2 = () => {
    const next = {};
    if (!form.address.trim()) next.address = "Enter your delivery address";
    if (!form.city.trim()) next.city = "Enter your city";
    if (!form.pincode.trim()) next.pincode = "Enter your pincode";
    else if (!/^\d{6}$/.test(form.pincode.trim()))
      next.pincode = "Enter a valid 6-digit pincode";
    setErrors((prev) => ({ ...prev, ...next }));
    return Object.keys(next).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };
  const handleBack = () => setStep(1);
  const handleSubmit = () => {
    if (validateStep2()) onSubmit(form);
  };
  const handleClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[1300] flex items-end justify-center bg-black/50 sm:items-center"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-full w-full flex-col overflow-hidden bg-[#FBF3E6] sm:h-auto sm:max-h-[85vh] sm:w-full sm:max-w-md sm:rounded-3xl"
        style={{
          backgroundImage: `radial-gradient(rgba(122,62,46,0.05) 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
        }}
      >
        {/* Header */}
        <div
          className="relative px-6 py-5 text-white"
          style={{
            background: `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})`,
          }}
        >
          {step === 2 && (
            <button
              onClick={handleBack}
              aria-label="Back"
              className="absolute left-2.5 top-4 rounded-full p-1.5 hover:bg-white/10"
            >
              <ChevronLeft size={18} />
            </button>
          )}
          <div className={step === 2 ? "pl-7" : ""}>
            <h2
              className="text-[1.3rem] font-semibold"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              {step === 1
                ? "Who\u2019s this order for?"
                : "Where should we deliver?"}
            </h2>
            <p
              className="mt-1 text-[0.82rem] opacity-85"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              {step === 1
                ? "A couple of details so we can reach you"
                : "We\u2019ll pack it fresh and send it your way"}
            </p>
          </div>

          <div className="mt-[13px] flex items-center gap-2">
            {[1, 2].map((n) => (
              <React.Fragment key={n}>
                <div className="flex items-center gap-[6px]">
                  <div
                    className={`flex h-[22px] w-[22px] items-center justify-center rounded-full text-[0.72rem] font-extrabold transition-all duration-200 ${
                      step >= n
                        ? "bg-white text-[#7A3E2E]"
                        : "bg-white/[0.18] text-white/70"
                    }`}
                  >
                    {step > n ? <Check size={14} /> : n}
                  </div>
                  <span
                    className={`text-[0.74rem] font-bold ${step >= n ? "text-white" : "text-white/65"}`}
                  >
                    {n === 1 ? "Contact" : "Delivery"}
                  </span>
                </div>
                {n === 1 && <div className="h-[1.5px] w-5 bg-white/35" />}
              </React.Fragment>
            ))}
          </div>

          <button
            onClick={handleClose}
            aria-label="Close"
            className="absolute right-3.5 top-3.5 rounded-full p-1.5 hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7">
          <div
            className="mb-6 rounded-2xl border border-dashed p-4"
            style={{
              backgroundColor: "rgba(200,155,60,0.12)",
              borderColor: PAPER_LINE,
            }}
          >
            <div className="mb-[10px] flex items-center gap-[6px]">
              <ShoppingBasket size={15} style={{ color: BRAND }} />
              <span
                className="text-[0.72rem] font-extrabold uppercase tracking-wide"
                style={{ color: BRAND, fontFamily: "'Manrope', sans-serif" }}
              >
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}{" "}
                on this ticket
              </span>
            </div>
            <div className="flex flex-col gap-[6px]">
              {cartItems.map((item) => (
                <div key={item.lineId} className="flex justify-between gap-2">
                  <p
                    className="min-w-0 truncate text-[0.8rem] text-[#2B1B12]"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {item.title}{" "}
                    <span style={{ color: MUTED }}>({item.weight})</span>
                  </p>
                  <p
                    className="whitespace-nowrap text-[0.8rem] font-bold text-[#2B1B12]"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    ×{item.qty} · {formatINR(item.price * item.qty)}
                  </p>
                </div>
              ))}
            </div>
            <div
              className="my-[10px] border-t"
              style={{ borderColor: "rgba(122,62,46,0.15)" }}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <MapPin size={14} style={{ color: PISTACHIO }} />
                <span
                  className="text-[0.75rem] font-bold"
                  style={{
                    color: PISTACHIO,
                    fontFamily: "'Manrope', sans-serif",
                  }}
                >
                  {zone.label}
                </span>
              </div>
              <p
                className="text-[0.95rem] font-extrabold"
                style={{ color: BRAND, fontFamily: "'Manrope', sans-serif" }}
              >
                Total: {formatINR(total)}
              </p>
            </div>
          </div>

          {step === 1 ? (
            <div
              className="flex flex-col gap-4"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              <div>
                <label className="mb-1 block text-xs font-semibold text-[#5c4d40]">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2"
                    style={{ color: MUTED }}
                  />
                  <input
                    autoFocus
                    value={form.fullName}
                    onChange={handleChange("fullName")}
                    className={`${fieldClass(errors.fullName)} pl-10`}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#5c4d40]">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2"
                    style={{ color: MUTED }}
                  />
                  <input
                    value={form.phone}
                    onChange={handleChange("phone")}
                    className={`${fieldClass(errors.phone)} pl-10`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[#5c4d40]">
                  Email Address (optional)
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2"
                    style={{ color: MUTED }}
                  />
                  <input
                    value={form.email}
                    onChange={handleChange("email")}
                    className={`${fieldClass(errors.email)} pl-10`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <button
                onClick={handleNext}
                className="mt-1 w-full rounded-full bg-[#7A3E2E] py-[14px] text-[0.92rem] font-bold text-white shadow-[0_10px_20px_rgba(122,62,46,0.28)] transition-colors hover:bg-[#4E2A1F]"
              >
                Continue to delivery address
              </button>
            </div>
          ) : (
            <div
              className="flex flex-col gap-4"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              <div>
                <label className="mb-1 block text-xs font-semibold text-[#5c4d40]">
                  Full Address
                </label>
                <div className="relative">
                  <Home
                    size={16}
                    className="absolute left-3.5 top-3.5"
                    style={{ color: MUTED }}
                  />
                  <textarea
                    autoFocus
                    rows={2}
                    placeholder="House/Flat No., Street, Landmark"
                    value={form.address}
                    onChange={handleChange("address")}
                    className={`${fieldClass(errors.address)} resize-none pl-10`}
                  />
                </div>
                {errors.address && (
                  <p className="mt-1 text-xs text-red-500">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-[#5c4d40]">
                    City
                  </label>
                  <div className="relative">
                    <MapPin
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2"
                      style={{ color: MUTED }}
                    />
                    <input
                      value={form.city}
                      onChange={handleChange("city")}
                      className={`${fieldClass(errors.city)} pl-10`}
                    />
                  </div>
                  {errors.city && (
                    <p className="mt-1 text-xs text-red-500">{errors.city}</p>
                  )}
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-[#5c4d40]">
                    Pincode
                  </label>
                  <div className="relative">
                    <MapPin
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2"
                      style={{ color: MUTED }}
                    />
                    <input
                      value={form.pincode}
                      onChange={handleChange("pincode")}
                      className={`${fieldClass(errors.pincode)} pl-10`}
                    />
                  </div>
                  {errors.pincode && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.pincode}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-[#7A3E2E] py-[15px] text-[0.95rem] font-bold text-white shadow-[0_10px_20px_rgba(122,62,46,0.32)] transition-colors hover:bg-[#4E2A1F]"
              >
                <WhatsAppIcon className="h-[18px] w-[18px]" />
                Send Order on WhatsApp
              </button>
              <p className="text-center text-[0.7rem]" style={{ color: MUTED }}>
                🔒 Your details are only used for order processing
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Empty state                                                               */
/* -------------------------------------------------------------------------- */
const EmptyCart = () => (
  <div className="py-16 text-center sm:py-24">
    <div className="mx-auto mb-[20px] flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#7A3E2E]/[0.07]">
      <ShoppingBasket size={35} className="text-[#7A3E2E]/40" />
    </div>
    <h2
      className="text-[1.35rem] font-semibold text-[#2B1B12]"
      style={{ fontFamily: "'Fraunces', serif" }}
    >
      Your basket is empty
    </h2>
    <p
      className="mb-6 mt-[5px] text-[0.88rem]"
      style={{ color: MUTED, fontFamily: "'Manrope', sans-serif" }}
    >
      Fill it up with a few of our fresh-roasted dry fruits.
    </p>
    <button
      onClick={() => window.history.back()}
      className="rounded-full bg-[#7A3E2E] px-8 py-[10px] font-bold text-white shadow-[0_10px_20px_rgba(122,62,46,0.28)] transition-colors hover:bg-[#4E2A1F]"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      Continue Shopping
    </button>
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Cart page                                                                  */
/* -------------------------------------------------------------------------- */
export default function Cart() {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const [selectedZoneId, setSelectedZoneId] = useState(DELIVERY_ZONES[0].id);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 420);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const selectedZone =
    DELIVERY_ZONES.find((z) => z.id === selectedZoneId) || DELIVERY_ZONES[0];

  const totalItemCount = cartItems.reduce(
    (sum, item) => sum + (item.qty || 1),
    0,
  );
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0,
  );
  const originalTotal = cartItems.reduce(
    (sum, item) => sum + (item.mrp ?? item.price) * (item.qty || 1),
    0,
  );
  const savings = Math.max(0, originalTotal - subtotal);
  const shippingFee = selectedZone.fee;
  const total = subtotal + shippingFee;

  const handleRemoveFromCart = (lineId) => dispatch(removeFromCart(lineId));
  const handleClearCart = () => dispatch(clearCart());

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
    setCheckoutOpen(true);
  };

  const handleCheckoutSubmit = (details) => {
    const itemLines = cartItems
      .map(
        (item) =>
          `• ${item.title} (${item.weight}) ×${item.qty} — ${formatINR(item.price * item.qty)}`,
      )
      .join("\n");

    const message =
      `Hi! I'd like to place an order 🌰\n\n` +
      `*Order Summary*\n${itemLines}\n\n` +
      `*Delivery Zone:* ${selectedZone.label}\n` +
      `*Total:* ${formatINR(total)} (incl. all taxes)\n\n` +
      `*Delivery Details*\n` +
      `Name: ${details.fullName}\n` +
      (details.email.trim() ? `Email: ${details.email}\n` : "") +
      `Phone: ${details.phone}\n` +
      `Address: ${details.address}, ${details.city} - ${details.pincode}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "919952857016";
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    const whatsappUrl = isMobile
      ? `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    setCheckoutOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700;800&display=swap');
      `}</style>

      <Navbar color="#000" />

      <div className="relative overflow-x-hidden bg-[#FBF3E6] bg-[radial-gradient(rgba(122,62,46,0.05)_1px,transparent_1px)] bg-[length:16px_16px]">
        <img
          src="Images/leaf3.avif"
          alt=""
          className="absolute -z-10 -ml-24 mt-0 w-[70%] opacity-90 sm:mt-40 sm:w-[50%] md:-mt-2 md:w-[25%]"
        />

        <div className="flex items-end justify-between px-4 pt-4 sm:px-10 sm:pt-6 md:px-8">
          <div>
            <Title color={INK}>Your Cart</Title>
            {cartItems.length > 0 && (
              <p
                className="-mt-2 text-[0.82rem]"
                style={{ color: MUTED, fontFamily: "'Manrope', sans-serif" }}
              >
                {totalItemCount} {totalItemCount === 1 ? "item" : "items"} ready
                to be packed
              </p>
            )}
          </div>
          {cartItems.length > 0 && (
            <span
              onClick={handleClearCart}
              className="shrink-0 cursor-pointer text-[0.8rem] font-bold underline decoration-1 underline-offset-[3px] transition-colors hover:text-[#7A3E2E]"
              style={{ color: MUTED, fontFamily: "'Manrope', sans-serif" }}
            >
              Clear cart
            </span>
          )}
        </div>

        <div className="relative z-30 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
              <div className="order-2 md:order-1 md:col-span-7 lg:col-span-8">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
                  {cartItems.map((item) => (
                    <div
                      key={item.lineId}
                      className="flex h-full rounded-2xl transition-all duration-[180ms] hover:-translate-y-[3px] hover:shadow-[0_14px_28px_-16px_rgba(74,38,25,0.35)] [&>*]:w-full"
                    >
                      <CartItemCard
                        product={item}
                        onRemove={() => handleRemoveFromCart(item.lineId)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-1 md:order-2 md:col-span-5 lg:col-span-4">
                <OrderSummaryCard
                  itemCount={cartItems.length}
                  subtotal={subtotal}
                  savings={savings}
                  zones={DELIVERY_ZONES}
                  selectedZone={selectedZoneId}
                  onZoneChange={setSelectedZoneId}
                  shippingFee={shippingFee}
                  total={total}
                  onPlaceOrder={handlePlaceOrder}
                  sticky
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {cartItems.length > 0 && (
        <div
          className="fixed inset-x-0 bottom-0 z-[1150] flex items-center justify-between gap-3 border-t bg-[#FBF3E6] px-4 py-[11px] shadow-[0_-8px_24px_rgba(74,38,25,0.16)] md:hidden"
          style={{ borderColor: PAPER_LINE }}
        >
          <div className="min-w-0">
            <p
              className="text-[0.66rem] uppercase tracking-wide"
              style={{ color: MUTED, fontFamily: "'Manrope', sans-serif" }}
            >
              {totalItemCount} {totalItemCount === 1 ? "item" : "items"}{" "}
              {shippingFee === 0 ? "· Free delivery" : ""}
            </p>
            <p
              className="text-[1.15rem] font-extrabold leading-tight"
              style={{ color: BRAND, fontFamily: "'Manrope', sans-serif" }}
            >
              {formatINR(total)}
            </p>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="flex shrink-0 items-center gap-2 rounded-full bg-[#7A3E2E] px-6 py-[9px] text-[0.86rem] font-bold text-white shadow-[0_8px_18px_rgba(122,62,46,0.32)] transition-colors hover:bg-[#4E2A1F]"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            <WhatsAppIcon className="h-4 w-4" />
            Place Order
          </button>
        </div>
      )}

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cartItems={cartItems}
        zone={selectedZone}
        total={total}
        onSubmit={handleCheckoutSubmit}
      />

      <div className="mt-20 bg-black px-2 sm:mt-32 md:mt-40">
        <Footer />
      </div>

      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed right-4 z-[1200] flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#7A3E2E] text-white shadow-[0_10px_24px_rgba(74,38,25,0.45)] transition-all duration-200 hover:bg-[#4E2A1F] md:hidden ${
          cartItems.length ? "bottom-24" : "bottom-5"
        } ${showScrollTop ? "translate-y-0 scale-100 opacity-100 pointer-events-auto" : "translate-y-3 scale-[0.85] opacity-0 pointer-events-none"}`}
      >
        <ChevronUp size={22} />
      </button>
    </>
  );
}
