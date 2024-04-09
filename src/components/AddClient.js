import React from "react";
import Input from "./InputField";
import Button from "./Button";

const AddClient = () => {
  return (
    <div className="p-8">
      <h3 className="pt-4 pb-4 underline text-2xl">Add Client Details</h3>
      <div className="flex flex-wrap gap-4">
        <Input
          type={"text"}
          className={"p-2 w-[45%] border rounded"}
          placeholder={"Client Name"}
          required
        />
        <Input
          type={"text"}
          className={"p-2 w-[45%] border rounded"}
          placeholder={"Address"}
        />
        <Input
          type={"text"}
          className={"p-2 w-[45%] border rounded"}
          placeholder={"City"}
          required
        />
        <Input
          type={"text"}
          className={"p-2 w-[45%] border rounded"}
          placeholder={"Country"}
          required
        />
        <Input
          type={"number"}
          className={"p-2 w-[45%] border rounded"}
          placeholder={"Phone number"}
          required
        />
        <Input
          type={"text"}
          className={"p-2 w-[45%] border rounded"}
          placeholder={"Contact Person"}
          required
        />
      </div>
      <Button
        name={"Add Client"}
        className={"bg-yellow-200 p-4 rounded mt-4 w-4/12"}
      />
    </div>
  );
};

export default AddClient;
