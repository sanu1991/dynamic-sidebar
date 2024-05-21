import React, { useState } from "react";
import logo from "./logo.png";
import Sidenavbar from "../navbarcomponents/Sidenavbar";
import { v4 as uuidv4 } from "uuid";
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
  //             link: "/dynamic-sidebar/blogs",
  //             sub: [],
  //           },
  //           {
  //             id: uuidv4().slice(0, 4),
  //             icon: "",
  //             visible: false,
  //             caption: "Contact",
  //             link: "/dynamic-sidebar/contact",
  //             sub: [],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];

  const [navData, setNavData] = useState([]);
  const [isCreateModeOn, setIsCreateModeOn] = useState(true); // only for demo purpose
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
      <Sidenavbar
        ref={childCompRef}
        navbardata={navData}
        activeCreateButton={isCreateModeOn} // only for demo purpose
        saveNewData={() => saveNewData()}
        logo={logo} // mendatory if header="logo"
      />
      <div
        style={{
          width: "100%",
          height: "10vh",
          textAlign: "right",
          padding: "10px 20px",
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
          onChange={(e) => setIsCreateModeOn(e?.target?.checked)}
        />
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
    </div>
    // </>
  );
};

export default Layout;
