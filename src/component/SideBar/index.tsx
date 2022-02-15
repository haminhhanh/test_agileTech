import React, { useState } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function SideBar() {
  const [isShowSideBar, setIsShowSideBar] = useState(false);
  const onShowSideBar = () => {
    setIsShowSideBar(!isShowSideBar);
  };
  return (
    <div className="sideBarWrapper">
      <div className="sideBarHeader">
        <button onClick={onShowSideBar}>
          <FontAwesomeIcon
            icon={faBars}
            size="lg"
            className="iconMenu"
            color={isShowSideBar ? "#999e99" : "black"}
          />
        </button>
      </div>
      <div
        className={isShowSideBar ? "sideBarContentActive" : "sideBarContent"}
      >
        <ul>
          <li>
            <a href="https://react-hook-form.com/">Home</a>
          </li>
          <li>
            <a href="https://react-hook-form.com/">About</a>
          </li>
          <li>
            <a href="https://react-hook-form.com/">Pages</a>
          </li>
          <li>
            <a href="https://react-hook-form.com/">Portoilo</a>
          </li>
          <li>
            <a href="https://react-hook-form.com/">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
