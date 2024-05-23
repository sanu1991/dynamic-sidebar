import React from "react";
import { useNavigate } from "react-router-dom";
import Highlighter from "react-highlight-words";
import "./Sidenavbar.css";
import CustomPopup from "./CustomPopup";
import TextboxComponent from "./TextboxComponent";
import { v4 as uuidv4 } from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import SelectboxComponent from "./SelectboxComponent";

const SidenavbarCom = React.forwardRef(
  ({ navbardata, activeCreateButton, logo, saveNewData }, ref) => {
    const cssData = {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      header: "1",
      expandType: "1",
      expandIconColor: "white",
      expandIconDeviderColor: "black",
      iconColor: "white",
      iconHoverColor: "skyblue",
      captionColor: "white",
      captionHoverColor: "skyblue",
      searchIconColor: "white",
      expandableTime: ".5s",
      searchHighlightBackgroundColor: "#f2fa52",
      collapseButtonColor: "white",
    };
    const expandTypeData = [
      { id: "1", name: "click" },
      { id: "2", name: "hover" },
    ];
    const headerTypeData = [
      { id: "1", name: "normal" },
      { id: "2", name: "logo" },
    ];
    const [navData, setNavData] = React.useState([...navbardata]);
    const [styleData, setStyleData] = React.useState({ ...cssData });
    const [srchData, setsrchData] = React.useState("");
    const [filterData, setFilterData] = React.useState([]);
    const [openNav, setOpenNav] = React.useState(false);
    const [isPopupOpen, setIsPopupOpen] = React.useState(false);
    const [isStyleChPopupOpen, setIsStyleChPopupOpen] = React.useState(false);
    const [selectedElement, setSelectedElement] = React.useState({});
    const [selectedIndex, setSelectedIndex] = React.useState(null);

    // states for dnd
    const [dragEle, setDragEle] = React.useState({});
    const [dragEleIndex, setDragEleIndex] = React.useState({});
    const [dragParentEle, setDragParentEle] = React.useState({});

    const onDragStart = (dragEle, pEle, dragEleIndex) => {
      setDragEle(dragEle);
      setDragEleIndex(dragEleIndex);
      setDragParentEle(pEle);
    };

    const onDrop = (dropele, dropEleIndex, dropPele) => {
      if (dropPele?.id) {
        // ---------------------------
        const isDropEleChildOfDragEle = dragEle.sub.filter(
          (mdata) => mdata?.id === dropele?.id
        );
        // ---------------------------
        if (
          isDropEleChildOfDragEle.length === 0 &&
          dragEle?.id !== dropele?.id
        ) {
          // for drag element splice out
          const subData = (nd) => {
            nd?.sub.splice(dragEleIndex, 1);
          };
          let newData = (navDataItem) =>
            navDataItem.map((nd) => {
              if (nd.id === dragParentEle?.id) {
                return { ...nd, sub: subData(nd) };
              } else {
                return { ...nd, sub: newData(nd?.sub) };
              }
            });
          newData(navData);

          // for drag element add into the drop place
          const subData1 = (nd) => {
            // nd?.sub.splice(dropEleIndex, 0, dragEle);
            nd?.sub.push(dragEle);
          };
          let newData1 = (navDataItem) =>
            navDataItem.map((nd) => {
              if (nd.id === dropele?.id) {
                return { ...nd, sub: subData1(nd) };
              } else {
                return { ...nd, sub: newData1(nd?.sub) };
              }
            });
          newData1(navData);
          // to rerender the data
          setNavData([...navData]);
        }
      } else {
        if (dragParentEle?.id) {
          // for drag element splice out
          const subData = (nd) => {
            nd?.sub.splice(dragEleIndex, 1);
          };
          let newData = (navDataItem) =>
            navDataItem.map((nd) => {
              if (nd.id === dragParentEle?.id) {
                return { ...nd, sub: subData(nd) };
              } else {
                return { ...nd, sub: newData(nd?.sub) };
              }
            });
          newData(navData);
          // for drag element add into the drop place
          const subData1 = (nd) => {
            nd?.sub.push(dragEle);
          };
          let newData1 = (navDataItem) =>
            navDataItem.map((nd) => {
              if (nd.id === dropele?.id) {
                return { ...nd, sub: subData1(nd) };
              } else {
                return { ...nd, sub: newData1(nd?.sub) };
              }
            });
          newData1(navData);
          // to rerender the data
          setNavData([...navData]);
        } else if (dragEle?.id !== dropele?.id) {
          // for drag element splice out
          navData.splice(dragEleIndex, 1);
          // for drag element add into the drop place
          const subData1 = (nd) => {
            nd?.sub.push(dragEle);
          };
          let newData1 = (navDataItem) =>
            navDataItem.map((nd) => {
              if (nd.id === dropele?.id) {
                return { ...nd, sub: subData1(nd) };
              } else {
                return { ...nd, sub: newData1(nd?.sub) };
              }
            });
          newData1(navData);
          // to rerender the data
          setNavData([...navData]);
        }
      }
    };

    const visibleFunc = (navbardataProp, id) =>
      navbardataProp.map((nd) => {
        if (nd?.id === id) {
          return { ...nd, visible: !nd?.visible };
        } else {
          return { ...nd, sub: visibleFunc(nd.sub, id) };
        }
      });

    const navigate = useNavigate();

    // ------------------------------------------------- //
    const Listmap = (itm, preItm) =>
      itm.map((e, i) => (
        <div
          className="fontSize"
          key={i}
          style={{
            display: "block",
            padding: openNav && !activeCreateButton ? "0px 0px 0px 5px" : "0px",
          }}
          onDragOver={(ele) => ele.preventDefault()}
          onDrop={(ele) => {
            ele.stopPropagation();
            onDrop(e, i, preItm);
          }}
        >
          <div
            onClick={() => navigate(e?.link)}
            style={{ display: "flex", width: "100%", padding: "3px 0px" }}
          >
            {/* list icon */}
            <span
              // className={iconColorClass}
              onMouseOver={(ele) =>
                (ele.target.style.color = styleData?.iconHoverColor)
              }
              onMouseOut={(ele) =>
                (ele.target.style.color = styleData?.iconColor)
              }
              style={{
                width: "10%",
                textAlign: "left",
                color: styleData?.iconColor,
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: e?.icon }}></div>
            </span>
            {/* list name */}
            {openNav && (
              <span
                onMouseOver={(ele) =>
                  (ele.target.style.color = styleData?.captionHoverColor)
                }
                onMouseOut={(ele) =>
                  (ele.target.style.color = styleData?.captionColor)
                }
                style={{
                  color: styleData?.captionColor,
                  width: activeCreateButton ? "40%" : "80%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                onClick={() => {
                  setNavData(visibleFunc(navData, e?.id));
                }}
              >
                <Highlighter
                  highlightStyle={{
                    backgroundColor: styleData?.searchHighlightBackgroundColor,
                  }}
                  highlightClassName="YourHighlightClass"
                  searchWords={[srchData]}
                  autoEscape={true}
                  textToHighlight={e.caption}
                />
              </span>
            )}
            {/* Add button */}
            {openNav && activeCreateButton && (
              <span
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                title="Add Sub Dropdown"
                style={{
                  width: "10%",
                  textAlign: "right",
                  color: styleData?.captionColor,
                }}
                onMouseOver={(ele) =>
                  (ele.target.style.color = styleData?.captionHoverColor)
                }
                onMouseOut={(ele) =>
                  (ele.target.style.color = styleData?.captionColor)
                }
                onClick={() => {
                  addObjToChild(e);
                }}
              >
                <i
                  style={{ fontSize: "10px", cursor: "pointer" }}
                  className="fa-solid fa-plus"
                ></i>
              </span>
            )}
            {/* edit button */}
            {openNav && activeCreateButton && (
              <span
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                title="Edit Dropdown"
                style={{
                  width: "10%",
                  textAlign: "right",
                  color: styleData?.captionColor,
                }}
                onMouseOver={(ele) =>
                  (ele.target.style.color = styleData?.captionHoverColor)
                }
                onMouseOut={(ele) =>
                  (ele.target.style.color = styleData?.captionColor)
                }
                onClick={() => {
                  setIsPopupOpen(true);
                  setSelectedElement(e);
                  setSelectedIndex(i);
                }}
              >
                <i
                  style={{ fontSize: "10px", cursor: "pointer" }}
                  className="fa-solid fa-edit"
                ></i>
              </span>
            )}
            {/* delete button */}
            {openNav && activeCreateButton && (
              <span
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                title="Delete Dropdown"
                style={{
                  width: "10%",
                  textAlign: "right",
                  color: styleData?.captionColor,
                }}
                onMouseOver={(ele) =>
                  (ele.target.style.color = styleData?.captionHoverColor)
                }
                onMouseOut={(ele) =>
                  (ele.target.style.color = styleData?.captionColor)
                }
                onClick={() => {
                  dltObj(e, i);
                }}
              >
                <i
                  style={{ fontSize: "10px", cursor: "pointer" }}
                  className="fa-solid fa-trash"
                ></i>
              </span>
            )}
            {/* move button */}
            {openNav && activeCreateButton && (
              <span
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                title="Move Dropdown"
                style={{
                  width: "10%",
                  textAlign: "right",
                  color: styleData?.captionColor,
                }}
                onMouseOver={(ele) =>
                  (ele.target.style.color = styleData?.captionHoverColor)
                }
                onMouseOut={(ele) =>
                  (ele.target.style.color = styleData?.captionColor)
                }
                onDragStart={(ele) => {
                  ele.stopPropagation();
                  onDragStart(e, preItm, i);
                }}
                draggable
              >
                <i
                  style={{ fontSize: "10px", cursor: "move" }}
                  className="fa-solid fa-up-down-left-right"
                ></i>
              </span>
            )}
            {/* up / down button */}
            {openNav && e.sub.length !== 0 && (
              <span
                onMouseOver={(ele) =>
                  (ele.target.style.color = styleData?.captionHoverColor)
                }
                onMouseOut={(ele) =>
                  (ele.target.style.color = styleData?.captionColor)
                }
                style={{
                  width: activeCreateButton ? "10%" : "20%",
                  textAlign: "right",
                  color: styleData?.captionColor,
                }}
                onClick={() => {
                  setNavData(visibleFunc(navData, e?.id));
                }}
              >
                {e.visible ? (
                  <i
                    style={{ fontSize: "10px", cursor: "pointer" }}
                    className="fa-solid fa-caret-down"
                  ></i>
                ) : (
                  <i
                    style={{ fontSize: "10px", cursor: "pointer" }}
                    className="fa-solid fa-caret-up"
                  ></i>
                )}
              </span>
            )}
          </div>
          {e.visible && Listmap(e.sub, e)}
        </div>
      ));

    const srch = (srchData, listData) => {
      srchData !== "" &&
        listData?.map((e, i) => {
          e?.caption.toLowerCase().includes(srchData.toLowerCase()) &&
            setFilterData((pre) => [...pre, e]);
          e?.sub?.length !== 0 && srch(srchData, e?.sub);
        });
    };

    const sidenavStyle = () => ({
      transition: `${styleData?.expandableTime}`,
      zIndex: 1,
      position: "absolute",
      display: "flex",
      backgroundColor: styleData?.backgroundColor,
    });

    // hot key (ctrl + alt + o  to open navbar) (ctrl + alt + c  to close navbar)
    document.onkeyup = function (e) {
      if (e.ctrlKey && e.altKey && e.which === 79) {
        setOpenNav(true);
      } else if (e.ctrlKey && e.altKey && e.which === 67) {
        setOpenNav(false);
      }
    };

    /// ============ functions for create data =========== //
    const addNewObj = () => {
      setNavData((pre) => [
        ...pre,
        {
          id: uuidv4().slice(0, 4),
          icon: "",
          visible: false,
          caption: "",
          link: "",
          sub: [],
        },
      ]);
    };
    const addObjToChild = (ele) => {
      const objAdd = (nd) =>
        nd.map((itm) => {
          if (itm?.id == ele?.id) {
            return {
              ...itm,
              visible: true,
              sub: [
                ...itm?.sub,
                {
                  id: uuidv4().slice(0, 4),
                  icon: "",
                  visible: false,
                  caption: "",
                  link: "",
                  sub: [],
                },
              ],
            };
          } else {
            return { ...itm, sub: objAdd(itm?.sub) };
          }
        });
      setNavData(objAdd(navData));
    };
    const dltObj = (ele, i) => {
      const objdlt = (nd) => {
        nd.map((itm) => {
          if (itm?.id === ele?.id) {
            return nd.splice(i, 1);
          } else {
            return { ...itm, sub: objdlt(itm?.sub) };
          }
        });
      };
      objdlt(navData);
      setNavData([...navData]);
    };
    const handleChange = (value, eName) => {
      const dataCh = (nd) =>
        nd.map((itm) => {
          if (itm?.id == selectedElement?.id) {
            return { ...itm, [eName]: value };
          } else {
            return { ...itm, sub: dataCh(itm?.sub) };
          }
        });
      setNavData(dataCh(navData));
      setSelectedElement((pre) => ({ ...pre, [eName]: value }));
    };
    // =================================================== //

    const handleStyleChange = (value, eName) => {
      setStyleData((pre) => ({ ...pre, [eName]: value }));
    };

    // send states to parent
    React.useImperativeHandle(ref, () => ({
      styleData: () => {
        return styleData;
      },
      newNavData: () => {
        return navData;
      },
    }));

    React.useEffect(() => {
      setOpenNav(activeCreateButton);
    }, [activeCreateButton]);

    return (
      <>
        {/* sidebar */}
        <div
          className={
            openNav ? "sidenav openSidenavWidth" : "sidenav closeSidenavWidth"
          }
          onMouseEnter={() => {
            styleData?.expandType === "2" && setOpenNav(true);
          }}
          onMouseLeave={() => {
            styleData?.expandType === "2" && setOpenNav(false);
            styleData?.expandType === "2" && setsrchData("");
          }}
          style={sidenavStyle()}
        >
          {/* left part */}
          <div style={{ width: "100%", height: "100%", padding: "0px" }}>
            <div style={{ width: "100%", padding: "0px 0px 5px 0px" }}>
              {/* expand Icon */}
              <div
                className="expandIconSize"
                style={{
                  textAlign: "center",
                  cursor: "pointer",
                  borderBottom: `1px solid`,
                  borderBottomColor: styleData?.expandIconDeviderColor,
                }}
              >
                {styleData?.header === "2" ? (
                  <img
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    title={
                      activeCreateButton
                        ? "Create Mode Off To Collapse"
                        : openNav
                        ? "Click to Collapse"
                        : "Click to open"
                    }
                    className="logoSize"
                    style={{ borderRadius: "50%", margin: "5px" }}
                    src={logo}
                    alt="error!"
                  />
                ) : styleData?.header === "1" ? (
                  <span
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    title={
                      activeCreateButton
                        ? "Create Mode Off To Collapse"
                        : openNav
                        ? "Click to Collapse"
                        : "Click to open"
                    }
                    onClick={() =>
                      styleData?.expandType == "1" &&
                      !activeCreateButton &&
                      setOpenNav(!openNav)
                    }
                    style={{ color: styleData?.expandIconColor }}
                  >
                    &#9776;
                  </span>
                ) : (
                  <p></p>
                )}
              </div>
              {/* search box-Icon / dnd btn / save btn */}
              {openNav ? (
                <div className="input-group my-2" style={{ height: "25px" }}>
                  {/* search box */}
                  <input
                    autoFocus={activeCreateButton ? false : true}
                    type="text"
                    className="form-control form-control-sm"
                    id="formGroupExampleInput"
                    placeholder="Search..."
                    onChange={(e) => {
                      setsrchData(e.target.value);
                      setFilterData([]);
                      srch(e.target.value, navData);
                    }}
                  />
                  {/* css btn */}
                  {activeCreateButton && (
                    <span
                      data-bs-toggle="tooltip"
                      data-bs-placement="right"
                      title="Change Style"
                      className="input-group-text"
                      id="basic-addon1"
                      onClick={() => setIsStyleChPopupOpen(true)}
                    >
                      <i
                        style={{ fontSize: "12px" }}
                        className="fa-solid fa-palette"
                      ></i>
                    </span>
                  )}
                  {/* create btn */}
                  {activeCreateButton && (
                    <span
                      data-bs-toggle="tooltip"
                      data-bs-placement="right"
                      title="Create Dropdown"
                      className="input-group-text"
                      id="basic-addon1"
                      onClick={() => addNewObj()}
                    >
                      <i
                        style={{ fontSize: "12px" }}
                        className="fa-solid fa-plus"
                      ></i>
                    </span>
                  )}
                  {/* save btn */}
                  {activeCreateButton && (
                    <span
                      data-bs-toggle="tooltip"
                      data-bs-placement="right"
                      title="Save New Data"
                      className="input-group-text"
                      id="basic-addon2"
                      onClick={() => saveNewData()}
                    >
                      <i
                        style={{ fontSize: "12px" }}
                        className="fa-solid fa-save"
                      ></i>
                    </span>
                  )}
                </div>
              ) : (
                <div
                  className="m-2 srchIcon"
                  style={{
                    textAlign: "center",
                    height: "25px",
                    color: styleData?.searchIconColor,
                  }}
                  onClick={() => setOpenNav(true)}
                >
                  <i className="fa-solid fa-search"></i>
                </div>
              )}
            </div>
            {/* dropdowns */}
            <div className="dropdowns">
              {filterData.length === 0
                ? Listmap(navData, {})
                : Listmap(filterData, {})}
            </div>
          </div>
          {/* right part collapse on/off btn */}
          {styleData?.expandType === "1" && (
            <span
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title={
                activeCreateButton
                  ? "Create Mode Off To Collapse"
                  : openNav
                  ? "Click to Collapse"
                  : "Click to open"
              }
              style={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                color: styleData?.collapseButtonColor,
              }}
            >
              <i
                onClick={() =>
                  styleData?.expandType === "1" &&
                  !activeCreateButton &&
                  setOpenNav(!openNav)
                }
                style={{
                  fontSize: "23px",
                }}
                className={
                  openNav ? "fa-solid fa-caret-left" : "fa-solid fa-caret-right"
                }
              ></i>
            </span>
          )}
        </div>
        {/* popup */}
        {isStyleChPopupOpen && (
          <CustomPopup
            setIsPopupOpen={setIsStyleChPopupOpen}
            popupTitle="Change Sidebar Style"
          >
            <p className="m-2">Change Background Color</p>
            <TextboxComponent
              component={styleData?.backgroundColor}
              placeholder="Enter Icon Color"
              elementName="backgroundColor"
              handleChange={(e) => handleStyleChange(e, "backgroundColor")}
            />
            <p className="m-2">Change Expand Type</p>
            <SelectboxComponent
              elementName="expandType"
              autoFocus={true}
              component={styleData?.expandType}
              data={expandTypeData}
              handleChange={(e) => handleStyleChange(e, "expandType")}
            />
            <p className="m-2">Change Expand Icon Color</p>
            <TextboxComponent
              component={styleData?.expandIconColor}
              placeholder="Enter Expand Icon Color"
              elementName="expandIconColor"
              handleChange={(e) => handleStyleChange(e, "expandIconColor")}
            />
            <p className="m-2">Change Icon Devider Color</p>
            <TextboxComponent
              component={styleData?.expandIconDeviderColor}
              placeholder="Enter Expand Icon Devider Color"
              elementName="expandIconDeviderColor"
              handleChange={(e) =>
                handleStyleChange(e, "expandIconDeviderColor")
              }
            />
            <p className="m-2">Change Search Icon Color</p>
            <TextboxComponent
              component={styleData?.searchIconColor}
              placeholder="Enter Search Icon Color"
              elementName="searchIconColor"
              handleChange={(e) => handleStyleChange(e, "searchIconColor")}
            />
            <p className="m-2">Change Header Type</p>
            <SelectboxComponent
              elementName="header"
              component={styleData?.header}
              data={headerTypeData}
              handleChange={(e) => handleStyleChange(e, "header")}
            />
            <p className="m-2">Change Icon Color</p>
            <TextboxComponent
              component={styleData?.iconColor}
              placeholder="Enter Icon Color"
              elementName="iconColor"
              handleChange={(e) => handleStyleChange(e, "iconColor")}
            />
            <p className="m-2">Change Icon Hover Color</p>
            <TextboxComponent
              component={styleData?.iconHoverColor}
              placeholder="Enter Icon Hover Color"
              elementName="iconHoverColor"
              handleChange={(e) => handleStyleChange(e, "iconHoverColor")}
            />
            <p className="m-2">Change Caption Color</p>
            <TextboxComponent
              component={styleData?.captionColor}
              placeholder="Enter Caption Color"
              elementName="captionColor"
              handleChange={(e) => handleStyleChange(e, "captionColor")}
            />
            <p className="m-2">Change Caption Hover Color</p>
            <TextboxComponent
              component={styleData?.captionHoverColor}
              placeholder="Enter Caption Hover Color"
              elementName="captionHoverColor"
              handleChange={(e) => handleStyleChange(e, "captionHoverColor")}
            />
            <p className="m-2">Change Expandable Time</p>
            <TextboxComponent
              component={styleData?.expandableTime}
              placeholder="Enter Expandable Time"
              elementName="expandableTime"
              handleChange={(e) => handleStyleChange(e, "expandableTime")}
            />
            <p className="m-2">Change Search Highlight Background Color</p>
            <TextboxComponent
              component={styleData?.searchHighlightBackgroundColor}
              placeholder="Enter Search Highlight Background Color"
              elementName="searchHighlightBackgroundColor"
              handleChange={(e) =>
                handleStyleChange(e, "searchHighlightBackgroundColor")
              }
            />
            <p className="m-2">Change Scollapse Button Color</p>
            <TextboxComponent
              component={styleData?.collapseButtonColor}
              placeholder="Enter Scollapse Button Color"
              elementName="collapseButtonColor"
              handleChange={(e) => handleStyleChange(e, "collapseButtonColor")}
            />
          </CustomPopup>
        )}
        {isPopupOpen && (
          <CustomPopup
            popupTitle="Create Sidebar Data"
            setIsPopupOpen={setIsPopupOpen}
          >
            <TextboxComponent
              component={selectedElement?.caption}
              index={selectedIndex}
              placeholder="Enter Caption"
              autoFocus={true}
              elementName="caption"
              handleChange={(e) => handleChange(e, "caption")}
            />
            <TextboxComponent
              component={selectedElement?.icon}
              index={selectedIndex}
              placeholder="Enter Icon Classname From Fontawesome"
              elementName="icon"
              handleChange={(e) => handleChange(e, "icon")}
            />
            <TextboxComponent
              component={selectedElement?.link}
              index={selectedIndex}
              placeholder="Enter Page Link"
              elementName="link"
              handleChange={(e) => handleChange(e, "link")}
            />
          </CustomPopup>
        )}
      </>
    );
  }
);

export default React.memo(SidenavbarCom);
