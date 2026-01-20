import { cardImages } from "../../utils/Images";
import { useNavigate } from "react-router-dom";

const HomesCard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      id: 1,
      title: "Hello in Gallery",
      desc: "To see more images, click the button below",
      btnText: "Go !!!!!",
      img: cardImages.Homecard1,
      icon: "🚀",
    },
    {
      id: 2,
      title: "Edit images Here",
      desc: "Make images more beautiful and stunning",
      btnText: "Want to Edit",
      img: cardImages.Homecard2,
      icon: "📚",
    },
    {
      id: 3,
      title: "Upload your Images",
      desc: "You can upload your own images to the gallery",
      btnText: "Upload Now ",
      img: cardImages.Homecard3,
      icon: "🧪",
    },
  ];

  // ✅ navigation logic (UNCHANGED)
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
              bg-[#F5F7FF] dark:bg-[#1A2235]
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
            "
          >
            {/* Icon */}
            <div
              className="
                lg:absolute lg:top-6 lg:left-6
                mb-4 lg:mb-0
                p-3 rounded-xl
                text-xl
                shadow-md
                z-10
                text-black dark:text-white
                bg-black/5 dark:bg-white/10
                transition-colors
              "
            >
              {card.icon}
            </div>

            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left flex flex-col justify-center lg:mt-8">
              <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-2 leading-tight transition-colors">
                {card.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm md:text-base font-normal max-w-[250px] mx-auto lg:mx-0 transition-colors">
                {card.desc}
              </p>

              <button
                onClick={() => handleNavigate(card.id)}
                className="
                  bg-[#5865F2]
                  hover:bg-[#4752C4]
                  text-white
                  font-semibold
                  py-2 px-8
                  rounded-full
                  w-fit
                  self-center lg:self-start
                  transition-all
                  text-sm
                  shadow-md
                "
              >
                {card.btnText}
              </button>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-[48%] flex items-center justify-center">
              <div className="rounded-2xl overflow-hidden shadow-lg w-full aspect-video lg:h-[200px]">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomesCard;