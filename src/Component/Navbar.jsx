import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Menu,
  X,
  ShoppingCart,
  ChevronRight,
  Home,
  Beef,
  LayoutGrid,
  Store,
  FlaskConical,
} from "lucide-react";
import { selectCartCount } from "../Redux/CartSlice";

const NAV_ITEMS = [
  { label: "Home", to: "/", icon: Home },
  { label: "Product", to: "/product", icon: Beef },
  { label: "Categories", to: "/categories", icon: LayoutGrid },
  { label: "Store", to: "/store", icon: Store },
  { label: "Lab Reports", to: "/lab-reports", icon: FlaskConical },
];

function NavLinkItem({ label, to, icon: Icon, onClick, active, delay }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      data-aos="fade-down"
      data-aos-delay={delay}
      data-aos-duration="500"
      data-aos-once="true"
      className="group relative flex items-center gap-1.5 px-3.5 py-2 text-[0.85rem] font-semibold text-[#1A1512] transition-colors hover:text-[#1A1512]"
    >
      <Icon
        size={15}
        strokeWidth={2.2}
        className={`transition-colors ${active ? "text-[#ED7D2C]" : "text-[#1A1512]/50 group-hover:text-[#ED7D2C]"}`}
      />
      {label}
      <span
        className={`
          pointer-events-none absolute left-3.5 right-3.5 -bottom-0.5 h-[2px] rounded-full bg-[#ED7D2C]
          origin-left transition-transform duration-300 ease-out
          ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
        `}
      />
    </Link>
  );
}

function MobileNavLinkItem({ label, to, icon: Icon, onClick, active }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`
        group flex items-center justify-between rounded-xl px-4 py-3.5 text-[0.95rem] font-semibold
        transition-colors
        ${active ? "bg-[#FDF6DF] text-[#1A1512]" : "text-[#1A1512] hover:bg-[#FDF6DF]"}
      `}
    >
      <span className="flex items-center gap-3">
        <span
          className={`
            flex h-8 w-8 items-center justify-center rounded-full transition-colors
            ${active ? "bg-[#ED7D2C] text-[#1A1512]" : "bg-black/5 text-[#1A1512]/60 group-hover:bg-[#ED7D2C] group-hover:text-[#1A1512]"}
          `}
        >
          <Icon size={15} strokeWidth={2.2} />
        </span>
        {label}
      </span>
      <ChevronRight
        size={16}
        strokeWidth={2.5}
        className="text-[#ED7D2C] opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0"
      />
    </Link>
  );
}

function Logo() {
  return (
    <div
      className="flex items-center gap-3"
      data-aos="fade-right"
      data-aos-duration="600"
      data-aos-once="true"
    >
      <Link to="/" className="shrink-0">
        <div className="rounded-full p-[2px] ring-1 ring-[#f7bd02]/0 transition-all duration-300 hover:ring-[#f7bd02]/60">
          <img
            src="assets/logo.png"
            alt="Ayaan Chicken Logo"
            className="h-11 w-11 rounded-full object-cover shadow-[0_1px_4px_rgba(0,0,0,0.25)]"
          />
        </div>
      </Link>

      <Link to="/" className="min-w-0">
        <span
          className="block text-[1.15rem] sm:text-[1.25rem] md:text-[1.35rem] font-bold leading-none text-[#1A1512]"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Ayaan Chicken
        </span>
        <span className="mt-1 block text-[10px] sm:text-[11px] font-medium leading-none text-[#ED7D2C]">
          Freshest meats and much more
        </span>
      </Link>
    </div>
  );
}

/* Small reusable cart icon with a count badge.
   size="sm" -> compact, for the circular mobile trigger
   size="lg" -> paired with text, for the desktop "Go to Cart" button */
