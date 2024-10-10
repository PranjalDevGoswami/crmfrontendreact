import React from "react";
import FilterProject from "./FilterProject";

const ProjectNameAndFilter = ({ data, ProjectHeading, NoProjectHeading }) => {
  return (
    <div className="sm:flex items-center justify-between w-full min-[320px]:block">
      <div className="sm:w-4/12 min-[320px]:w-full">
        <h2 className="text-2xl">
          {data?.length > 0 ? ProjectHeading : NoProjectHeading}
        </h2>
      </div>
      <div className="flex items-center justify-end sm:w-8/12 min-[320px]:w-full">
        <FilterProject />
      </div>
    </div>
  );
};

export default ProjectNameAndFilter;
