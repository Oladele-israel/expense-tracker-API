const FirstSummary = ({ icon, desc, num, bg }) => {
  return (
    <div className="flex items-center  w-[50%] md:w-[20%] md:border-r gap-3">
      <div
        className="w-[800px] p-2 md:w-[70px] md:h-[70px] flex justify md:justify-center items-center rounded-lg"
        style={{ backgroundColor: bg }}
      >
        <img src={icon} width={30} height={60} alt="icon" loading="lazy" />
      </div>
      <div className="text-[16px]">
        <p className="text-[#92959E] font-bold">{desc}</p>
        <p className="text-black font-bold">{num}</p>
      </div>
    </div>
  );
};

export default FirstSummary;
