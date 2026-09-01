import Footer from "../Component/Footer";
import PageTitleBanner from "../Component/Pagetitlebanner";

// ---- Replace these with your real store details ----
const STORE = {
  name: "Our Flagship Store",
  addressLine1: "42 Anna Salai",
  addressLine2: "Thousand Lights, Chennai, Tamil Nadu 600002",
  phone: "+91 98765 43210",
  email: "hello@yourstore.com",
  mapQuery: "42 Anna Salai, Thousand Lights, Chennai, Tamil Nadu 600002",
  hours: [
    { day: "Monday – Friday", time: "10:00 AM – 8:00 PM" },
    { day: "Saturday", time: "10:00 AM – 9:00 PM" },
    { day: "Sunday", time: "11:00 AM – 6:00 PM" },
  ],
};

const REASONS = [
  {
    title: "See it in person",
    body: "Textures and finishes are hard to judge on a screen. Our team is on hand to help you compare.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path
          d="M1.5 12s4-7 10.5-7 10.5 7 10.5 7-4 7-10.5 7-10.5-7-10.5-7Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    title: "Same-day pickup",
    body: "Order online and collect in store, or walk in and take it home right away.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path
          d="M4 8.5 12 4l8 4.5v7L12 20l-8-4.5v-7Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M4 8.5 12 13l8-4.5M12 13v7"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
    ),
  },
  {
    title: "Free parking",
    body: "Dedicated customer parking is available directly outside the store entrance.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <rect
          x="3"
          y="9"
          width="18"
          height="8"
          rx="1.2"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M6 9V7.5A2.5 2.5 0 0 1 8.5 5h7A2.5 2.5 0 0 1 18 7.5V9"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <circle cx="7" cy="17" r="1.3" fill="currentColor" />
        <circle cx="17" cy="17" r="1.3" fill="currentColor" />
      </svg>
    ),
  },
];

const ContactRow = ({ icon, children }) => (
  <div className="flex gap-4">
    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C9A227]/40 text-[#C9A227]">
      {icon}
    </span>
    <div className="pt-1.5">{children}</div>
  </div>
);

const Store = () => {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    STORE.mapQuery,
  )}&output=embed`;

  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    STORE.mapQuery,
  )}`;

  return (
    <>
      <PageTitleBanner
        title="Store"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Store", href: "#", active: true },
        ]}
      />

      {/* Visit us */}
      <section className="bg-[#F3EEE6] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-14 items-start">
          {/* Store details */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            <div>
              <p className="text-[#C9A227] text-sm mb-3">Visit us in person</p>
              <h2 className="font-serif text-4xl md:text-[2.75rem] leading-[1.1] text-[#221C13] mb-4">
                {STORE.name}
              </h2>
              <p className="text-[#6B6255] leading-relaxed max-w-sm">
                Come see the collection up close, talk to the team, and pick up
                what you love the same day.
              </p>
            </div>

            <div className="border-t border-[#221C13]/10 pt-8 flex flex-col gap-7">
              <ContactRow
                icon={
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                    <path
                      d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="12"
                      cy="9.5"
                      r="2.4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                }
              >
                <p className="text-[#221C13]">{STORE.addressLine1}</p>
                <p className="text-[#6B6255]">{STORE.addressLine2}</p>
              </ContactRow>

              <ContactRow
                icon={
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                    <path
                      d="M4 5c0-.6.4-1 1-1h2.2c.5 0 .9.3 1 .8l.8 3a1 1 0 0 1-.3 1L7.4 10.2a12 12 0 0 0 6.4 6.4l1.4-1.3a1 1 0 0 1 1-.3l3 .8c.5.1.8.5.8 1V19c0 .6-.4 1-1 1h-1C10.4 20 4 13.6 4 6V5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              >
                <a
                  href={`tel:${STORE.phone.replace(/\s/g, "")}`}
                  className="text-[#221C13] hover:text-[#C9A227] transition-colors"
                >
                  {STORE.phone}
                </a>
              </ContactRow>

              <ContactRow
                icon={
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                    <rect
                      x="3.5"
                      y="5.5"
                      width="17"
                      height="13"
                      rx="1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="m4.5 6.5 7.5 6 7.5-6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                }
              >
                <a
                  href={`mailto:${STORE.email}`}
                  className="text-[#221C13] hover:text-[#C9A227] transition-colors"
                >
                  {STORE.email}
                </a>
              </ContactRow>

              <ContactRow
                icon={
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                    <circle
                      cx="12"
                      cy="12"
                      r="8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M12 7.5V12l3 2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                }
              >
                <div className="flex flex-col gap-1.5">
                  {STORE.hours.map((h) => (
                    <div
                      key={h.day}
                      className="flex justify-between gap-8 text-sm"
                    >
                      <span className="text-[#6B6255]">{h.day}</span>
                      <span className="text-[#221C13]">{h.time}</span>
                    </div>
                  ))}
                </div>
              </ContactRow>
            </div>

            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 justify-center bg-[#221C13] text-[#F3EEE6] px-7 py-3.5 w-fit hover:bg-[#C9A227] hover:text-[#221C13] transition-colors"
            >
              Get directions
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Map */}
          <div className="lg:col-span-3 h-[420px] lg:h-full min-h-[460px] border border-[#221C13]/10">
            <iframe
              title="Store location"
              src={mapSrc}
              className="w-full h-full grayscale-[35%] contrast-[1.1] sepia-[6%]"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Why visit */}
      <section className="bg-[#F3EEE6] pb-24 md:pb-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="border-t border-[#221C13]/10 pt-14 grid grid-cols-1 sm:grid-cols-3 gap-x-10 gap-y-12">
            {REASONS.map((r, i) => (
              <div
                key={r.title}
                className={
                  "flex flex-col gap-4 " +
                  (i > 0 ? "sm:border-l sm:border-[#221C13]/10 sm:pl-10" : "")
                }
              >
                <span className="text-[#C9A227]">{r.icon}</span>
                <h3 className="font-serif text-xl text-[#221C13]">{r.title}</h3>
                <p className="text-[#6B6255] text-sm leading-relaxed">
                  {r.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black">
        <Footer />
      </section>
    </>
  );
};

export default Store;
