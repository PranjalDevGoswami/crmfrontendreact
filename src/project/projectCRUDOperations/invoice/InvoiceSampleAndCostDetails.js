import React, { useEffect } from "react";

const InvoiceSampleAndCostDetails = ({
  CBRDetails,
  setInvoiceData,
  invoiceData,
  ABRDetails,
}) => {
  const handleInputChange = (e) => {
    setInvoiceData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    setInvoiceData((prev) => ({
      ...prev,
      cost_components: CBRDetails?.flatMap((cbr) =>
        cbr?.final_samples.map((item) => ({
          name: item?.target_group,
          sample: Number(item?.sample),
          cpi: Number(item?.cpi),
        }))
      ),
    }));
  }, [CBRDetails]);

  const totalProjectCost = CBRDetails?.reduce((total, cbr) => {
    return (
      total +
      cbr?.final_samples?.reduce((sum, item) => {
        return sum + Number(item.sample) * Number(item.cpi);
      }, 0)
    );
  }, 0);

  const advanceAmount =
    invoiceData?.advanceType === "CBR"
      ? ABRDetails[0]?.advance_invoice_amount || 0
      : 0;

  const finalPayment = (totalProjectCost - advanceAmount).toFixed(2);

  useEffect(() => {
    setInvoiceData((prev) => ({
      ...prev,
      totalCost: totalProjectCost.toFixed(2),
      final_payment: finalPayment,
    }));
  }, [finalPayment, totalProjectCost]);

  return (
    <div className="pb-4 mb-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Description</th>
            <th className="border px-3 py-2">Cost Components</th>
            <th className="border px-3 py-2">Sample</th>
            <th className="border px-3 py-2">CPI</th>
            <th className="border px-3 py-2">Total Costing (USD)</th>
          </tr>
        </thead>
        <tbody>
          {CBRDetails?.map((cbr, cbrIndex) => {
            const rowCount = cbr?.final_samples?.length || 1;
            return (
              <React.Fragment key={cbrIndex}>
                <tr>
                  <td
                    className="border p-2 align-top"
                    rowSpan={rowCount}
                    style={{ verticalAlign: "top" }}
                  >
                    <input
                      type="text"
                      name="description"
                      onChange={handleInputChange}
                      className="w-full bg-white border p-2"
                      placeholder="Final Cost"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      name="studyName"
                      defaultValue={cbr?.final_samples[0]?.target_group}
                      onChange={handleInputChange}
                      className="w-full bg-white border p-2"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      name="sample"
                      defaultValue={cbr?.final_samples[0]?.sample}
                      onChange={handleInputChange}
                      className="w-full bg-white border p-2"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      name="cost_components"
                      defaultValue={cbr?.final_samples[0]?.cpi}
                      onChange={handleInputChange}
                      className="w-full bg-white border p-2"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      name="totalCost"
                      defaultValue={`$${(
                        cbr?.final_samples[0]?.sample *
                        cbr?.final_samples[0]?.cpi
                      ).toFixed(2)}`}
                      onChange={handleInputChange}
                      className="w-full bg-white border p-2"
                      placeholder="Final Cost"
                    />
                  </td>
                </tr>
                {cbr?.final_samples?.slice(1).map((item, index) => (
                  <tr key={index}>
                    <td className="border p-2">
                      <input
                        type="text"
                        name="studyName"
                        defaultValue={item?.target_group}
                        onChange={handleInputChange}
                        className="w-full bg-white border p-2"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        name="sample"
                        defaultValue={item?.sample}
                        onChange={handleInputChange}
                        className="w-full bg-white border p-2"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="text"
                        name="cost_components"
                        defaultValue={item?.cpi}
                        onChange={handleInputChange}
                        className="w-full bg-white border p-2"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="text"
                        name="totalCost"
                        defaultValue={`$${(item?.sample * item?.cpi).toFixed(
                          2
                        )}`}
                        onChange={handleInputChange}
                        className="w-full bg-white border p-2"
                        placeholder="Final Cost"
                      />
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            );
          })}

          <tr className="border">
            <td className="border p-2">Total Project Cost</td>
            <td colSpan="3"></td>
            <td className="border p-2">{"$" + totalProjectCost.toFixed(2)}</td>
          </tr>

          {invoiceData?.advanceType === "CBR" && (
            <tr className="border">
              <td className="border p-2">Less: Advance against Invoice</td>
              <td colSpan="3"></td>
              <td className="border p-2">{"$" + advanceAmount.toFixed(2)}</td>
            </tr>
          )}

          <tr className="border">
            <td className="border p-2">Final Payment</td>
            <td colSpan="3"></td>
            <td className="border p-2">{"$" + finalPayment}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceSampleAndCostDetails;
