import AdbIcon from "@mui/icons-material/Adb";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import * as React from "react";
import Swal from "sweetalert2";

const pages = ["Home", "Pricing", "Footer"];
const settings = [
  { name: "Profile" },
  {
    name: "Logout",
    link: () => {
      Swal.fire({
        title: `Apakah kamu yakin ingin logout?`,
        showCancelButton: true,
        confirmButtonText: "Iya, saya yakin",
        confirmButtonColor: "#d32f2f",
        cancelButtonColor: "#9e9e9e",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("user");
          localStorage.removeItem("userID");

          Swal.fire("Logout Berhasil", "", "success");

          window.location.href = "/login";
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    },
  },
];

function ResponsiveAppBar() {
  const [isLogin, setIsLogin] = React.useState<string | null>(null);

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLogin(user);
  }, []);

  const router = useRouter();
  const handleLogin = () => {
    router.push("/login");
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [isTop, setIsTop] = React.useState(true);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // jalankan saat mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const scrollPosition = window.scrollY === 0 ? "transparent" : "#5D87FF";

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: isTop ? "white" : "transparent",
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AllInboxIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              color: isTop ? "#5D87FF" : "white",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: isTop ? "#5D87FF" : "white",
              textDecoration: "none",
            }}
          >
            DataKu
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              bgcolor: "transparent",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: isTop ? "#5D87FF" : "white",
                  display: "block",
                  fontWeight: "bold",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {isLogin ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/user.png" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.name}
                    onClick={() => {
                      handleCloseUserMenu(); // Close the menu first
                      if (setting.link) {
                        setting.link(); // Execute the link function if it exists
                      }
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {setting.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Button
              onClick={handleLogin}
              variant={isTop ? "contained" : "outlined"}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                fontWeight: "bold",
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
