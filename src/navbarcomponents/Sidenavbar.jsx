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

const SidenavbarCom = React.forwardRef(
  (
    {
      navbardata,
      activeCreateButton,
      header,
      logo,
      expandType,
      backgroundColor,
      iconColorClass,
      captionColorClass,
      expandIconColor,
      expandIconDeviderColor,
      searchIconColor,
      expandableTime,
      searchHighlightBackgroundColor,
      collapseButtonColor,
      saveNewData,
    },
    ref
  ) => {
    const [navData, setNavData] = React.useState([...navbardata]);
    const [srchData, setsrchData] = React.useState("");
    const [filterData, setFilterData] = React.useState([]);
    const [openNav, setOpenNav] = React.useState(activeCreateButton);
    const [isPopupOpen, setIsPopupOpen] = React.useState(false);
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
            style={{ display: "flex", width: "100%" }}
          >
            {/* list icon */}
            <span
              className={iconColorClass}
              style={{ width: "10%", textAlign: "left" }}
            >
              <div dangerouslySetInnerHTML={{ __html: e?.icon }}></div>
            </span>
            {/* list name */}
            {openNav && (
              <span
                className={captionColorClass}
                style={{
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
                    backgroundColor: searchHighlightBackgroundColor,
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
                style={{ width: "10%", textAlign: "right" }}
                className={captionColorClass}
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
                style={{ width: "10%", textAlign: "right" }}
                className={captionColorClass}
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
                style={{ width: "10%", textAlign: "right" }}
                className={captionColorClass}
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
                style={{ width: "10%", textAlign: "right" }}
                className={captionColorClass}
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
                className={captionColorClass}
                style={{
                  width: activeCreateButton ? "10%" : "20%",
                  textAlign: "right",
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
      transition: `${expandableTime}`,
      zIndex: 1,
      position: "absolute",
      display: "flex"
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

    // send states to parent
    React.useImperativeHandle(ref, () => ({
      isNavbarOpen: () => {
        return openNav;
      },
      newNavData: () => {
        return navData;
      },
    }));

    React.useEffect(() => {
      console.log(navData);
    }, [navData]);

    return (
      <>
        {/* sidebar */}
        <div
          className={
            openNav ? "sidenav openSidenavWidth" : "sidenav closeSidenavWidth"
          }
          onMouseEnter={() => {
            expandType === "hover" && setOpenNav(true);
          }}
          onMouseLeave={() => {
            expandType === "hover" && setOpenNav(false);
            expandType === "hover" && setsrchData("");
          }}
          style={sidenavStyle()}
        >
          <div
            style={{
              width: "100%",
              backgroundColor: backgroundColor,
              paddingRight: "2px"
            }}
          >
            <div>
              {/* expand Icon */}
              <div
                className="expandIconSize"
                style={{
                  textAlign: "center",
                  cursor: "pointer",
                  color: expandIconColor,
                  borderBottom: `1px solid`,
                  borderBottomColor: expandIconDeviderColor,
                }}
              >
                {header === "logo" ? (
                  <img
                    className="logoSize"
                    style={{ borderRadius: "50%", margin: "5px" }}
                    src={logo}
                    alt="error!"
                  />
                ) : header === "normal" ? (
                  <span
                    onClick={() => {
                      expandType === "click" && setOpenNav(!openNav);
                    }}
                  >
                    &#9776;
                  </span>
                ) : (
                  <p></p>
                )}
              </div>
              {/* search Icon / dnd btn / save btn */}
              {openNav ? (
                <div className="input-group my-2" style={{ height: "25px" }}>
                  {/* search Icon */}
                  <input
                    autoFocus
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
                  {/* create btn */}
                  {activeCreateButton && (
                    <span
                      data-bs-toggle="tooltip"
                      data-bs-placement="right"
                      title="Create Sidebar"
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
                    color: searchIconColor,
                  }}
                  onClick={() => setOpenNav(true)}
                >
                  <i className="fa-solid fa-search"></i>
                </div>
              )}
            </div>
            {/* side bar data */}
            <div
              style={{
                padding: activeCreateButton
                  ? "5px 10px 0px 15px"
                  : "5px 10px 0px 15px",
              }}
            >
              {filterData.length === 0
                ? Listmap(navData, {})
                : Listmap(filterData, {})}
            </div>
          </div>
          {/* collapse on/off btn */}
          {expandType === "click" && (
            <span
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title={activeCreateButton ? "Create Mode Off To Collapse" : ""}
              style={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                color: collapseButtonColor,
              }}
            >
              <i
                onClick={() =>
                  expandType === "click" &&
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
        {isPopupOpen && (
          <CustomPopup setIsPopupOpen={setIsPopupOpen}>
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
