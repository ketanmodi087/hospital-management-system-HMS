import React from "react";

const KpiDashboardIcon = () => {
  const svgString = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.25" d="M12 12V2C17.523 2 22 6.477 22 12H12Z" fill="#787486"/>
<path opacity="0.5" d="M12 12L17 20.66C18.5195 19.7816 19.7813 18.5191 20.6589 16.9991C21.5364 15.4791 21.9989 13.7551 22 12H12Z" fill="#787486"/>
<path d="M17.0009 20.66L12.0009 12V2C6.47791 2.002 2.00191 6.48 2.00391 12.003C2.00591 17.526 6.48391 22.002 12.0079 22C13.7607 21.9993 15.4826 21.5379 17.0009 20.662L17.0039 20.657L17.0009 20.66Z" fill="#787486"/>
</svg>`;

  return <div dangerouslySetInnerHTML={{ __html: svgString }} />;
};

export default KpiDashboardIcon;
