import {
  GTranslate,
} from "@mui/icons-material";
import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { IMENU_ID } from "types";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import GroupIcon from '@mui/icons-material/Group';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import ElectricMeterIcon from '@mui/icons-material/ElectricMeter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CastIcon from '@mui/icons-material/Cast';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MoneyIcon from '@mui/icons-material/Money';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import InventoryIcon from '@mui/icons-material/Inventory';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import PreviewIcon from '@mui/icons-material/Preview';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

export const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} placement="bottom" classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "559",
    color: "rgba(255,255,255)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));


export const MENU_ID: IMENU_ID = {
  PROFILE: {
    route: "/profile",
    menuId: 0,
    label: "pageTitles.profile",
    showInRole: false,
  },
  DASHBOARD: {
    route: "/",
    menuId: 1,
    label: "pageTitles.dashboard",
    showInRole: true,
  },
  TENANTS: {
    route: "/tenants",
    menuId: 2,
    label: "pageTitles.tenants",
    showInRole: false,
  },
  TENANT_USERS: {
    route: "/tenant-users",
    menuId: 3,
    label: "pageTitles.tenantUsers",
    showInRole: true,
  },
  ROLES: {
    route: "/roles",
    menuId: 5,
    label: "pageTitles.roles",
    showInRole: true,
  },
  WORKFLOW: {
    route: "/workflow",
    menuId: 31,
    label: "pageTitles.workflow",
    showInRole: true,
  },
  USAGE_REPORT: {
    route: "/usage-report",
    menuId: 6,
    label: "pageTitles.usageReport",
    showInRole: false,
  },
  APPOINTMENT: {
    route: "/Appointment",
    menuId: 7,
    label: "pageTitles.appointments",
    showInRole: true,
  },
  TELEHEALTH: {
    route: "/telehealth",
    menuId: 19,
    label: "pageTitles.teleHealth",
    showInRole: true,
  },
  PATIENTLIST: {
    route: "/patientList",
    menuId: 30,
    label: "pageTitles.patientList",
    showInRole: true,
  },
  STAFFSCHEDULE: {
    route: "/staffSchedule",
    menuId: 20,
    label: "pageTitles.staffSchedule",
    showInRole: true,
  },
  BILLING: {
    route: "/billing",
    menuId: 21,
    label: "pageTitles.billings",
    showInRole: true,
  },
  APPSETTING: {
    route: "/appSetting",
    menuId: 22,
    label: "pageTitles.appSettings",
    showInRole: true,
  },
  STAFF: {
    route: "/staff",
    menuId: 23,
    label: "pageTitles.staff",
    showInRole: true,
  },
  INVENTORY: {
    route: "/inventory",
    menuId: 24,
    label: "pageTitles.inventory",
    showInRole: true,
  },
  REWARDS: {
    route: "/rewards",
    menuId: 25,
    label: "pageTitles.rewards",
    showInRole: true,
  },
  MARKETING: {
    route: "/marketing",
    menuId: 26,
    label: "pageTitles.marketing",
    showInRole: true,
  },
  MARKETING_DASHBAORD: {
    route: "/marketing/dashboard",
    menuId: 31,
    label: "pageTitles.dashboard",
    showInRole: true,
  },
  FACILITIES: {
    route: "/facilities",
    menuId: 32,
    label: "pageTitles.facilities",
    showInRole: true,
  },
  SOLOMON: {
    route: "/solomon",
    menuId: 27,
    label: "pageTitles.solomonAi",
    showInRole: true,
  },
  REVIEW: {
    route: "/review",
    menuId: 28,
    label: "pageTitles.patientReviews",
    showInRole: true,
  },
  MYTASK: {
    route: "/mytask",
    menuId: 29,
    label: "pageTitles.myTask",
    showInRole: true,
  }
};

