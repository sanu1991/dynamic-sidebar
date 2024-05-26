/* eslint-disable no-unused-vars */
import React from "react";

function SelectboxComponent({
  autoFocus,
  component,
  data,
  handleChange,
  elementName,
}) {
  return (
    <>
      <div className="m-2">
        <select
          autoFocus={autoFocus}
          className="form-select"
          aria-label="Default select example"
          value={component}
          onChange={(e) => handleChange(e?.target?.value, elementName)}
        >
          {data.map((d, i) => (
            <option key={i} value={d?.id}>
              {d?.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default SelectboxComponent;
