import React, { useState } from "react";
// import logo from "./logo.png";
// import Sidenavbar from "../navbarcomponents/Sidenavbar";
import CustomPopup from "../navbarcomponents/CustomPopup";
// import { v4 as uuidv4 } from "uuid";
import DynamicSidebar from "../navbarcomponents/DynamicSidebar";
const Layout = () => {
  const childCompRef = React.useRef(null);
  // dummy data
  // const ndata = [
  //   {
  //     id: uuidv4().slice(0, 4),
  //     icon: '<i class="fa-solid fa-star"></i>', // fontawesome icon
  //     visible: false,
  //     caption: "Dropdown",
  //     link: "",
  //     sub: [
  //       {
  //         id: uuidv4().slice(0, 4),
  //         icon: "",
  //         visible: false,
  //         caption: "Sub dropdowns",
  //         link: "",
  //         sub: [
  //           {
  //             id: uuidv4().slice(0, 4),
  //             icon: "",
  //             visible: false,
  //             caption: "Blogs",
  //             link: "/dynamic-sidebar/page1",
  //             sub: [],
  //           },
  //           {
  //             id: uuidv4().slice(0, 4),
  //             icon: "",
  //             visible: false,
  //             caption: "Contact",
  //             link: "/dynamic-sidebar/page2",
  //             sub: [],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];

  const [navData, setNavData] = useState([]);
  const [isCreateModeOn, setIsCreateModeOn] = useState(true); // only for demo purpose
  const [guidePopupOpen, setGuidePopupOpen] = useState(isCreateModeOn);
  const saveNewData = () => {
    const newNavData = childCompRef?.current?.newNavData();
    const styleData = childCompRef?.current?.styleData();
    console.log(newNavData);
    console.log(styleData);
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <DynamicSidebar
        ref={childCompRef}
        activeCreateButton={isCreateModeOn} // only for demo purpose
        saveNewData={() => saveNewData()}
        // logo={logo} // mendatory if header="logo"
      />
      <div
        style={{
          width: "100%",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
        }}
      >
        <label
          style={{ fontSize: "20px", fontWeight: 700, margin: "0px 10px" }}
        >
          Create Mode On
        </label>
        <input
          style={{ margin: "0px 10px", width: "18px", height: "18px" }}
          type="checkbox"
          checked={isCreateModeOn}
          onChange={(e) => {
            setIsCreateModeOn(e?.target?.checked);
            e?.target?.checked && setGuidePopupOpen(true);
          }}
        />
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => setGuidePopupOpen(true)}
        >
          User Guide
        </button>
      </div>
      <div
        style={{
          width: "100%",
          height: "90vh",
          paddingLeft: "10%",
          color: "grey",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
        }}
      >
        <div>
          <p style={{ fontSize: "20vw", color: "#5d98d4", margin: 0 }}>
            React JS
          </p>
          <p style={{ fontSize: "5vw", margin: 0 }}>Sidebar component</p>
        </div>
      </div>
      {guidePopupOpen && (
        <CustomPopup
          overflowY="scroll"
          setIsPopupOpen={setGuidePopupOpen}
          popupTitle="Step by step User Guide"
        >
          <p>
            1. Click on{" "}
            <i style={{ fontSize: "12px" }} className="fa-solid fa-palette"></i>{" "}
            icon to change Sidebar style.
          </p>
          <p>
            2. Click on{" "}
            <i style={{ fontSize: "12px" }} className="fa-solid fa-plus"></i>{" "}
            icon to add Dropdowns.
          </p>
          <p>
            3. Click on{" "}
            <i
              style={{ fontSize: "10px", cursor: "pointer" }}
              className="fa-solid fa-edit"
            ></i>{" "}
            icon to add caption, icon(
            <a href="https://fontawesome.com/search?o=r&m=free" target="_blank">
              fontawesome
            </a>
            ) and link(in demo you can use: /dynamic-sidebar/page1 &
            /dynamic-sidebar/page2).
          </p>
          <p>
            4. Click on{" "}
            <i
              style={{ fontSize: "10px", cursor: "pointer" }}
              className="fa-solid fa-trash"
            ></i>{" "}
            icon to delete created dropdown.
          </p>
          <p>
            5. Click on{" "}
            <i
              style={{ fontSize: "10px", cursor: "pointer" }}
              className="fa-solid fa-plus"
            ></i>{" "}
            icon of created dropdown to create sub dropdown.
          </p>
          <p>
            6. Move with{" "}
            <i
              style={{ fontSize: "10px", cursor: "pointer" }}
              className="fa-solid fa-up-down-left-right"
            ></i>{" "}
            icon of created dropdown to change the position.
          </p>
          <p>
            7. Click on{" "}
            <i
              style={{ fontSize: "10px", cursor: "pointer" }}
              className="fa-solid fa-caret-down"
            ></i>{" "}
            icon to hide sub dropdowns and Click on{" "}
            <i
              style={{ fontSize: "10px", cursor: "pointer" }}
              className="fa-solid fa-caret-up"
            ></i>{" "}
            icon to show sub dropdowns.
          </p>
          <p>
            8. After create dropdown don't forget to click{" "}
            <i
              style={{ fontSize: "10px", cursor: "pointer" }}
              className="fa-solid fa-save"
            ></i>{" "}
            icon to save dropdown and style data(saved data will show on your
            console).
          </p>
          <p>
            9. Create mode should be off to show the actual view of sidebar.
          </p>
        </CustomPopup>
      )}
    </div>
    // </>
  );
};

export default Layout;