export const SideMenu = [
  {
    icon: <DashboardIcon sx={{ color: '#fff' }} />,
    text: "pageTitles.dashboard",
    link: `${MENU_ID.DASHBOARD.route}`,
    menuId: `${MENU_ID.DASHBOARD.menuId}`,
    activeIcon: <DashboardIcon color="primary" />,
  },  
  {
    icon: <CalendarMonthIcon sx={{ color: '#fff' }} />,
    text: "pageTitles.appointments",
    link: `${MENU_ID.APPOINTMENT.route}`,
    menuId: `${MENU_ID.APPOINTMENT.menuId}`,
    activeIcon: <CalendarMonthIcon color="primary" />,
  },
  {
    icon: <AccessibilityNewIcon sx={{ color: '#fff' }} />,
    text: "pageTitles.patientList",
    link: `${MENU_ID.PATIENTLIST.route}`,
    menuId: `${MENU_ID.PATIENTLIST.menuId}`,
    activeIcon: <AccessibilityNewIcon color="primary" />,
  },
  {
    icon: <CastIcon sx={{ color: '#fff' }} />,
    text: "pageTitles.teleHealth",
    link: `${MENU_ID.TELEHEALTH.route}`,
    menuId: `${MENU_ID.TELEHEALTH.menuId}`,
    activeIcon: <CastIcon color="primary" />,
  }, {
    icon: <LiveHelpIcon sx={{ color: '#fff' }} />,
    text: "pageTitles.solomonAi",
    link: `${MENU_ID.SOLOMON.route}`,
    menuId: `${MENU_ID.SOLOMON.menuId}`,
    activeIcon: <LiveHelpIcon color="primary" />,
  },
  
  {
    icon: <AssignmentIndIcon sx={{ color: '#fff' }} />,
    text: "pageTitles.staff",
    menuId: "71",
    subMenu: [
      {
        icon: <Diversity3Icon sx={{ color: '#fff' }} />,
        text: "pageTitles.staff",
        link: `${MENU_ID.STAFF.route}`,
        menuId: `${MENU_ID.STAFF.menuId}`,
        activeIcon: <Diversity3Icon color="primary" />,
      },
      {
        icon: <LocalHospitalIcon sx={{ color: '#fff' }} />,
        text: "pageTitles.staffSchedule",
        link: `${MENU_ID.STAFFSCHEDULE.route}`,
        menuId: `${MENU_ID.STAFFSCHEDULE.menuId}`,
        activeIcon: <LocalHospitalIcon color="primary" />,
      },
    ],
  },
  {
    icon: <AppRegistrationIcon sx={{ color: '#fff' }} />,
    text: "pageTitles.workflow",
    link: `${MENU_ID.WORKFLOW.route}`,
    menuId: `${MENU_ID.WORKFLOW.menuId}`,
    activeIcon: <AppRegistrationIcon color="primary" />,
  },
  {
    icon: <AppRegistrationIcon sx={{ color: '#fff' }} />,
    text: "pageTitles.facilities",
    link: `${MENU_ID.FACILITIES.route}`,
    menuId: `${MENU_ID.FACILITIES.menuId}`,
    activeIcon: <AppRegistrationIcon color="primary" />,
  },
  {
    icon: <AssignmentIndIcon sx={{ color: '#fff' }} />,
    text: "pageTitles.userManagement",
    menuId: "18",
    subMenu: [
      {
        icon: <SupervisedUserCircleIcon sx={{ color: '#fff' }} />,
        text: "pageTitles.tenants",
        link: `${MENU_ID.TENANTS.route}`,
        menuId: `${MENU_ID.TENANTS.menuId}`,
        activeIcon: <SupervisedUserCircleIcon color="primary" />,
      },
      {
        icon: <PersonOutlineIcon sx={{ color: '#fff' }} />,
        text: "pageTitles.tenantUsers",
        link: `${MENU_ID.TENANT_USERS.route}`,
        menuId: `${MENU_ID.TENANT_USERS.menuId}`,
        activeIcon: <PersonOutlineIcon color="primary" />,
      },      
      // {
      //   icon: <GroupIcon sx={{ color: '#fff' }}/>,
      //   text: "Admin Users",
      //   link: `${MENU_ID.ADMIN_USERS.route}`,
      //   menuId: `${MENU_ID.ADMIN_USERS.menuId}`,
      //   activeIcon: <GroupIcon color="primary" />,
      // },
      {
        icon: <RecentActorsIcon sx={{ color: '#fff' }} />,
        text: "pageTitles.roles",
        link: `${MENU_ID.ROLES.route}`,
        menuId: `${MENU_ID.ROLES.menuId}`,
        activeIcon: <RecentActorsIcon color="primary" />,
      },
    ],
  },
  // {
  //   icon: <ElectricMeterIcon sx={{ color: '#fff' }} />,
  //   text: "pageTitles.usageReport",
  //   link: `${MENU_ID.USAGE_REPORT.route}`,
  //   menuId: `${MENU_ID.USAGE_REPORT.menuId}`,
  //   activeIcon: <ElectricMeterIcon color="primary" />,
  // },
  
  
  {
    icon: <MoneyIcon sx={{ color: '#fff' }} />,
    text: "pageTitles.billings",
    link: `${MENU_ID.BILLING.route}`,
    menuId: `${MENU_ID.BILLING.menuId}`,
    activeIcon: <MoneyIcon color="primary" />,
  },{
    icon: <InventoryIcon sx={{ color: '#fff' }} />,
    text: "pageTitles.inventory",
    link: `${MENU_ID.INVENTORY.route}`,
    menuId: `${MENU_ID.INVENTORY.menuId}`,
    activeIcon: <InventoryIcon color="primary" />,
  },
  

  {
    icon: <AssignmentIndIcon sx={{ color: '#fff' }} />,
    text: "pageTitles.marketing",
    menuId: "71",
    subMenu: [
      {
        icon: <DashboardIcon sx={{ color: '#fff' }} />,
        text: "pageTitles.marketing_dashboard",
        link: `${MENU_ID.MARKETING_DASHBAORD.route}`,
        menuId: `${MENU_ID.MARKETING_DASHBAORD.menuId}`,
        activeIcon: <DashboardIcon color="primary" />,
      }, {
        icon: <StorefrontIcon sx={{ color: '#fff' }} />,
        text: "pageTitles.marketing",
        link: `${MENU_ID.MARKETING.route}`,
        menuId: `${MENU_ID.MARKETING.menuId}`,
        activeIcon: <StorefrontIcon color="primary" />,
      }
    ],
  },


  
  
 ,{
    icon: <PlaylistAddCheckIcon sx={{ color: '#fff' }} />,
    text: "pageTitles.myTaskSidebarTitle",
    link: `${MENU_ID.MYTASK.route}`,
    menuId: `${MENU_ID.MYTASK.menuId}`,
    activeIcon: <PlaylistAddCheckIcon color="primary" />,
  },{
    icon: <PreviewIcon sx={{ color: '#fff' }} />,
    text: "pageTitles.patientReviews",
    link: `${MENU_ID.REVIEW.route}`,
    menuId: `${MENU_ID.REVIEW.menuId}`,
    activeIcon: <PreviewIcon color="primary" />,
  }, 
  {
    icon: <AppSettingsAltIcon sx={{ color: '#fff' }} />,
    text: "pageTitles.appSettings",
    link: `${MENU_ID.APPSETTING.route}`,
    menuId: `${MENU_ID.APPSETTING.menuId}`,
    activeIcon: <AppSettingsAltIcon color="primary" />,
  },
  {
    icon: <EmojiEventsIcon sx={{ color: '#fff' }} />,
    text: "pageTitles.rewards",
    link: `${MENU_ID.REWARDS.route}`,
    menuId: `${MENU_ID.REWARDS.menuId}`,
    activeIcon: <EmojiEventsIcon color="primary" />,
  }
  
];


export const fixedTenantAgentPermission = [
  1,
  3,
  5,
  6,
  8,
  9,
  10,
  11,
  13,
  15,
  18,
  33,
];
export const fixedAgentPermission = [
  3, //tenant users
  5, //Role Management
  6, //Usage Report
  13, //Organization
  15, //Scorecard Template
];