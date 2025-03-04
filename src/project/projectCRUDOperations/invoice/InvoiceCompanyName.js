const InvoiceCompanyName = ({ setSelectedCompany, companyName }) => {
  const handleCompanyChange = (event) => {
    if (event !== "--select company name--") {
      const company = companyName.find((c) => c.name === event.target.value);
      setSelectedCompany(company);
    }
  };

  return (
    <div>
      <div className="flex flex-col w-1/2">
        <label className="font-semibold text-gray-800 ">Company:</label>
        <select
          className="border border-gray-300 rounded-md p-2"
          onChange={handleCompanyChange}
        >
          <option value={"--select company name--"}>
            --select company name--
          </option>
          {companyName.map((company, index) => (
            <option key={index} value={company.name}>
              {company.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InvoiceCompanyName;
