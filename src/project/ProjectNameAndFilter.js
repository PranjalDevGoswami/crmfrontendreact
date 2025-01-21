import React from "react";
import ExportCSV from "./ExportExcel";
import { TbTableExport } from "react-icons/tb";
import Tooltip from "../components/Tooltip";
import { useSelector } from "react-redux";

const ProjectNameAndFilter = ({ data, ProjectHeading, NoProjectHeading }) => {
  const ExportData = useSelector((store) => store.ExportData.items);
  return (
    <div className="sm:flex items-center justify-between w-full min-[320px]:block pr-2">
      <div className="sm:w-4/12 min-[320px]:w-full">
        <h2 className="text-2xl text-TextBlue">
          {data?.length > 0 ? ProjectHeading : NoProjectHeading}
        </h2>
      </div>
      <div className="flex items-center justify-end sm:w-8/12 min-[320px]:w-full">
        {/* <FilterProject /> */}
        <Tooltip text="Exports" position="top">
          <ExportCSV
            data={ExportData}
            name={<TbTableExport />}
            className={
              "p-2 border border-gray-200 bg-gray-100 rounded-sm text-sm flex items-center justify-around text-blue-400 ml-2 hover:scale-110"
            }
            downloadName={"Project_List.csv"}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default ProjectNameAndFilter;
