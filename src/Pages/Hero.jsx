import Footer from "../Component/Footer";
import MainProductSlide from "../Component/MainProductSlide";
import Navbar from "../Component/Navbar";
import ProductsSection from "../Component/ProductBadge";
import ProductGrid from "../Component/Productgrid";
import Title from "../Component/Title";

const reasons = [
  {
    title: "Unmatched Flavor Fusion",
    description:
      "Masterpieces of taste, from burgers to wraps, expertly crafted.",
    icon: "assets/Flavor-icon.png",
  },
  {
    title: "Quality Ingredients, Every Time",
    description:
      "Committed to the finest ingredients quality at the heart of every bite.",
    icon: "assets/food-safety-icon.png",
  },
  {
    title: "Fast, Fresh, and Friendly",
    description: "More than a name, we commit to quick, fresh service.",
    icon: "assets/fresh-food-icon.png",
  },
  {
    title: "Signature Specials",
    description:
      "Explore unique signature specials artisanal delighting taste buds.",
    icon: "assets/food-icon.png",
  },
  {
    title: "Customer-Centric Experience",
    description:
      "Satisfaction priority. Welcoming space to enjoy, excel guided by feedback.",
    icon: "assets/happy-client.png",
  },
  {
    title: "Innovative Dining Solutions",
    description:
      "For enthusiasts or quick bites, diverse menu embraces trends, classics.",
    icon: "assets/table-icon.png",
  },
  {
    title: "Online Convenience",
    description:
      "Easy online orders: reserve tables, enjoy favorites at home effortlessly.",
    icon: "assets/online-shopping-icon.png",
  },
  {
    title: "Community Connection",
    description:
      "Beyond a restaurant, we support locals, source locally, and contribute.",
    icon: "assets/network-icon.png",
  },
];

const Home = () => {
  return (
    <>
      <section className="bg-black">
        <Navbar />
        <MainProductSlide />
      </section>
      <section>
        <ProductsSection />
      </section>
      <section>
        <Title
          title="Best Selling Items"
          subtitle="Discover our most popular products."
          align="centre"
        />
        <ProductGrid />
      </section>
      <section>
        <Title
          title="Why Choose Fastfood TNC?"
          subtitle="Unmatched Flavors, Quality, and Community Connection."
          align="centre"
        />
        <div className="flex justify-center flex-wrap gap-x-14 py-20 px-20">
          {reasons.map((reason, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-duration="2500"
              className="mb-8 sm:mb-0"
            >
              <div className="flex justify-center mb-2 md:mb-5">
                <img src={reason.icon} alt={reason.title} className="w-[30%]" />
              </div>
              <div className="w-full sm:w-[264px] h-full sm:h-[228px] text-center">
                <h3 className="text-[18px] mb-2 font-semibold sm:font-medium">
                  {" "}
                  {reason.title}{" "}
                </h3>
                <p className="text-[16px] text-[#8A9197] font-medium leading-[1.6]">
                  {" "}
                  {reason.description}{" "}
                </p>{" "}
              </div>
            </div>
          ))}{" "}
        </div>
      </section>
      <section className="pb-20">
        <img src="assets/fresh-and-healthy-desktop.jpg" />
      </section>
      <section className="bg-black">
        <Footer />
      </section>
    </>
  );
};
export default Home;
