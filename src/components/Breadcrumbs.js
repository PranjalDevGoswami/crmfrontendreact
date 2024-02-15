import React from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs();
  const location = useLocation();

  return (
    <React.Fragment>
      {breadcrumbs.map(({ breadcrumb, match }, index) => (
        <React.Fragment key={match.url}>
          {index > 0 && " >> "} {/* Add "/" between breadcrumbs */}
          <Link to={match.url} className={location.pathname === match.url ? 'bg-red-400' : ''}>{breadcrumb}</Link>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default Breadcrumbs;
