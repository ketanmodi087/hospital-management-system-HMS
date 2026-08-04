import React, { forwardRef, useEffect, useState } from "react";
import styles from "./notification.module.scss";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Popper,
  Skeleton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  CallAssignedIcon,
  CallCommentIcon,
  CallCompletedIcon,
  CallRejectedIcon,
} from "Icons";
import {
  Notifications as NotificationsIcon,
  EventAvailable as EventAvailableIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  Refresh as RefreshIcon,
  HourglassEmpty as HourglassEmptyIcon,
  Clear as ClearIcon,
} from "@mui/icons-material"
import { useAppDispatch, useAppSelector } from "store/store";
import { Notification } from "types";

import { hideModal, showModal } from "store/slice/modalSlice";
import { setActiveTab } from "store/slice/userNotificationList";
import { useTranslation } from "react-i18next";


type NotificationPopupProps = {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
};

const status = [
  { label: "All", value: "all" },
  { label: "Rejected", value: "rejected" },
  { label: "Reopened", value: "reopened" },
  { label: "Assigned", value: "assigned" },
  { label: "Comment", value: "comment" },
];

const statusIconMap = {
  rejected: { icon: CallRejectedIcon, title: "Call Score Rejected" },
  reopened: { icon: CallCompletedIcon, title: "Call Reopened" },
  assigned: { icon: CallAssignedIcon, title: "Call Assigned" },
  comment: { icon: CallCommentIcon, title: "Comment Added" },
};

type StatusIconMap = typeof statusIconMap;
type StatusKey = keyof StatusIconMap;

