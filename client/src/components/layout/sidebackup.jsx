import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  VillaOutlined,
  CommentOutlined,
  Payment,
  Groups2Outlined,
  CalendarMonthOutlined,
} from "@mui/icons-material";

const menuItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Projects",
    icon: null,
  },
  {
    text: "Projects",
    icon: <VillaOutlined />,
  },
  {
    text: "Reports",
    icon: <CommentOutlined />,
  },
  {
    text: "Invoices",
    icon: <Payment />,
  },
  {
    text: "Partners",
    icon: <Groups2Outlined />,
  },
  {
    text: "Schedule",
    icon: <CalendarMonthOutlined />,
  },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          anchor="left"
          variant="permanent"
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              borderWidth: 0,
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="70px"
              sx={{ backgroundColor: "#000000" }}
            >
              <Link to="/">
                <img src="/finesse.svg" alt="Finesse" width="130px" />
              </Link>
            </Box>
            <List>
              {menuItems.map(({ text, icon }, index) => {
                if (!icon) {
                  return (
                    <Divider
                      key={`divider-${index}`}
                      sx={{ m: "2.25rem 0 1rem 0rem" }}
                    >
                      <Typography key={`divider-text-${index}`}>
                        {text}
                      </Typography>
                    </Divider>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={`listitem-${index}`} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          minWidth: "35px",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
