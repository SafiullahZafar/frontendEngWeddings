import { NavLink, useNavigate } from "react-router-dom";
import {
    HiHome,
    HiUsers,
    HiPencil,
    HiUpload,
    HiMail,
    HiMusicNote,
    HiLogout,
    HiOutlinePhotograph,
    HiInformationCircle,
} from "react-icons/hi";
import sidebarLogo from "../../assets/Sideer.svg";

const menu = [
    { name: "Home", path: "/home", icon: HiHome },
    { name: "Gallery", path: "/gallery", icon: HiOutlinePhotograph },
    { name: "Edit", path: "/edit", icon: HiPencil },
    { name: "Upload", path: "/upload", icon: HiUpload },
    { name: "Contact Us", path: "/contact", icon: HiMail },
    { name: "Music", path: "/music", icon: HiMusicNote },
    { name: "Instructions", path: "/instructions", icon: HiInformationCircle },
];

const Sidebar = ({ sidebarOpen }) => {
    const navigate = useNavigate();

    return (
        <aside
            className={`
                bg-[#FFDAFF] dark:bg-[#12142C]
                w-[270px]
                text-black dark:text-white
                flex flex-col font-sans
                fixed md:sticky top-0
                self-start
                z-50
                transition-transform duration-300
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0
                sidebar-scroll
            `}
        >
            {/* LOGO */}
            <div className="pt-10 pb-[50px] flex justify-center">
                <img
                    src={sidebarLogo}
                    alt="Sidebar Logo"
                    className="
                        h-16 w-auto select-none
                        transition-all duration-300
                        dark:invert dark:brightness-110
                        hover:scale-105
                    "
                />
            </div>

            {/* MENU */}
            <div className="flex-1 px-5">
                <p className="px-5 text-[13px] text-black/50 dark:text-white/50 font-bold mb-6 uppercase tracking-[3px]">
                    General
                </p>

                <nav className="space-y-3">
                    {menu.map((item, i) => (
                        <NavLink
                            key={i}
                            to={item.path}
                            className={({ isActive }) =>
                                `relative flex items-center gap-5 px-6 py-3 rounded-2xl transition-all duration-300 ${
                                    isActive
                                        ? "bg-black text-white dark:bg-white dark:text-black shadow-xl"
                                        : "text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <div
                                        className={`text-lg transition-all duration-300 ${
                                            isActive
                                                ? "text-white dark:text-black"
                                                : "text-black dark:text-white"
                                        }`}
                                    >
                                        <item.icon className="w-6 h-6" />
                                    </div>

                                    <span
                                        className={`text-[16px] font-bold transition-colors duration-300 ${
                                            isActive
                                                ? "text-white dark:text-black"
                                                : "text-black dark:text-white"
                                        }`}
                                    >
                                        {item.name}
                                    </span>

                                    {isActive && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-[5px] h-8 bg-black dark:bg-white rounded-full" />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div className="mx-5 my-10 border-t border-black/10 dark:border-white/10" />

                {/* LOGOUT */}
                <button
                    onClick={() => navigate("/login")}
                    className="flex w-full items-center gap-5 px-6 py-4 rounded-2xl text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition"
                >
                    <HiLogout className="w-6 h-6" />
                    <span className="text-[16px] font-bold">Logout</span>
                </button>
            </div>

            {/* PROMO */}
            <div className="p-6 mt-auto">
                <div
                    className="relative cursor-pointer rounded-[28px] overflow-hidden transition-all
                     hover:scale-[1.04]
                     active:scale-95
                     active:brightness-75
                     bg-black/10 dark:bg-white/10 h-32 flex items-center justify-center"
                >
                    <span className="text-black dark:text-white font-bold">
                        PROMO
                    </span>
                    <div className="absolute inset-0 bg-black/0 dark:bg-white/0 active:bg-black/20 dark:active:bg-white/20 transition" />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
