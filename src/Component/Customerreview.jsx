import { Star } from "lucide-react";

const colorStyles = [
  { circle: "#7F60A3", line: "#7F60A3" },
  { circle: "#81DE76", line: "#81DE76" },
  { circle: "#7F60A3", line: "#7F60A3" },
  { circle: "#81DE76", line: "#81DE76" },
];

const reviews = [
  {
    name: "Ava Thompson",
    position: "Marketing Director",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
    description:
      "Working with this team completely changed how we approach our campaigns. Results came faster than expected.",
  },
  {
    name: "James Carter",
    position: "Founder, Northwind Co.",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    description:
      "Professional, responsive, and genuinely invested in our success. I'd recommend them to anyone.",
  },
  {
    name: "Priya Nair",
    position: "Product Manager",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    description:
      "The attention to detail was incredible. Every question was answered quickly and clearly.",
  },
  {
    name: "Daniel Kim",
    position: "Operations Lead",
    img: "https://randomuser.me/api/portraits/men/76.jpg",
    description:
      "They delivered exactly what we needed, on time and within budget. A pleasure to work with.",
  },
  {
    name: "Sofia Martinez",
    position: "CEO, Bright Path",
    img: "https://randomuser.me/api/portraits/women/21.jpg",
    description:
      "From the first call to final delivery, everything felt seamless. Highly recommend their work.",
  },
  {
    name: "Ethan Walker",
    position: "Sales Manager",
    img: "https://randomuser.me/api/portraits/men/54.jpg",
    description:
      "Great communication throughout the whole process. They really listened to what we wanted.",
  },
];
const CustomerReview = () => {
  const duplicateClients = [...reviews, ...reviews];

  return (
    <div
      className="flex w-full select-none overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, hsl(0 0% 0% / 0), hsl(0 0% 0% / 1) 10%, hsl(0 0% 0% / 1) 90%, hsl(0 0% 0% / 0))",
        WebkitMaskImage:
          "linear-gradient(to right, hsl(0 0% 0% / 0), hsl(0 0% 0% / 1) 10%, hsl(0 0% 0% / 1) 90%, hsl(0 0% 0% / 0))",
      }}
    >
      <div className="flex shrink-0 items-center justify-around gap-8 whitespace-nowrap py-4 md:gap-12 animate-scroll-x">
        {duplicateClients.map((review, index) => {
          const colorStyle = colorStyles[index % colorStyles.length];
          return (
            <div key={index} className="relative my-5 md:my-8">
              <img
                src={review.img}
                alt={review.name}
                className="relative z-10 mx-auto -mb-10 h-20 w-20 rounded-full object-cover md:h-[100px] md:w-[100px]"
              />
              <div className="mx-auto w-[280px] max-w-[300px] rounded-[10px] bg-[#f9f9f9] p-4 pt-14 text-center shadow-sm md:w-[350px] md:max-w-[350px]">
                <div>
                  <h6 className="text-lg font-semibold leading-tight text-gray-900">
                    {review.name}
                  </h6>
                  <p className="text-sm text-gray-500">{review.position}</p>

                  <div className="my-4 flex items-center justify-center">
                    <div
                      className="flex-1 border-b"
                      style={{ borderColor: colorStyle.line }}
                    />
                    <div
                      className="flex h-[70px] w-[70px] items-center justify-center rounded-full"
                      style={{ backgroundColor: colorStyle.circle }}
                    >
                      <img
                        src="assets/double-1.png"
                        alt="img"
                        className="mt-1 w-16"
                      />
                    </div>
                    <div
                      className="flex-1 border-b"
                      style={{ borderColor: colorStyle.line }}
                    />
                  </div>

                  <div className="mb-2 mt-2">
                    <p className="whitespace-normal text-sm italic text-gray-700">
                      "{review.description}"
                    </p>
                  </div>

                  <div className="flex items-center justify-center">
                    {[...Array(5)].map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        size={18}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Marquee keyframes + responsive speed adjustments.
          Add this once (e.g. in your global stylesheet) rather than per-component
          if you use this pattern elsewhere. */}
      <style>{`
        @keyframes scroll-x {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-scroll-x {
          animation: scroll-x 250s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-scroll-x {
            animation-duration: 140s;
          }
        }
      `}</style>
    </div>
  );
};

export default CustomerReview;
