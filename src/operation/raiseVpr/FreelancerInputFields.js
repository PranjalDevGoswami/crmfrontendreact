import LableAndInput from "../../Molecules/LableAndInput";

export const FreelancerInputFields = ({ freelancerData, setFreelancerData }) => {

  const freelancerFields = [
    {
      labelName: "Talal Amount",
      InputValue: freelancerData?.total_amount,
      InputName: "total_amount",
      inputChange: (e) =>
        setFreelancerData({ ...freelancerData, total_amount: e.target.value }),
      inputClassName: "p-2 border bg-white rounded-md",
    },
    {
      labelName: "Upload Freelancer Invoice",
      InputValue: freelancerData?.upload_freelancer_invoice,
      InputName: "upload_freelancer_invoice",
      inputChange: (e) => {
        const files = Array.from(e.target.files);
        setFreelancerData(prevData => ({
          ...prevData,
          upload_freelancer_invoice: [
            ...(prevData.upload_freelancer_invoice || []),
            ...files
          ]
        }));
      },
      
      inputClassName: "p-2 border bg-white rounded-md",
      type:"file"
    },
  ]

  return (
    <>
      {freelancerFields.map((field, index) => (
        field.type ? 
         <LableAndInput
         InputType={field.type}
         key={index}
         labelClassName="text-left"
         labelName={field.labelName}
         Inputvalue={field.InputValue}
         InputName={field.InputName}
         inputChange={field.inputChange}
         inputClassName={field.inputClassName}
         multiple
       /> : 
        <LableAndInput
          key={index}
          labelClassName="text-left"
          labelName={field.labelName}
          Inputvalue={field.InputValue}
          InputName={field.InputName}
          inputChange={field.inputChange}
          inputClassName={field.inputClassName}
        />
      ))}
    </>
  );
};
