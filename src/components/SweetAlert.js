import Swal from "sweetalert2";

const SweetAlert = ({ title, text, icon }) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    customClass: "swal-back",
  });
};

export default SweetAlert;
