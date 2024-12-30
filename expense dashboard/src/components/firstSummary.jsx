const FirstSummary = ({ icon, desc, num, bg }) => {
  return (
    <div className="flex items-center  w-[50%] md:w-[20%] md:border-r gap-3">
      <div
        className="w-[70px] p-5 md:w-[63px] md:h-[63px] flex justify md:justify-center items-center rounded-lg"
        style={{ backgroundColor: bg }}
      >
        <img src={icon} width={25} height={20} alt="icon" loading="lazy" />
      </div>
      <div className="text-[16px]">
        <p className="text-[#92959E] font-bold">{desc}</p>
        <p className="text-black font-bold">{num}</p>
      </div>
    </div>
  );
};

export default FirstSummary;
