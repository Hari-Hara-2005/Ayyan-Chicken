export default function Title({
  subtitle,
  title,
  align = "center",
  subtitleColor = "#A0A5AA",
  titleColor = "#010f1c",
}) {
  const alignment = {
    left: {
      container: "items-start text-left",
      title: "text-left",
      subtitle: "text-left",
    },
    center: {
      container: "items-center text-center",
      title: "text-center",
      subtitle: "text-center",
    },
    right: {
      container: "items-end text-right",
      title: "text-right",
      subtitle: "text-right",
    },
  };
  const currentAlignment = alignment[align] || alignment.center;
  return (
    <div
      className={` relative flex flex-col px-4 ${currentAlignment.container} `}
    >
      {" "}
      {/* Title */}{" "}
      <h2
        data-aos="zoom-in-up"
        data-aos-duration="2000"
        className={` max-w-[750px] text-[30px] font-semibold leading-[1.2] ${currentAlignment.title} sm:text-[46px] `}
        style={{ color: titleColor }}
      >
        {" "}
        {title}{" "}
      </h2>{" "}{" "}
      {subtitle && (
        <p
          data-aos="zoom-in-up"
          data-aos-duration="2500"
          className={` mt-4 w-[95%] text-[16px] font-medium leading-[1.8] ${currentAlignment.subtitle} md:w-[50%] `}
          style={{ color: subtitleColor }}
        >
          {" "}
          {subtitle}{" "}
        </p>
      )}{" "}
    </div>
  );
}
