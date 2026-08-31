import { useState } from "react";
import { Link } from "react-router-dom";

/* ------------------------------------------------------------------ */
/* Icons */
/* ------------------------------------------------------------------ */

const MailIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width="20"
    height="20"
    {...props}
  >
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const PhoneIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width="20"
    height="20"
    {...props}
  >
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

const WhatsAppIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width="22"
    height="22"
    {...props}
  >
    <path d="M17.47 14.38c-.29-.15-1.71-.85-1.98-.94-.27-.1-.46-.15-.66.15-.2.29-.76.94-.93 1.13-.17.2-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.58-.9-2.17-.24-.57-.48-.5-.66-.51h-.56c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.44s1.05 2.83 1.19 3.02c.15.2 2.06 3.15 5 4.41.7.3 1.24.48 1.67.62.7.22 1.34.19 1.84.12.56-.08 1.71-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.2-.56-.34z" />

    <path d="M12.04 2C6.5 2 2 6.5 2 12.05c0 1.86.51 3.6 1.4 5.09L2 22l5.03-1.32a10.02 10.02 0 0 0 5.01 1.34h.01c5.54 0 10.03-4.5 10.03-10.05C22.08 6.5 17.58 2 12.04 2zm0 18.31h-.01c-1.63 0-3.23-.44-4.62-1.27l-.33-.2-3.44.9.92-3.36-.22-.35a8.28 8.28 0 0 1-1.27-4.42c0-4.58 3.72-8.31 8.29-8.31 4.56 0 8.28 3.73 8.28 8.31 0 4.58-3.72 8.31-8.28 8.31z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width="20"
    height="20"
    {...props}
  >
    <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.25 1.22.6 1.77 1.15.5.5.9 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.25-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.45.53C6.09.28 6.82.11 7.88.06 8.94.01 9.28 0 12 0zm0 1.8c-2.67 0-2.99.01-4.04.06-.97.04-1.5.2-1.85.34-.46.18-.79.4-1.14.75-.35.35-.57.68-.75 1.14-.14.35-.3.88-.34 1.85C3.83 9.01 3.8 9.33 3.8 12s.03 2.99.08 4.04c.04.97.2 1.5.34 1.85.18.46.4.79.75 1.14.35.35.68.57 1.14.75.35.14.88.3 1.85.34 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.97-.04 1.5-.2 1.85-.34.46-.18.79-.4 1.14-.75.35-.35.57-.68.75-1.14.14-.35.3-.88.34-1.85.05-1.05.08-1.37.08-4.04s-.03-2.99-.08-4.04c-.04-.97-.2-1.5-.34-1.85a3.1 3.1 0 0 0-.75-1.14 3.1 3.1 0 0 0-1.14-.75c-.35-.14-.88-.3-1.85-.34C14.99 1.83 14.67 1.8 12 1.8zm0 4.6a5.6 5.6 0 1 1 0 11.2 5.6 5.6 0 0 1 0-11.2zm0 1.8a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6zm5.83-2.02a1.31 1.31 0 1 1-2.62 0 1.31 1.31 0 0 1 2.62 0z" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width="20"
    height="20"
    {...props}
  >
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z" />
  </svg>
);

