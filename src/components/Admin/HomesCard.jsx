import { useNavigate } from "react-router-dom";

const HomesCard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      id: 1,
      title: "Hello in Gallery",
      desc: "To see more images, click the button below",
      btnText: "Go !!!!!",
      icon: "🚀",
    },
    {
      id: 2,
      title: "Edit images Here",
      desc: "Make images more beautiful and stunning",
      btnText: "Want to Edit",
      icon: "📚",
    },
    {
      id: 3,
      title: "Upload your Images",
      desc: "You can upload your own images to the gallery",
      btnText: "Upload Now ",
      icon: "🧪",
    },
  ];

  const handleNavigate = (id) => {
    if (id === 1) navigate("/gallery");
    if (id === 2) navigate("/edit");
    if (id === 3) navigate("/upload");
  };

  return (
    <div className="w-full flex flex-col items-center pb-16">
      {cards.map((card) => (
        <div
          key={card.id}
          className="w-full flex flex-col items-center border-b border-gray-300 dark:border-gray-700 last:border-0 py-7 transition-colors"
        >
          {/* Main Card Container */}
          <div
            className="
              relative
              bg-gradient-to-br from-white to-gray-100 dark:from-[#0B1020] dark:to-[#141A2A]
              rounded-[2rem]
              p-6 md:p-8
              flex flex-col lg:flex-row
              items-center justify-between
              gap-6
              shadow-xl
              border border-black/5 dark:border-white/5
              w-full max-w-[90%] lg:max-w-[700px]
              lg:min-h-[410px]
              transition-all duration-300
              hover:scale-[1.01]
              hover:shadow-2xl
            "
          >
            {/* Icon */}
            <div
              className="
                lg:absolute lg:top-6 lg:left-6
                mb-4 lg:mb-0
                p-4 rounded-xl
                text-xl
                shadow-md
                z-10
                text-black dark:text-white
                bg-gradient-to-r from-[#5865F2] to-[#43E7D0]
                transition-all
                animate-pulse
              "
            >
              {card.icon}
            </div>

            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left flex flex-col justify-center lg:mt-8">
              <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-2 leading-tight transition-colors">
                {card.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm md:text-base font-normal max-w-[350px] mx-auto lg:mx-0 transition-colors">
                {card.desc}
              </p>

              <button
                onClick={() => handleNavigate(card.id)}
                className="
                  bg-gradient-to-r from-[#5865F2] to-[#43E7D0]
                  hover:from-[#4752C4] hover:to-[#1CC7B7]
                  text-white
                  font-semibold
                  py-3 px-10
                  rounded-full
                  w-fit
                  self-center lg:self-start
                  transition-all
                  text-sm
                  shadow-lg
                  hover:shadow-2xl
                "
              >
                {card.btnText}
              </button>
            </div>

            {/* RIGHT SIDE (NO IMAGE) */}
            <div className="w-full lg:w-[48%] flex items-center justify-center">
              <div className="rounded-2xl w-full aspect-video lg:h-[200px] flex items-center justify-center">
                <div className="w-[80%] h-[80%] rounded-2xl bg-white dark:bg-[#0A1020] border border-black/5 dark:border-white/10 shadow-lg flex items-center justify-center">
                  <div className="text-gray-400 dark:text-gray-500 font-bold text-sm">
                    <span className="block text-3xl">✨</span>
                    <span className="block mt-2">No Image</span>
                    <span className="block text-xs mt-1">Stylish Card</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default HomesCard;
