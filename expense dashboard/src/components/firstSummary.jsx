const FirstSummary = ({ icon, desc, num, bg }) => {
  return (
    <div className="flex items-center p-2 w-[20%] border-r gap-3">
      <div
        className="w-[63px] h-[63px] flex justify-center items-center rounded-lg"
        style={{ backgroundColor: bg }}
      >
        <img src={icon} width={25} height={20} alt="icon" />
      </div>
      <div className="text-[16px]">
        <p className="text-[#92959E] font-bold">{desc}</p>
        <p className="text-black font-bold">{num}</p>
      </div>
    </div>
  );
};

export default FirstSummary;