const ThreadsIcon = (props) => (
  <svg viewBox="0 0 512 512" width="22" height="22" {...props}>
    <path
      fill="currentColor"
      d="M105 0h302c57.75 0 105 47.25 105 105v302c0 57.75-47.25 105-105 105H105C47.25 512 0 464.75 0 407V105C0 47.25 47.25 0 105 0z"
    />

    <path
      fill="#fff"
      d="M337.36 243.58c-1.46-.7-2.95-1.38-4.46-2.02-2.62-48.36-29.04-76.05-73.41-76.33-25.6-.17-48.52 10.27-62.8 31.94l24.4 16.74c10.15-15.4 26.08-18.68 37.81-18.68h.4c14.61.09 25.64 4.34 32.77 12.62 5.19 6.04 8.67 14.37 10.39 24.89-12.96-2.2-26.96-2.88-41.94-2.02-42.18 2.43-69.3 27.03-67.48 61.21.92 17.35 9.56 32.26 24.32 42.01 12.48 8.24 28.56 12.27 45.26 11.35 22.07-1.2 39.37-9.62 51.45-25.01 9.17-11.69 14.97-26.84 17.53-45.92 10.51 6.34 18.3 14.69 22.61 24.73 7.31 17.06 7.74 45.1-15.14 67.96-20.04 20.03-44.14 28.69-80.55 28.96-40.4-.3-70.95-13.26-90.81-38.51-18.6-23.64-28.21-57.79-28.57-101.5.36-43.71 9.97-77.86 28.57-101.5 19.86-25.25 50.41-38.21 90.81-38.51 40.68.3 71.76 13.32 92.39 38.69 10.11 12.44 17.73 28.09 22.76 46.33l28.59-7.63c-6.09-22.45-15.67-41.8-28.72-57.85-26.44-32.53-65.1-49.19-114.92-49.54h-.2c-49.72.35-87.96 17.08-113.64 49.73-22.86 29.05-34.65 69.48-35.04 120.16v.24c.39 50.68 12.18 91.11 35.04 120.16 25.68 32.65 63.92 49.39 113.64 49.73h.2c44.2-.31 75.36-11.88 101.03-37.53 33.58-33.55 32.57-75.6 21.5-101.42-7.94-18.51-23.08-33.55-43.79-43.48zm-76.32 71.76c-18.48 1.04-37.69-7.26-38.64-25.03-.7-13.18 9.38-27.89 39.78-29.64 3.48-.2 6.9-.3 10.25-.3 11.04 0 21.37 1.07 30.76 3.13-3.5 43.74-24.04 50.84-42.15 51.84z"
    />
  </svg>
);

const ChevronDownIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width="18"
    height="18"
    {...props}
  >
    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Accordion */
/* ------------------------------------------------------------------ */

