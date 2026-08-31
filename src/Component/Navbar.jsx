import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X, ShoppingCart } from "lucide-react";
import { selectCartCount } from "../Redux/cartSlice"; // adjust path to match your project structure

const NAV_ITEMS = [
  { label: "HOME", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/service" },
  { label: "Product", to: "/product" },
  { label: "Faq", to: "/faq" },
  { label: "CONTACT", to: "/contact-us" },
];

function NavLinkItem({ label, to, onClick, mobile, delay }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      data-aos={mobile ? undefined : "fade-down"}
      data-aos-delay={mobile ? undefined : delay}
      data-aos-duration="500"
      data-aos-once="true"
      className={
        mobile
          ? `
            block
            w-full
            px-5 py-3
            text-[0.9rem]
            font-bold
            tracking-[0.03em]
            uppercase
            text-black
            transition-colors
            hover:text-[#f7bd02]
          `
          : `
            flex items-center
            px-5 py-2
            text-[0.85rem]
            font-bold
            tracking-[0.03em]
            uppercase
            text-black
            transition-colors
            hover:bg-transparent
            hover:text-[#f7bd02]
          `
      }
    >
      {label}
    </Link>
  );
}

function Logo() {
  return (
    <div
      className="flex items-center gap-2"
      data-aos="fade-right"
      data-aos-duration="600"
      data-aos-once="true"
    >
      {/* Logo */}
      <div className="shrink-0">
        <Link to="/">
          <img
            src="/assets/LV.tuxpi.png"
            alt="Legacy Vault Logo"
            className="
        w-auto
        h-9
        sm:h-10
        object-contain
        drop-shadow-[0_0_2px_#000]
      "
          />
        </Link>
      </div>

      {/* Brand Name */}
      <div className="min-w-0">
        <span
          className="
        block
        text-[1.1rem]
        sm:text-[1.2rem]
        md:text-[1.3rem]
        font-extrabold
        tracking-[0.02em]
        text-black
        leading-tight
      "
        >
          LEGACY VAULT
          {/* Hidden on laptop (lg) and above */}
          <span
            className="
          block
          text-[8px]
          sm:text-[9px]
          md:text-[10px]
          font-semibold
          tracking-[0.08em]
          text-[#C9A227]
          mt-0.5
          
        "
          >
            PRESERVING WEALTH. BUILDING LEGACY
          </span>
        </span>
      </div>
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
        absolute
        -top-1.5
        -right-1.5
        flex
        items-center
        justify-center
        rounded-full
        bg-black
        text-white
        font-bold
        leading-none
        ${size === "sm" ? "h-4 min-w-4 px-1 text-[9px]" : "h-5 min-w-5 px-1.5 text-[10px]"}
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
      {/* Spacer when navbar becomes fixed */}
      {isScrolled && <div className="h-[76px]" />}

      <nav
        className={`
          ${isScrolled ? "fixed top-0 left-0 w-full" : "relative mx-auto w-full max-w-[1300px]"}
          z-[1200]
          bg-white
          transition-all
          duration-300
          ease-in-out
          ${isScrolled ? "rounded-none shadow-md" : "rounded-2xl"}
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
            lg:py-6
            lg:${isScrolled ? "px-6" : "px-3"}
          `}
        >
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-2 lg:flex">
            {NAV_ITEMS.map((item, i) => (
              <NavLinkItem
                key={item.label}
                label={item.label}
                to={item.to}
                delay={150 + i * 60}
              />
            ))}
          </div>

          {/* Desktop Contact / Cart Button */}
          <Link to="/cart">
            <button
              data-aos="fade-left"
              data-aos-duration="600"
              data-aos-delay="200"
              data-aos-once="true"
              className="
              relative
              hidden
              lg:flex
              items-center
              gap-2
              rounded-full
              bg-[#f7bd02]
              px-6
              py-3.5
              text-[0.8rem]
              font-bold
              tracking-[0.03em]
              uppercase
              text-black
              transition-colors
              hover:bg-black
              hover:text-white
            "
            >
              <span className="relative flex items-center">
                <ShoppingCart size={16} strokeWidth={2.4} />
                <CartBadge count={cartCount} size="lg" />
              </span>
              Go to Cart
            </button>
          </Link>

          {/* Mobile Cart + Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/service-booking"
              aria-label="Go to cart"
              className="
                relative
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-[#f7bd02]
                text-black
                transition-colors
                hover:bg-black
                hover:text-white
              "
            >
              <ShoppingCart size={20} strokeWidth={2.2} />
              <CartBadge count={cartCount} size="sm" />
            </Link>

            <button
              onClick={() => setIsMobileOpen((v) => !v)}
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-[#f7bd02]
                text-black
                transition-colors
                hover:bg-black
                hover:text-white
              "
            >
              {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
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
            ${isMobileOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="flex flex-col gap-1 border-t border-[#0d3b34]/10 px-4 py-4">
            {NAV_ITEMS.map((item) => (
              <NavLinkItem
                key={item.label}
                label={item.label}
                to={item.to}
                mobile
                onClick={() => setIsMobileOpen(false)}
              />
            ))}
            <Link to="/service-booking">
              <button
                onClick={() => setIsMobileOpen(false)}
                className="
                relative
                mt-2
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-full
                bg-[#f7bd02]
                px-6
                py-3.5
                text-[0.8rem]
                font-bold
                tracking-[0.03em]
                uppercase
                text-black
                transition-colors
                hover:bg-black
                hover:text-white
              "
              >
                <span className="relative flex items-center">
                  <ShoppingCart size={16} strokeWidth={2.4} />
                  <CartBadge count={cartCount} size="lg" />
                </span>
                Let's Get In 1:1
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
