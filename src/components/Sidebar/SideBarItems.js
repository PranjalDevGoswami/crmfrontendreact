import { Link } from "react-router-dom";

const SidebarItem = ({ icon: Icon, label, link, sideBarOpen }) => (
  <div className="flex justify-center items-center pt-4">
    <Link to={link} className="text-xl">
      <div className="flex items-center">
        <Icon className="text-xl group" />
        <div
          className={`${
            sideBarOpen ? "block" : "hidden"
          } overflow-hidden duration-300 ml-2 text-sm`}
        >
          {label}
        </div>
      </div>
    </Link>
  </div>
);

export default SidebarItem;
