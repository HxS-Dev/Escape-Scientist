import React from "react";

const ControlPanelCard = ({ cardTitle, className, children }) => {
  let allClasses = "card rounded shadow p-3 mb-4 " + className;
  return (
    <div className={allClasses}>
      <div className="row">
        <h5 className="card-title text-center">{cardTitle}</h5>
      </div>
      {children}
    </div>
  );
};

export default ControlPanelCard;
