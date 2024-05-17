import React, { useState } from "react";
import logo from "./logo.png";
import Sidenavbar from "../navbarcomponents/Sidenavbar";
const Layout = () => {
  const childCompRef = React.useRef(null);
  const [navData, setNavData] = useState([]);
  const saveNewData = () => {
    const newNavData = childCompRef?.current?.newNavData();
    console.log(newNavData);
  };
  return (
    // <>
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      {/* <div> */}
        <Sidenavbar
          ref={childCompRef}
          navbardata={navData}
          // activeCreateButton={true}
          saveNewData={() => saveNewData()}
          expandType="click"
          // expandType="hover"
          header="logo"
          // header="normal"
          logo={logo} // mendatory if header="logo"
          backgroundColor="rgba(0, 0, 0, 0.7)"
          captionColorClass="captionColor" // add in project App.css file: .iconColor:hover {color: #f46161 !important;}
          iconColorClass="iconColor" // add in project App.css file: .captionColor:hover {color: #f46161 !important;}
          expandIconColor="black"
          expandIconDeviderColor="black"
          searchIconColor="white"
          expandableTime=".5s"
          searchHighlightBackgroundColor="#f2fa52"
          collapseButtonColor="black"
        />
      {/* </div> */}
      <div
        style={{
          width: "100%",
          height: "100vh",
          padding: "5px 10px",
          color: "grey",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "15vw", color: "#5d98d4" }}>React JS</p>
        <p style={{ fontSize: "5vw" }}>Sidebar component</p>
      </div>
    </div>
    // </>
  );
};

export default Layout;
// const navbardata = [
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
//             link: "/blogs",
//             sub: [],
//           },
//           {
//             id: uuidv4().slice(0, 4),
//             icon: "",
//             visible: false,
//             caption: "Contact",
//             link: "/contact",
//             sub: [],
//           },
//         ],
//       },
//     ],
//   },
// ];
