import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav className="h-full w-fit flex flex-col shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <h1
            className={`overflow-hidden transition-all text-[#f3f4ec] ${
              expanded ? "text-2xl w-40 font-bold" : "text-sm w-0"
            }`}
          >
            Invento;)
          </h1>

          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg sidebar-item"
          >
            {expanded ? (
              <ChevronFirst className="text-[#f3f4ec]" />
            ) : (
              <ChevronLast className="text-[#f3f4ec]" />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="text-[#f3f4ec] font-bold">Naveen</h4>
              <span className="text-xs text-gray-600">111naveenkumarrk@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, alert, to }) {
  const navigate = useNavigate();

  const { expanded } = useContext(SidebarContext);

  return (
    <li
      onClick={() => navigate(to)}
      className={`sidebar-item relative flex items-center py-2 px-3 my-1
    font-medium rounded-md cursor-pointer transition-colors group`}
    >
      {icon}
      <span
        className={`text-[#f3f4ec] font-thin overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          z-[100]
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
