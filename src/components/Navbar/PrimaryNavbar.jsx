import React, { useState } from "react";
import { Link } from "react-router-dom";
// icons
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
// components
import { Avatar, Divider, Badge } from "@mui/material";
import logo from "../../assets/logo/logo.svg";
function PrimaryNavbar() {
  const [toggle, setToggle] = useState(false);

  const [notificationCount, setNotificationCount] = useState(11);

  return (
    <nav dir="rtl" className="flex flex-row items-center mx-2   my-2">
      <div className="flex flex-row items-center">
        <Link to={"/"}>
          <img src={logo} />{" "}
        </Link>
      </div>
      <div className="flex items-center gap-x-5 mr-auto">
        <Badge
          color="primary"
          badgeContent={notificationCount}
          max={10}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <NotificationsNoneOutlinedIcon
            fontSize="large"
            className="text-gray-600 cursor-pointer"
          />
        </Badge>
        <div className="relative ml-4">
          <Avatar
            className="cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
          <div
            className={`absolute -left-4 top-16 bg-secondary w-[225px] z-10 rounded-xl ${
              toggle ? "block" : "hidden"
            }`}
          >
            <nav>
              <div className="flex items-center gap-x-2 p-3">
                <Avatar />
                <div>
                  <p>آرین خلقی</p>
                  <span className="text-xs">موجودی: ۰ ریال</span>
                </div>
              </div>
              <ul>
                <li className="flex gap-x-2 transition-all hover:bg-primary p-3 cursor-pointer">
                  <DashboardOutlinedIcon /> داشبورد
                </li>
                <Divider />
                <li className="flex gap-x-2 transition-all hover:bg-primary p-3 cursor-pointer">
                  <InsertDriveFileOutlinedIcon /> فرم های من
                </li>
                <Divider />
                <li className="flex gap-x-2 transition-all hover:bg-primary cursor-pointer text-red-600 p-3">
                  <LogoutOutlinedIcon color="error" /> خروج
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default PrimaryNavbar;
