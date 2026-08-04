import { Badge, IconButton, List, Toolbar, Typography } from "@mui/material";
import { ChatBubbleOutline, NotificationsOutlined } from "@mui/icons-material";
import { AvatarBox, LanguageSelector } from "molecules";
import { useLocation } from "react-router-dom";
import styles from "./header.module.scss";
// import headerStyle from "../../styles/Header.module.css"
import headerStyle from "styles/Header.module.css"
import { useEffect, useRef, useState } from "react";
import { MENU_ID } from "../../constants";
import NotificationPopup from "components/Notification";
import { useAppDispatch, useAppSelector } from "store/store";

import Top from "components/Top";
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
import { useTranslation } from "react-i18next";
import KeyboardDoubleArrowLeft from '@mui/icons-material/KeyboardDoubleArrowLeft';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from 'theme';
import Image from "components/Image";
import logo from "assets/cii-logo.png";
import logoonly from "assets/logo.png";

interface HeaderProps {
  handleDrawerToggle: () => void;
  open: boolean;
  onToggleDrawer: () => void;
}

const Header = ({ handleDrawerToggle, open, onToggleDrawer }: HeaderProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const currentPath = location.pathname;
  const [Title, setTitle] = useState("");
  const popupRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.authReducer);
  const unreadCount = 0;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // Function to check if the path matches with parameterized route
    const matchRoute = (route: string, path: string) => {
      const routeSegments = route.split("/");
      const pathSegments = path.split("/");

      // Exact match for static segments
      if (routeSegments.length !== pathSegments.length) return false;

      // Compare segments, allowing for parameterized segments
      for (let i = 0; i < routeSegments.length; i++) {
        if (routeSegments[i].startsWith(":")) continue; // Skip parameter segments
        if (routeSegments[i] !== pathSegments[i]) return false;
      }

      return true;
    };

    // Check if the current path matches any route in MENU_ID
    const menu = Object.values(MENU_ID).find((item) => {
      // Exact match for static routes and partial match for parameterized routes
      return item.route === currentPath || matchRoute(item.route, currentPath);
    });

    const currentLabel = menu ? menu.label : "";
    setTitle(currentLabel);
  }, [currentPath]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.upperNavWrapper}>
          <Toolbar sx={{padding:'0px 1rem!important'}}>
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '2rem' }}>
              <div className={headerStyle.logo} style={{ display: 'flex', alignItems: 'center'}}>
                <div className={headerStyle.img_box}>
                  <Image src={open ? logo : logoonly} alt="cii-logo" style={{ width: '6rem', height: '6rem' }} />
                </div>
                <div style={{paddingLeft:'1rem'}}>
                  {open && <span className={headerStyle.logo_text} style={{ color: '#2689aa', fontWeight: 600, fontSize: '2rem' }}>{t('appName')}</span>}
                </div>
              </div>
              {isMobile ? (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ ml: 1 }}
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <IconButton
                  color="inherit"
                  aria-label="toggle drawer"
                  edge="start"
                  onClick={onToggleDrawer}
                  sx={{ ml: 1, transition: 'transform .3s', transform: open ? 'rotate(0deg)' : 'rotate(180deg)' }}
                >
                  <KeyboardDoubleArrowLeft />
                </IconButton>
              )}
            </div>
            <div style={open ? { paddingLeft: '6rem' } : { paddingLeft: '0' }}>
              <Typography
                variant="h4"
              component="h4"
              sx={{
                fontSize: {
                  xs: "2rem",     // mobile
                  sm: "2.6rem",   // small tablets
                  md: "3.4rem",   // desktop
                },
                lineHeight: {
                  xs: "2.6rem",
                  sm: "3.2rem",
                  md: "4.1rem",
                },
                fontWeight: "700",
                color: "#00749b",
              }}
            >
                {t(Title)}
              </Typography>
            </div>
          </Toolbar>

          <List className={styles.listWrapper} sx={{ padding: 0 }}>
            {/* <IconButton>
            <ChatBubbleOutline />
          </IconButton> */}
            <LanguageSelector />
            <Badge
              //color="secondary"
              badgeContent={unreadCount}
              //showZero
              sx={{
                marginRight: "1rem",
                cursor: "pointer",
                "& .MuiBadge-badge": {
                  backgroundColor: "#D8727D",
                  right: "0.5rem",
                  top: "0.5rem",
                  color: "#fff",
                  height: "auto",
                  minWidth: "auto",
                  padding: "0 0.6rem",
                  borderRadius: "50%",
                  fontSize: "1rem",
                  aspectRatio: "1 / 1",
                },
              }}
              //variant="dot"
              onClick={handleClick}
              invisible={Boolean(anchorEl)}>
              <span className={headerStyle.icon}>
                <NotificationsSharpIcon sx={{ color: "#009bab" }} />
              </span>
              {/* <NotificationsOutlined
                sx={{ fontSize: "2.4rem", color: "#787486" }}
              /> */}
            </Badge>

            {Boolean(anchorEl) && (
              <NotificationPopup
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                ref={popupRef}
              />
            )}

            <AvatarBox />
          </List>
        </div>
        <div className={styles.lowerNavWrapper}>
          {/* <Filter />
        <div className={styles.filterWrapper}>
          <DateRange />
          <Button
            variant="contained"
            startIcon={<FilterListOutlined />}
            className={styles.button}
          >
            Filter
          </Button>
        </div> */}
          <div className={styles.left}></div>
          <div className={styles.right}>
            <Top />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;