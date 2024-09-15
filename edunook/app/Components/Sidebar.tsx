"use client";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Dashboard", href: "/" },
  { name: "Study Space", href: "/Pages/StudySpace" },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter(); // Hook for navigation

  // Handle navigation on button click
  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <div className="w-70 h-screen bg-[#f8f9fa] p-14 mr-3 bg-[url('/assets2.png')] bg-no-repeat bg-bottom">
      <ul className="list-none flex flex-col text-xl">
        {links.map((link) => (
          <li key={link.name} className="my-2 relative">
            <button
              onClick={() => handleNavigation(link.href)} // Handle click to navigate
              className={clsx("w-full text-left cursor-pointer font-bold p-2 rounded transition-colors duration-150 relative hover:text-[#6482AD]", {
                "text-black": pathname !== link.href,
                "text-[#7d98c3]": pathname === link.href,
              })}
            >
              {pathname === link.href && <span className="absolute left-[-16px] top-0 h-full w-2 bg-[#7d98c3] rounded-r"></span>}
              {link.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
