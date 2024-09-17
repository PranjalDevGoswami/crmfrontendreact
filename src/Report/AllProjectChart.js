import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const AllProjectChart = ({ ...props }) => {
  const { projectData, filteredData } = props;

  const Sample = filteredData.map((item) => item.sample);
  const ProjectName = filteredData.map((item) => item?.project_code);
  const data = [
    {
      data: Sample,
    },
  ];
  return (
    <div className="">
      <BarChart
        xAxis={[{ scaleType: "band", data: ProjectName }]}
        series={data}
        // width={800}
        height={300}
      />
    </div>
  );
};

export default AllProjectChart;
