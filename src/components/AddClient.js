import React, { useState } from "react";
import Input from "./InputField";
import Button from "./Button";
import { PostClientList } from "../fetchApis/clientList/ClientList";

const AddClient = ({ closeAddClient }) => {
  const [clientData, setClientData] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    phone_number: "",
    contact_person: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "phone_number") {
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
        closeAddClient(false);
        alert("Client Add Successfully!!");
      } else {
        alert(response?.ex?.response?.data?.name);
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
    setClientData({
      name: "",
      address: "",
      city: "",
      country: "",
      phone_number: "",
      contact_person: "",
    });
  };

  return (
    <div className="p-8">
      <h3 className="pt-4 pb-4 underline text-2xl">Add Client Details</h3>
      <div className="flex flex-wrap gap-4">
        <Input
          type="text"
          name="name"
          className="p-2 w-[45%] border rounded"
          placeholder="Client Name"
          value={clientData.name}
          onchange={handleChange}
          required
        />
        <Input
          type="text"
          name="address"
          className="p-2 w-[45%] border rounded"
          placeholder="Address"
          value={clientData.address}
          onchange={handleChange}
        />
        <Input
          type="text"
          name="city"
          className="p-2 w-[45%] border rounded"
          placeholder="City"
          value={clientData.city}
          onchange={handleChange}
          required
        />
        <Input
          type="text"
          name="country"
          className="p-2 w-[45%] border rounded"
          placeholder="Country"
          value={clientData.country}
          onchange={handleChange}
          required
        />
        <Input
          type="number"
          name="phone_number"
          className="p-2 w-[45%] border rounded"
          placeholder="Phone number"
          value={clientData.phone_number}
          onchange={handleChange}
          required
        />
        <Input
          type="text"
          name="contact_person"
          className="p-2 w-[45%] border rounded"
          placeholder="Contact Person"
          value={clientData.contact_person}
          onchange={handleChange}
          required
        />
      </div>
      <Button
        name="Add Client"
        className="bg-yellow-200 p-4 rounded mt-4 w-4/12"
        onClick={handleAddClient}
      />
    </div>
  );
};

export default AddClient;
