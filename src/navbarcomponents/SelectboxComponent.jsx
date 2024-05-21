/* eslint-disable no-unused-vars */
import React from "react";
// import Select from "react-select";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";

function SelectboxComponent({
  autoFocus,
  component,
  data,
  handleChange,
  elementName,
}) {
  const [selectdata, setSelectData] = React.useState([]);

  // React.useEffect(() => {
  //   objData?.items.length > 0 ? setSelectData(objData?.items) : apicall();
  // }, []);

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
          {data.map((d) => (
            <option value={d?.id}>{d?.name}</option>
          ))}
        </select>
      </div>
    </>
  );
}

export default SelectboxComponent;
