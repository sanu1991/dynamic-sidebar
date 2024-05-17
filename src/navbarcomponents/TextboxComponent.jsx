/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React from "react";

function TextboxComponent({ index, placeholder, component, autoFocus, handleChange, elementName }) {
  return (
    <div className="m-2">
      <input
        autoFocus={autoFocus}
        type="text"
        className="form-control"
        placeholder={placeholder}
        aria-describedby="basic-addon1"
        value={component}
        onChange={(e) => handleChange(e?.target?.value, elementName)}
      />
    </div>
  );
}

export default TextboxComponent;
