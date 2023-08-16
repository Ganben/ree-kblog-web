import React from "react";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { signOut, useSession } from 'next-auth/react';
import { AppBar, Container, Avatar, Button, Grid, IconButton, Toolbar, Tooltip, Typography, Tabs, Box, Menu } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import MenuItem from '@mui/material/MenuItem';
import PageLoader from "next/dist/client/page-loader";

const pages = ['drafts', 'pricing', 'blog'];
const settings = ['Profile', 'Create', 'Dashboard', 'Logout'];
// const userApi = ['Profile', 'Account', 'Drafts', 'auth/logout']
const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  // build user menu/selection/actions
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  // nav menu click
  const handleNavMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    page: string,
  ) => {
    router.push("/" + page);
  }



  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  // setting menu click
  const handelUserMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    setSelectedIndex(index);
    // setAnchorElUser(null);
    // router.push("/"+settings[index]);
    if (settings[index] == "Logout") {
      signOut();
    };

    if (settings[index] == "Create") {
      router.push("/create");
    };
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };



  let left = (
    <div className="left">
      <Link href="/">
        <a className="bold" data-active={isActive("/")}>
          Feed
        </a>
      </Link>
      <style jsx>{`
        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          color: #000;
          display: inline-block;
        }

        .left a[data-active="true"] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );

  let right = null;

  if (status === 'loading' ) {
    left = (
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive('/')}>
            Feed
          </a>
        </Link>
        <style jsx>{`
        .bold {
          font-weight: bold;
        }
        a {
          text-decoration: none;
          color: var(--geist-foreground);
          display: inline-block;
        }

        .left a[data-active='true] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }
        `}</style>
      </div>

    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
        <style jsx>{`
        .right {
          margin-left: auto;
        }
        `}</style>
      </div>
    );

  }

  if (!session) {
    // right = (
    //   <div className="right">
    //     <Link href="/api/auth/signin">
    //       <a data-active={isActive('/signup')}>Login</a>
    //     </Link>
    //     <style jsx>{`
    //       a {
    //         text-decoration: none;
    //         color: var(--geist-foreground);
    //         display: inline-block;
    //       }

    //       a + a {
    //         margin-left: 1rem;
    //       }

    //       .right {
    //         margin-left: auto;
    //       }

    //       .right a {
    //         border: 1px solid var(--geist-foreground);
    //         padding: 0.5rem 1rem;
    //         border-radius: 3px;
    //       }
    //     `} </style>
    //   </div>
    // );
    right = (
    <Button 
    href="/api/auth/signin"
    color="inherit">
      Login
      </Button>
    )
  }

  if (session) {
    left = (
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive('/')}>
            Feed
          </a>
        </Link>
        <Link href="/drafts">
          <a data-active={isActive('/drafts')}>My drafts</a>
        </Link>
        <style jsx>{`
        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          color: var(--geist-forground);
          display: inline-block;
        }

        .left a[data-active='true'] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }
        `}</style>
      </div>
    );
    // right = (
    //   <div className="right">
    //     <p>
    //       {session.user.name} ({session.user.email})
    //     </p>
    //     <Link href="/create">
    //       <button>
    //         <a>New Post</a>
    //       </button>
    //     </Link>
    //     <button onClick={() => signOut()}>
    //       <a>Log out</a>
    //     </button>
    //     <style jsx>{`
    //     a {
    //       text-decoration: none;
    //       color: var{--geist-foreground};
    //       display: inline-block;
    //     }

    //     p {
    //       display: inline-block;
    //       font-size: 13px;
    //       padding-right: 1rem;
    //     }

    //     a + a {
    //       margin-left: 1rem;
    //     }

    //     .right {
    //       margin-left: auto;
    //     }

    //     .right a {
    //       border: 1px solid var(--geist-foreground);
    //       padding: 0.5rem 1rem;
    //       border-radius: 3px;
    //     }

    //     button {
    //       border: none;
    //     }
    //     `}</style>
    //   </div>
    // );
    //avatar popup menu state
    right = (
      <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
            
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={session.user.name} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem 
                  key={setting}
                  selected={index === selectedIndex}
                  onClick={(event) => handelUserMenuItemClick(event, index)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
    )
  };



  return (
 
    <AppBar color="primary" position="sticky" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: {xs: 'none', md: 'flex'}, mr: 1}}/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: {xs: 'none', md: 'flex'},
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
              OxKowledge Graph
            </Typography>
            <Box sx={{
              flexGrow:1,
              display: {xs: 'flex', md: 'none'}
            }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit">

                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: {xs: 'block', md: 'none'},
                  }}>
                    {pages.map((page) => (
                      <MenuItem key={page} onClick={(event) => handleNavMenuItemClick(event, page)} >
                        <Typography 
                         component="a"
                         textAlign="center">{page}
                         </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
            </Box>
            <AdbIcon sx={{ 
              display: {xs: 'flex', md: 'none'}, mr: 1
            }}/>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: {xs: 'flex', md: 'none'},
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}>
                OxKowledge
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={(event) => handleNavMenuItemClick(event, page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {right}
        </Toolbar>
      </Container>

    </AppBar>
 
  );
};

export default Header;
