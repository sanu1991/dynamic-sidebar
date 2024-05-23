import React from "react";
import "./Sidenavbar.css";

const CustomPopup = ({ setIsPopupOpen, children, popupTitle }) => {
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
        className="popupSize"
        style={{
          display: "block",
          backgroundColor: "white",
          // zIndex: 9,
          border: "1px solid #f7f7f7",
          borderRadius: "10px",
        }}
      >
        {/* popup header  */}
        <div
          style={{ display: "flex", width: "100%", padding: "6px 10px 2px" }}
        >
          {/* popup title */}
          <span style={{ width: "90%" }} className="text-start">
            <h6>{popupTitle}</h6>
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
            maxHeight: "400px",
            overflowY: "scroll",
            overflowX: "hidden",
            padding: "0px 10px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomPopup;
