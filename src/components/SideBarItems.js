import { Link } from "react-router-dom";

const SidebarItem = ({ icon: Icon, label, link, sideBarOpen }) => (
  <div className="flex justify-start overflow-hidden pl-4 pt-4">
    <Icon className="text-2xl group" />
    <div
      className={`${
        sideBarOpen ? "block" : "hidden"
      } overflow-hidden duration-300 ml-4`}
    >
      <Link to={link}>{label}</Link>
    </div>
  </div>
);

export default SidebarItem;