function CartBadge({ count, size = "lg" }) {
  if (!count) return null;
  return (
    <span
      className={`
        absolute -top-2 -right-2 flex items-center justify-center rounded-full
        bg-[#A32020] font-bold leading-none text-white ring-2 ring-white
        ${size === "sm" ? "h-4 min-w-4 px-1 text-[9px]" : "h-[18px] min-w-[18px] px-1 text-[10px]"}
      `}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const cartCount = useSelector(selectCartCount);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // Close the mobile menu automatically if the viewport grows past the lg breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        nav, nav * { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Spacer when navbar becomes fixed */}
      {isScrolled && <div className="h-[76px]" />}

      <nav
        className={`
          ${isScrolled ? "fixed top-0 left-0 w-full" : "relative mx-auto w-full max-w-[1300px]"}
          z-[1200]
          bg-white/95
          backdrop-blur-md
          transition-all
          duration-300
          ease-in-out
          border-b
          ${isScrolled ? "rounded-none border-black/5 shadow-[0_2px_20px_rgba(0,0,0,0.06)]" : "rounded-2xl border-transparent"}
        `}
      >
        <div
          className={`
            flex
            items-center
            justify-between
            min-h-0
            py-4
            px-4
            transition-all
            duration-300
            md:px-6
            lg:py-5
            lg:${isScrolled ? "px-6" : "px-3"}
          `}
        >
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {NAV_ITEMS.map((item, i) => (
              <NavLinkItem
                key={item.label}
                label={item.label}
                to={item.to}
                icon={item.icon}
                active={location.pathname === item.to}
                delay={150 + i * 60}
              />
            ))}
          </div>

          {/* Desktop Cart Button */}
          <Link to="/cart">
            <button
              data-aos="fade-left"
              data-aos-duration="600"
              data-aos-delay="200"
              data-aos-once="true"
              className="
                hidden lg:flex items-center gap-2.5
                rounded-full bg-[#ED7D2C] py-2.5 pl-2.5 pr-5
                text-[0.8rem] font-bold tracking-wide text-[#fff]
                shadow-[0_1px_2px_rgba(0,0,0,0.08)]
                transition-all duration-200
                hover:bg-[#e97025] hover:text-white hover:shadow-[0_4px_14px_rgba(0,0,0,0.18)]
                active:scale-[0.97]
              "
            >
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white">
                <ShoppingCart
                  size={15}
                  strokeWidth={2.4}
                  className="text-[#1A1512]"
                />
                <CartBadge count={cartCount} size="lg" />
              </span>
              Go to cart
            </button>
          </Link>

          {/* Mobile Cart + Menu Toggle */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <Link
              to="/cart"
              aria-label="Go to cart"
              className="
                relative flex h-10 w-10 items-center justify-center
                rounded-full bg-[#ED7D2C] text-[#fff]
                shadow-[0_1px_2px_rgba(0,0,0,0.08)]
                transition-colors hover:bg-[#da6b1c] hover:text-white
              "
            >
              <ShoppingCart size={19} strokeWidth={2.2} />
              <CartBadge count={cartCount} size="sm" />
            </Link>

            <button
              onClick={() => setIsMobileOpen((v) => !v)}
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
              className="
                flex h-10 w-10 items-center justify-center rounded-full
                bg-[#1A1512] text-white
                transition-transform duration-200 active:scale-90
              "
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <div
          className={`
            overflow-hidden
            transition-all
            duration-300
            ease-in-out
            lg:hidden
            ${isMobileOpen ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="flex flex-col gap-1 border-t border-black/5 px-4 py-4">
            {NAV_ITEMS.map((item) => (
              <MobileNavLinkItem
                key={item.label}
                label={item.label}
                to={item.to}
                icon={item.icon}
                active={location.pathname === item.to}
                onClick={() => setIsMobileOpen(false)}
              />
            ))}

            <Link to="/cart" className="mt-2">
              <button
                onClick={() => setIsMobileOpen(false)}
                className="
                  relative flex w-full items-center justify-center gap-2.5
                  rounded-full bg-[#ED7D2C] py-3.5 pr-6 pl-2.5
                  text-[0.85rem] font-bold tracking-wide text-[#fff]
                  transition-colors hover:bg-[#e9620e] hover:text-white
                "
              >
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  <ShoppingCart
                    size={15}
                    strokeWidth={2.4}
                    className="text-[#1A1512]"
                  />
                  <CartBadge count={cartCount} size="lg" />
                </span>
                Go to cart
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
