import Navbar from "./Navbar";

export default function PageTitleBanner({ title, breadcrumbs }) {
  return (
    <>
      <Navbar />
      <section className="relative bg-black px-6 overflow-hidden min-h-[50vh] py-10 flex flex-col">
        {/* Title + Breadcrumb */}
        <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
          {/* Title */}
          <h1
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="200"
            className="font-black text-5xl md:text-6xl lg:text-7xl uppercase text-white tracking-wide mb-6"
          >
            {title}
          </h1>

          {/* Breadcrumb */}
          <nav
            aria-label="breadcrumb"
            data-aos="fade-up"
            data-aos-duration="900"
            data-aos-delay="450"
          >
            <ol className="flex items-center justify-center gap-2 text-base">
              {breadcrumbs.map((crumb, i) => (
                <li
                  key={crumb.label}
                  className="flex items-center gap-2"
                  data-aos="fade-up"
                  data-aos-duration="700"
                  data-aos-delay={550 + i * 100}
                >
                  {i > 0 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="w-4 h-4 text-[#a9d18e]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}

                  {crumb.active ? (
                    <span className="text-[#ED7D2C] font-medium">
                      {crumb.label}
                    </span>
                  ) : (
                    <a
                      href={crumb.href}
                      className="text-white hover:text-[#ED7D2C] transition-colors duration-300"
                    >
                      {crumb.label}
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>
    </>
  );
}