function AccordionItem({ head, body, defaultOpen = false, className = "" }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`border-b border-white/10 last:border-b-0 ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-3 text-left"
      >
        {head}

        <ChevronDownIcon
          className={`text-white shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-200 ease-in-out ${
          open
            ? "grid-rows-[1fr] opacity-100 pb-2"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">{body}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Footer */
/* ------------------------------------------------------------------ */

function Footer() {
  const overview = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About" },
    { path: "/dates", name: "Product" },
    { path: "/contact-us", name: "Contact Us" },
  ];

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const fabClass =
    "flex items-center justify-center w-14 h-14 rounded-full bg-white mx-0.5 text-[#282828] hover:bg-gray-500 transition-colors";

  const overviewLinkClass =
    "text-[15px] font-sans text-white tracking-[1px] mt-1 no-underline hover:text-gray-300";

  const socialButtons = (
    <>
      <a
        href="https://wa.me/8220570301"
        target="_blank"
        rel="noopener noreferrer"
        className={fabClass}
      >
        <WhatsAppIcon />
      </a>

      <a
        href="https://www.instagram.com/mahaslettering?igsh=b21mbmJyY2hqd2Vo"
        target="_blank"
        rel="noopener noreferrer"
        className={fabClass}
      >
        <InstagramIcon />
      </a>

      <a
        href="https://www.facebook.com/mahalakshmi.shankaran.54?mibextid=ZbWKwL"
        target="_blank"
        rel="noopener noreferrer"
        className={fabClass}
      >
        <FacebookIcon />
      </a>

      <a
        href="https://www.threads.net/@mahaslettering"
        target="_blank"
        rel="noopener noreferrer"
        className={fabClass}
      >
        <ThreadsIcon />
      </a>
    </>
  );

  const openingHours = (
    <div>
      <p className="text-[16px] font-semibold text-white tracking-[1px]">
        Monday to Friday
      </p>

      <p className="text-[15px] font-sans text-white mt-1 tracking-[1px]">
        10:00 AM to 12:00 PM
      </p>

      <p className="text-[16px] font-semibold text-white tracking-[1px] mt-5">
        Saturday
      </p>

      <p className="text-[15px] font-sans text-white mt-1 tracking-[1px]">
        12:00 PM to 6:00 PM
      </p>
    </div>
  );

  return (
    <>
      {/* ================= DESKTOP / TABLET ================= */}

      <div
        data-aos="fade-up"
        data-aos-duration="3000"
        className="hidden md:block"
      >
        {/* Logo */}

        <div className="flex justify-center my-10 sm:my-0 sm:mb-10">
          <div className="flex items-center justify-center bg-black rounded-full w-32 h-32 sm:w-28 sm:h-28 md:w-44 md:h-44 -my-6 sm:-my-16">
            <img
              src="assets/logo.png"
              alt="Ayyan Chicken"
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-32 md:h-32 rounded-full"
            />
          </div>
        </div>

        {/* Brand */}

        <div className="text-center">
          <p className="text-[18px] font-sans font-semibold text-white tracking-[1.2px] uppercase mx-4 my-[0.1rem]">
            Ayyan
          </p>

          <p className="text-[15px] font-sans font-semibold text-white tracking-[5px] uppercase">
            Chicken
          </p>
        </div>

        {/* Footer Content */}

        <div className="mx-5 sm:mx-4 mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 justify-items-start md:justify-items-center">
            {/* Address */}

            <div className="lg:col-span-3">
              <p className="text-[18px] font-sans font-medium text-white tracking-[1px]">
                Address
              </p>

              <p className="text-[17px] font-sans text-white mt-1 tracking-[1px]">
                31, Sarangapani East Street,
              </p>

              <p className="text-[17px] font-sans text-white tracking-[1px]">
                Utchi Pillaiyar Kovil,
              </p>

              <p className="text-[17px] font-sans text-white tracking-[1px]">
                Kumbakonam, Tamil Nadu 612001, India.
              </p>

              <p className="text-[18px] font-sans font-medium text-white tracking-[1px] mt-10">
                Contact Us
              </p>

              <p className="text-[15px] font-sans text-white mt-1 tracking-[1px] flex items-center gap-2">
                <MailIcon />
                Ayyan@gmail.com
              </p>

              <p className="text-[15px] font-sans text-white mt-1 tracking-[1px] flex items-center gap-2">
                <PhoneIcon />
                +91 9025330197
              </p>
            </div>

            {/* Opening Hours */}

            <div className="lg:col-span-3">
              <p className="text-[18px] font-sans font-medium text-white tracking-[1.2px]">
                Opening Hours
              </p>

              <div className="mt-4">{openingHours}</div>
            </div>

            {/* Overview */}

            <div className="lg:col-span-2">
              <p className="text-[18px] font-sans font-medium text-white tracking-[1px]">
                Overview
              </p>

              <Link to="/" onClick={scrollToTop} className="block">
                <p className={overviewLinkClass}>Home</p>
              </Link>

              <Link to="/about" onClick={scrollToTop} className="block">
                <p className={overviewLinkClass}>About</p>
              </Link>

              <Link to="/dates" onClick={scrollToTop} className="block">
                <p className={overviewLinkClass}>Product</p>
              </Link>

              <Link to="/contact-us" onClick={scrollToTop} className="block">
                <p className={overviewLinkClass}>Contact Us</p>
              </Link>
            </div>

            {/* Follow Us */}

            <div className="lg:col-span-3">
              <p className="text-[18px] font-sans font-medium text-white tracking-[1px]">
                Follow Us
              </p>

              <div className="mt-2 flex">{socialButtons}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE ================= */}

      <div className="block md:hidden px-8">
        {/* Logo */}

        <div className="flex justify-center my-0 mb-10 sm:my-12">
          <div className="flex items-center justify-center bg-black rounded-full w-32 h-32 sm:w-44 sm:h-44 -my-12 sm:-my-8">
            <img
              src="assets/logo.png"
              alt="Ayyan Chicken"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full"
            />
          </div>
        </div>

        {/* Brand */}

        <div className="text-center">
          <p className="text-[18px] font-sans font-semibold text-white tracking-[1.2px] uppercase mx-4 my-[0.1rem]">
            Ayyan
          </p>

          <p className="text-[15px] font-sans font-semibold text-white tracking-[5px] uppercase">
            Chicken
          </p>
        </div>

        {/* Mobile Accordion */}

        <div className="w-full z-[25] flex flex-col gap-4 py-6 px-0 sm:px-[2.2rem] text-white">
          <div className="flex flex-col gap-2 sm:gap-3">
            {/* Opening Hours */}

            <AccordionItem
              className="flex flex-col"
              head={
                <p className="text-[0.9rem] font-semibold text-white tracking-[2px] uppercase">
                  Opening Hours
                </p>
              }
              body={openingHours}
            />

            {/* Address */}

            <AccordionItem
              className="flex flex-col"
              head={
                <p className="text-[0.9rem] font-semibold text-white tracking-[2px] uppercase">
                  Address
                </p>
              }
              body={
                <div>
                  <p className="text-[15px] font-sans text-white mt-1 tracking-[1px] leading-8">
                    31, Sarangapani East Street,
                  </p>

                  <p className="text-[15px] font-sans text-white tracking-[1px] leading-8">
                    Utchi Pillaiyar Kovil,
                  </p>

                  <p className="text-[15px] font-sans text-white tracking-[1px] leading-8">
                    Kumbakonam, Tamil Nadu 612001, India.
                  </p>
                </div>
              }
            />

            {/* Contact */}

            <AccordionItem
              className="flex flex-col"
              head={
                <p className="text-[0.9rem] font-semibold text-white tracking-[2px] uppercase">
                  Contact Us
                </p>
              }
              body={
                <div>
                  <p className="text-[15px] font-sans text-white mt-1 tracking-[1px] flex items-center gap-2 pb-1">
                    <MailIcon />
                    Ayyan@gmail.com
                  </p>

                  <p className="text-[15px] font-sans text-white mt-1 tracking-[1px] flex items-center gap-2">
                    <PhoneIcon />
                    +91 9025330197
                  </p>
                </div>
              }
            />

            {/* Overview */}

            <AccordionItem
              className="flex flex-col"
              head={
                <p className="text-[0.9rem] font-semibold text-white tracking-[2px] uppercase">
                  Overview
                </p>
              }
              body={
                <div className="flex flex-col gap-[1.2rem]">
                  {overview.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      onClick={scrollToTop}
                      className="text-[.85rem] text-white no-underline hover:text-gray-400"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              }
            />

            {/* Follow Us */}

            <AccordionItem
              className="flex flex-col"
              head={
                <p className="text-[0.9rem] font-semibold text-white tracking-[2px] uppercase">
                  Follow Us
                </p>
              }
              body={<div className="mt-2 flex">{socialButtons}</div>}
            />
          </div>

          <hr className="border-t border-white/20" />
        </div>
      </div>

      {/* ================= COPYRIGHT ================= */}

      <div className="w-full flex flex-col gap-3  pb-3">
        <div className="flex flex-col w-full justify-center items-center">
          <p className="text-[1rem] sm:text-[.75rem] md:text-[12px] lg:text-[15px] xl:text-[1.3rem] text-[#f6f6f6] text-center">
            © {new Date().getFullYear()} Ayyan Chicken. All Rights Reserved.
          </p>

          <p className="text-sm text-gray-500 mt-4">
            Designed &amp; Developed by{" "}
            <a
              href="https://kudanthaiinfotech.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white no-underline"
            >
              Kudanthai Infotech
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