const NotificationPopup = forwardRef<HTMLDivElement, NotificationPopupProps>(
  ({ anchorEl, open, onClose }, ref) => {
    const { t } = useTranslation();
    const id = open ? "notification-popover" : undefined;
    const dispatch = useAppDispatch();
    const {
      notificationListList,
      activeTab,
      loading,
      // unreadCount,
      // lastEvaluatedKey,
      // isPaginationLoading,
      // hasMore,
      // notificationLimit,
    } = useAppSelector((state: any) => state.notificationListSlice);
    const [tabValue, setTabValue] = useState(0);
     const [read, setRead] = useState<any>({})
    const [isFetching, setIsFetching] = useState(false);
    const { userData } = useAppSelector((state) => state.authReducer);
    const tenantData = JSON.parse(localStorage.getItem("tenantId") || "{}");

    const markAsRead = (id:any) => {
      setRead((prev:any) => ({ ...prev, [id]: true }))
    }
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      const newLabel = status[newValue].label;
      console.log("newLabel ", newLabel);
      console.log("newValue ", newValue);
      dispatch(setActiveTab(newLabel))
      setTabValue(newValue)
      
    };

    const filteredNotifications = notificationListList.filter((notification:any) => {
      if (tabValue === 0) return true; // All
      if (tabValue === 1) return notification.status === "rejected"; // Rejected
      if (tabValue === 2) return notification.status === "completed"; // Reopen
      if (tabValue === 3) return notification.status === "assigned"; // Assigned
      if (tabValue === 4) return notification.status === "comment"; // Comment
      return false;
    });



    // const notReadNotifications = notifications.filter(
    //   (notification: Notification) => notification.seen === false
    // );
    const notReadNotifications = []

    const handleNotificationClick = (notification: Notification) => {      
      onClose();
    };

    const getStatusIcon = (status: StatusKey) => statusIconMap[status];

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      
    };
    const statusColors:any = {
      assigned: "#0277bd", // blue
      rejected: "#d32f2f", // red
      completed: "#388e3c", // green
      reopened: "#f57c00", // orange
      pending: "#9e9e9e", // grey
    }
    // Status icon mapping
    const StatusIcon = ({ status }:any) => {
      switch (status) {
        case "assigned":
          return <EventAvailableIcon />
        case "rejected":
          return <CancelIcon />
        case "completed":
          return <CheckCircleIcon />
        case "reopened":
          return <RefreshIcon />
        case "pending":
          return <HourglassEmptyIcon />
        default:
          return <EventAvailableIcon />
      }
    }
    const getStatusLabel = (status:any) => {
      return status.charAt(0).toUpperCase() + status.slice(1)
    }
  
    return (
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        disablePortal
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 8], // Adjust the offset to space the box from the icon
            },
          },
        ]}
        style={{ zIndex: 1300 }}
        ref={ref}
      >
        <Paper
          sx={{
            width: "90rem",
            maxHeight: "59.4rem",
            //height: "59.4rem",
            padding: 0,
            boxShadow: "0px 9px 24px 0px #0F0F0F33",            
          }}
          onScroll={handleScroll}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ padding: "1rem 1.5rem" }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: "1.7rem",
                lineHeight: "2rem",
                color: "#44444F",
              }}
            >
              Notifications List
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>          
           <List sx={{ width: "100%", bgcolor: "background.paper", p: 0, maxHeight: "59.4rem", overflowY: "auto" }}>
            {filteredNotifications.map((appointment:any, index:any) => (
              <React.Fragment key={appointment.id}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    py: 2,
                    px: 3,
                    bgcolor: read[appointment.id] ? "inherit" : "rgba(2, 119, 189, 0.05)",
                    "&:hover": {
                      bgcolor: "rgba(0, 0, 0, 0.04)",
                    },
                    borderLeft: `4px solid ${statusColors[appointment.status]}`,
                  }}
                  onClick={() => markAsRead(appointment.id)}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: statusColors[appointment.status] }}>
                      <StatusIcon status={appointment.status} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: "flex", alignItems: "center", mb: 0.5, justifyContent:"space-between" }}>
                        <Box>
                        <Typography
                          variant="subtitle1"                          
                          sx={{ fontWeight: read[appointment.id] ? 400 : 600 }}
                        >
                          {t(appointment.status).toUpperCase()} - {appointment.doctorName}
                        </Typography>
                        </Box>
                        <Box>
                            <Chip
                              label={t(appointment.status)}
                              size="medium"
                              sx={{
                                ml: 1,
                                height: 35,
                                fontSize: "1.5rem",
                                bgcolor: statusColors[appointment.status],
                                color: "white",
                              }}
                            />
                            {!read[appointment.id] && (
                              <Chip
                                label={t('new')}
                                size="medium"
                                color="primary"
                                sx={{ ml: 1, height: 35, fontSize: "1.5rem" }}
                              />
                            )}
                        </Box>
                      </Box>
                    }
                    secondary={
                      <React.Fragment>
                        <Box sx={{ mb: 1, mt: 1 }}>
                          <Typography  variant="body1" color="text.primary" display="block">
                            Patient: {appointment.patientName}
                          </Typography>
                          <Typography  variant="body1" color="text.primary" display="block">
                            Specialty: {appointment.specialty}
                          </Typography>
                          <Typography  variant="body1" color="text.primary" display="block">
                            Date: {appointment.date} at {appointment.time}
                          </Typography>
                          <Typography  variant="body1" color="text.primary" display="block">
                            Location: {appointment.location}
                          </Typography>
                        </Box>
                        <Typography                        
                          variant="body1"
                          color="text.primary"
                          sx={{
                            display: "block",
                            mt: 1,
                            p: 1,
                            bgcolor: "rgba(0, 0, 0, 0.04)",
                            borderLeft: `3px solid ${statusColors[appointment.status]}`,
                          }}
                        >
                          {appointment.message}
                        </Typography>
                      </React.Fragment>
                    }
                  />                  
                </ListItem>
                {index < filteredNotifications.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
            {filteredNotifications.length === 0 && (
              <ListItem>
                <ListItemText
                  primary="No notifications"
                  secondary="You're all caught up!"
                  sx={{ textAlign: "center", py: 4 }}
                />
              </ListItem>
            )}
          </List>          
        </Paper>
      </Popper>
    );
  }
);

export default NotificationPopup;

const NotificationShimmer = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "2rem",
        padding: "1.5rem",
      }}
    >
      <Skeleton variant="circular" width="4rem" height={"4rem"} />
      <Box sx={{ display: "grid", gap: "0.8rem" }}>
        <Skeleton
          variant="rectangular"
          style={{
            flex: 1,
            width: "auto",
            borderRadius: "0.5rem",
          }}
          height={"2rem"}
        />
        <Skeleton
          variant="rectangular"
          style={{
            flex: 1,
            width: "90%",
            borderRadius: "0.5rem",
          }}
          height={"2rem"}
        />
        <Skeleton
          variant="rectangular"
          style={{
            flex: 1,
            width: "70%",
            borderRadius: "0.5rem",
          }}
          height={"2rem"}
        />
      </Box>
    </Box>
  );
};
