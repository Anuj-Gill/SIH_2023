import { useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
// icons
import TableChartIcon from "@mui/icons-material/TableChart";
import PublicIcon from "@mui/icons-material/Public";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SchoolIcon from "@mui/icons-material/SchoolRounded";
import ManageAccountsIcon from "@mui/icons-material/ManageAccountsRounded";

import DashboardIcon from "@mui/icons-material/DashboardRounded";
import ApartmentIcon from "@mui/icons-material/ApartmentRounded";
import BusinessIcon from "@mui/icons-material/BusinessRounded";
import PostAddIcon from "@mui/icons-material/PostAddRounded";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PendingActionsIcon from "@mui/icons-material/PendingActionsRounded";
import CheckCircleIcon from "@mui/icons-material/CheckCircleRounded";
import StickyNoteIcon from "@mui/icons-material/StickyNote2Rounded";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";

const role = "super-admin";
// const role = "ugc-admin"
// const role = "org-admin";
// const role = "dept-admin";
// const role = "hei-admin";

const heiRoles = ["hei-admin", "hei-spoc", "university-admin"];

export const mainListItems = (
  <>
    {(role === "super-admin" || role === "ugc-admin") && (
      <>
        <ListButton icon={<DashboardIcon />} title="Dashboard" />
        <DropdownListButton
          icon={<TableChartIcon />}
          title="Base Tables"
          subMenus={[
            {
              id: 1,
              icon: <PublicIcon />,
              title: "Countries",
              link: "/dashboard/base_tables/countries",
            },
            {
              id: 2,
              icon: <LocationCityIcon />,
              title: "States",
              link: "/dashboard/base_tables/states",
            },
            {
              id: 3,
              icon: <HouseSidingIcon />,
              title: "Districts",
              link: "/dashboard/base_tables/districts",
            },
            {
              id: 4,
              icon: <LibraryBooksIcon />,
              title: "Streams",
              link: "/dashboard/base_tables/streams",
            },
            {
              id: 5,
              icon: <SchoolIcon />,
              title: "Universities",
              link: "/dashboard/base_tables/universities",
            },
            {
              id: 6,
              icon: <ManageAccountsIcon />,
              title: "Roles",
              link: "/dashboard/base_tables/roles",
            },
          ]}
        />
        <ListButton icon={<ApartmentIcon />} title="Organizations" link="/dashboard/organisations" />
        <ListButton icon={<BusinessIcon />} title="Departments" link="/dashboard/departments" />
        <ListButton icon={<PeopleIcon />} title="Users" link="/dashboard/users" />
        <ListButton icon={<SchoolIcon />} title="Colleges" link="/dashboard/colleges" />
      </>
    )}

    {role === "org-admin" && (
      <>
        <ListButton icon={<DashboardIcon />} title="Dashboard" />
        <ListButton icon={<BusinessIcon />} title="Departments" link="/dashboard/departments" />
      </>
    )}

    {role === "dept-admin" && (
      <>
        <ListButton icon={<DashboardIcon />} title="Dashboard" />
      </>
    )}

    {heiRoles.includes(role) && (
      <>
        <ListButton icon={<DashboardIcon />} title="Dashboard" link="/dashboard/hei" />
        <ListButton icon={<PostAddIcon />} title="File Grievance" link="/dashboard/hei/grievances/file" />
      </>
    )}
  </>
);

export const secondaryListItems = (
  <>
    {!heiRoles.includes(role) && (
      <>
        <DropdownListButton
          icon={<StickyNoteIcon />}
          title="Competitions"
          subMenus={[
            {
              id: 1,
              icon: <ArticleOutlinedIcon />,
              title: "All Competitions",
              link: "/dashboard/hei/grievances/all",
            },
            {
              id: 2,
              icon: <PendingActionsIcon />,
              title: "Pendig ",
              link: "/dashboard/hei/grievances/pending",
            },
            {
              id: 3,
              icon: <CheckCircleIcon />,
              title: "Resolved ",
              link: "/dashboard/hei/grievances/resolved",
            },
          ]}
        />
      </>
    )}
    {heiRoles.includes(role) && (
      <>
        <ListButton icon={<ArticleOutlinedIcon />} title="All Grievances" link="/dashboard/hei/grievances/all" />
        <ListButton icon={<PendingActionsIcon />} title="Pending Grievances" link="/dashboard/hei/grievances/pending" />
        <ListButton icon={<CheckCircleIcon />} title="Resolved Grievances" link="/dashboard/hei/grievances/resolved" />
      </>
    )}
  </>
);

// Menu Item Component
function ListButton({ icon, title, link }) {
  const navigate = useNavigate();
  const handleClick = () => navigate(link);
  return (
    <ListItemButton onClick={handleClick}>
      <ListItemIcon sx={{ minWidth: "45px" }}>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  );
}

// Menu Item Component with Dropdown
function DropdownListButton({ icon, title, subMenus }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => setOpen(!open);
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon sx={{ minWidth: "45px" }}>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLess color="action" /> : <ExpandMore color="action" />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {subMenus.map((submenu) => (
          <List component="div" disablePadding key={submenu.id} onClick={() => navigate(submenu.link)}>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "45px" }}>{submenu.icon}</ListItemIcon>
              <ListItemText primary={submenu.title} />
            </ListItemButton>
          </List>
        ))}
        <Divider sx={{ my: 1 }} />
      </Collapse>
    </>
  );
}
