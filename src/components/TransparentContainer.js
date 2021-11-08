// * Dependencies
import React from "react";
// * Components

//* Styles
import "./styles/TransparentContainer.scss";

const TransparentContainer = (props) => {
  return (
    <div className={"transparent-card " + props.additionalClasses}>
      {props.children}
    </div>
  );
};

export default TransparentContainer;
