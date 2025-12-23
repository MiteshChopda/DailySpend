import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect, MouseEvent } from "react";
import Link from "@mui/material/Link";
import type { SvgIconComponent } from "@mui/icons-material";

// icons for pages
import BarChartIcon from "@mui/icons-material/BarChart";
import AddIcon from "@mui/icons-material/Add";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface Page {
  name: string;
  link: string;
  icon: SvgIconComponent;
}

function Navbar() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const openMenu = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = (): void => {
    setAnchorEl(null);
  };

  // simple auth state — adapt to your auth (context, redux, etc.)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    Boolean(localStorage.getItem("token"))
  );

  // keep navbar in sync when token changes (storage events or custom dispatch)
  useEffect(() => {
    const handleStorage = (e: StorageEvent): void => {
      if (e.key === "token") setIsLoggedIn(Boolean(e.newValue));
    };

    const handleAuthEvent = (): void =>
      setIsLoggedIn(Boolean(localStorage.getItem("token")));

    window.addEventListener("storage", handleStorage);
    window.addEventListener("authChange", handleAuthEvent);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("authChange", handleAuthEvent);
    };
  }, []);

  const pages: Page[] = isLoggedIn
    ? [
        { name: "New", link: "/DailySpend/?comp=new", icon: AddIcon },
        {
          name: "Dashboard",
          link: "/DailySpend/?comp=dashboard",
          icon: BarChartIcon,
        },
        {
          name: "Profile",
          link: "/DailySpend/?comp=profile",
          icon: AccountCircleIcon,
        },
      ]
    : [
        {
          name: "Login",
          link: "/DailySpend/?comp=login",
          icon: LoginIcon,
        },
        {
          name: "Register",
          link: "/DailySpend/?comp=register",
          icon: PersonAddIcon,
        },
      ];

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo / Title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link underline="hover" color="inherit" href="/DailySpend/">
            DailySpend
          </Link>
        </Typography>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => {
            const Icon = page.icon;
            return (
              <Link
                key={page.name}
                underline="hover"
                color="inherit"
                href={page.link}
                sx={{ ml: 1 }}
              >
                <Button color="inherit" startIcon={<Icon />}>
                  {page.name}
                </Button>
              </Link>
            );
          })}
        </Box>

        {/* Mobile Menu Button */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            color="inherit"
            onClick={openMenu}
            aria-controls={anchorEl ? "nav-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl)}
            aria-label="open navigation menu"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="nav-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeMenu}
          >
            {pages.map((page) => {
              const Icon = page.icon;
              return (
                <MenuItem key={page.name} onClick={closeMenu}>
                  <Link
                    underline="hover"
                    color="inherit"
                    href={page.link}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Icon />
                    {page.name}
                  </Link>
                </MenuItem>
              );
            })}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

