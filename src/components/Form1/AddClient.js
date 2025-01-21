import React, { useContext, useState } from "react";
import Input from "../../Atom/InputField";
import Button from "../../Atom/Button";
import { PostClientList } from "../../fetchApis/clientList/ClientList";
import SweetAlert from "../SweetAlert";
import { CloseAddClient } from "../../ContextApi/CloseAddClientContext";
import { useSelector } from "react-redux";

const AddClient = () => {
  const [clientData, setClientData] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    phone_number: "",
    contact_person: "",
    email: "",
    email_id_for_cc: "",
  });
  const { closeAddClient, setCloseAddClient } = useContext(CloseAddClient);
  const darkMode = useSelector((store) => store.darkMode.isDarkMode);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "phone_number") {
      console.log(closeAddClient);

      setClientData((prevData) => ({
        ...prevData,
        [name]: parseInt(value),
      }));
    }
  };

  const handleAddClient = async (e) => {
    e.preventDefault();
    try {
      const response = await PostClientList(clientData);
      if (response?.status == true) {
        setCloseAddClient(!closeAddClient);
        console.log(closeAddClient);
        SweetAlert({
          title: "Client Added Successfully!!",
          text: "",
          icon: "success",
        });
      } else if (response?.ex.response.data.name) {
        SweetAlert({
          title: "Error",
          text: "ClientName Can not be blank!",
          icon: "error",
        });
      } else if (response?.ex.response.data.phone_number) {
        SweetAlert({
          title: "Error",
          text: "Phone Number Can not be blank!",
          icon: "error",
        });
      } else {
        SweetAlert({
          title: "Error",
          text: response?.ex?.response?.data?.name || "An error occurred",
          icon: "error",
        });
      }
    } catch (error) {
      SweetAlert({
        title: "Error",
        text: "An error occurred while adding the client.",
        icon: "error",
      });
    }
  };

  return (
    <div className={`${darkMode && "bg-black text-white"}`}>
      <h3 className="pt-4 pb-6 text-2xl font-semibold text-center text-black-400 border-b-4 border-black-300 mb-6">
        Add Client Details
      </h3>
      <div className="flex flex-wrap gap-4">
        <Input
          type="text"
          name="name"
          className="p-2 w-[45%] border bg-white rounded-none"
          placeholder="Client Name"
          value={clientData.name}
          onchange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          className="p-2 w-[45%] border bg-white rounded-none"
          placeholder="Email"
          value={clientData.email}
          onchange={handleChange}
          required
        />
        <Input
          type="email"
          name="email_id_for_cc"
          className="p-2 w-[45%] border bg-white rounded-none"
          placeholder="Contact Person Email"
          value={clientData.email_id_for_cc}
          onchange={handleChange}
          required
        />
        <Input
          type="text"
          name="address"
          className="p-2 w-[45%] border bg-white rounded-none"
          placeholder="Address"
          value={clientData.address}
          onchange={handleChange}
        />
        <Input
          type="text"
          name="city"
          className="p-2 w-[45%] border bg-white rounded-none"
          placeholder="City"
          value={clientData.city}
          onchange={handleChange}
          required
        />
        <Input
          type="text"
          name="country"
          className="p-2 w-[45%] border bg-white rounded-none"
          placeholder="Country"
          value={clientData.country}
          onchange={handleChange}
          required
        />
        <Input
          type="number"
          name="phone_number"
          className="p-2 w-[45%] border bg-white rounded-none"
          placeholder="Phone number"
          value={clientData.phone_number}
          onchange={handleChange}
          required
        />
        <Input
          type="text"
          name="contact_person"
          className="p-2 w-[45%] border bg-white rounded-none"
          placeholder="Contact Person"
          value={clientData.contact_person}
          onchange={handleChange}
          required
        />
      </div>
      <Button
        name="Add Client" 
        className={`${
          darkMode ? "bg-black text-white" : "bg-green-400" 
        } p-2 rounded mt-3 w-2/12 border`}
        onClick={handleAddClient}
      />
    </div>
  );
};

export default AddClient;
