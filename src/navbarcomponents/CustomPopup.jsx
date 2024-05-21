import React from "react";

const CustomPopup = ({ overflowY, setIsPopupOpen, children }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "rgba(187, 187, 187, 0.3)",
        zIndex: 2,
      }}
    >
      <div
        style={{
          display: "block",
          backgroundColor: "white",
          zIndex: 9,
          border: "1px solid #f7f7f7",
          width: "40vw",
          height: "auto",
          borderRadius: "10px",
        }}
      >
        {/* popup header  */}
        <div
          style={{ display: "flex", width: "100%", padding: "6px 10px 2px" }}
        >
          {/* popup title */}
          <span style={{ width: "90%" }} className="text-start">
            <h6>Create Sidebar Data</h6>
          </span>
          {/* cross btn */}
          <span
            style={{ width: "10%", color: "red", cursor: "pointer" }}
            className="text-end"
            onClick={() => {
              setIsPopupOpen(false);
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </span>
        </div>
        <hr style={{ margin: "0px" }} />
        {/* popup body  */}
        <div
          style={{
            padding: "0px",
            maxHeight: "500px",
            height: "auto",
            overflowY: overflowY,
            overflowX: "hidden",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomPopup;
