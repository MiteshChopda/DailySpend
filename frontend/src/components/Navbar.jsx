
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Link from '@mui/material/Link';

// icons for pages
import BarChartIcon from '@mui/icons-material/BarChart';
import AddIcon from '@mui/icons-material/Add';

// TO ADD MORE PAGES ADD A NEW ITEM IN THIS LIST:
const pages = [
    {
        "name": "New",
        "link": "/DailySpend/?comp=new",
        "icon": AddIcon
    },
    {
        "name": "Dashboard",
        "link": "/DailySpend/?comp=dashboard",
        "icon": BarChartIcon
    },
];

function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                {/* Logo / Title */}
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Link underline="hover" color="primary.white" href="/DailySpend/?comp=new">DailySpend</Link>
                </Typography>

                {/* Desktop Menu */}
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                    {pages.map((page) => (
                        <Button
                            key={page.name}
                            color="inherit">
                            <Link underline="hover" color="primary.white" href={page.link}>
                                {<page.icon />}
                            </Link>
                        </Button>
                    ))}
                </Box>

                {/* Mobile Menu Button */}
                <Box sx={{ display: { xs: "flex", md: "none" } }}>
                    <IconButton color="inherit" onClick={openMenu}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={closeMenu}
                    >
                        {pages.map((page) => (
                            <MenuItem key={page.name} onClick={closeMenu}>
                                <Link underline="hover" href={page.link}>
                                    {<page.icon />}
                                </Link>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
