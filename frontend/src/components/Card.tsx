const Card = ({
  title,
  description,
  value,
  icon: Icon,
  gradientFrom,
  gradientTo,
}) => {
  return (
    <div
      className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition duration-300 transform hover:scale-95`}
    >
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-sm mb-4 text-gray-200">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-4xl font-bold">{value}</span>
        <Icon className="w-12 h-12 opacity-75" />
      </div>
    </div>
  );
};

export default Card;
