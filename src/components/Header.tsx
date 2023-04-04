import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
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
import Link from "next/link";
import * as React from "react";

import { isUserInRole } from "@/util/roleRetriver";

function getHeaderButtons(user: UserProfile | undefined, isAdmin: boolean) {
  if (user && isAdmin) {
    return (
      <>
        <Button
          href="/admin/elections"
          sx={{ my: 2, color: "white", display: "block" }}
        >
          Elections
        </Button>
        <Button
          href="/admin/candidates"
          sx={{ my: 2, color: "white", display: "block" }}
        >
          Candidates
        </Button>
        <Button
          href="/admin/parties"
          sx={{ my: 2, color: "white", display: "block" }}
        >
          Parties
        </Button>
        <Button
          href="/admin/users"
          sx={{ my: 2, color: "white", display: "block" }}
        >
          Users
        </Button>
      </>
    );
  } else if (user && !isAdmin) {
    return (
      <>
        <Button sx={{ my: 2, color: "white", display: "block" }}>Vote</Button>
      </>
    );
  } else {
    return (
      <>
        <Button
          sx={{ my: 2, color: "white", display: "block" }}
          href="/api/auth/login"
        >
          Login
        </Button>
      </>
    );
  }
}

function getSmallerHeaderMenuItems(
  user: UserProfile | undefined,
  isAdmin: boolean
) {
  if (user && isAdmin) {
    return (
      <>
        <MenuItem>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            href="/admin/elections"
          >
            <Typography textAlign="center">Elections</Typography>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            href="/admin/candidates"
          >
            <Typography textAlign="center">Candidates</Typography>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            href="/admin/parties"
          >
            <Typography textAlign="center">Parties</Typography>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            href="/admin/users"
          >
            <Typography textAlign="center">Users</Typography>
          </Link>
        </MenuItem>
      </>
    );
  } else if (user && !isAdmin) {
    return (
      <>
        <MenuItem>
          <Typography textAlign="center">Vote</Typography>
        </MenuItem>
      </>
    );
  } else {
    return (
      <>
        <MenuItem>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            href="/api/auth/login"
          >
            <Typography textAlign="center">Login</Typography>
          </Link>
        </MenuItem>
      </>
    );
  }
}

export default function Header() {
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

  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const isAdministrator = isUserInRole(user, "Administrator");

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HowToVoteIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SAIKETSU
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
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {getSmallerHeaderMenuItems(user, isAdministrator)}
            </Menu>
          </Box>
          <HowToVoteIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
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
            SAIKETSU
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {getHeaderButtons(user, isAdministrator)}
          </Box>

          {user && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    src={
                      user.picture
                        ? user.picture
                        : "/static/images/avatar/2.jpg"
                    }
                  />
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
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    href="/account"
                  >
                    <Typography textAlign="center">Account</Typography>
                  </Link>
                </MenuItem>

                <MenuItem onClick={handleCloseUserMenu}>
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    href="/api/auth/logout"
                  >
                    <Typography textAlign="center">Logout</Typography>
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
