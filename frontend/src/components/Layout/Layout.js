import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MapIcon from '@mui/icons-material/Map';
import { useLocation } from 'react-router-dom';

const SideNav = styled(Box)(({ theme }) => ({
  width: '64px',
  position: 'fixed',
  left: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2, 0),
  zIndex: 1200,
  [theme.breakpoints.down('sm')]: {
    bottom: 'auto',
    width: '100%',
    height: '64px',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: theme.spacing(0, 2),
  },
}));

const MainContent = styled(Box)(({ theme }) => ({
  marginLeft: '64px',
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
  padding: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
    marginTop: '64px',
    padding: theme.spacing(2),
  },
}));

const NavButton = styled(IconButton)(({ theme, active }) => ({
  marginBottom: theme.spacing(2),
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: 0,
  },
}));

const Layout = ({ children }) => {
  const location = useLocation();
  const [activeIcon, setActiveIcon] = React.useState('home');

  React.useEffect(() => {
    // Определяем активную иконку на основе текущего пути
    const path = location.pathname;
    if (path === '/') setActiveIcon('home');
    else if (path.includes('/chat')) setActiveIcon('chat');
    else if (path.includes('/notifications')) setActiveIcon('notifications');
    else if (path.includes('/wallet')) setActiveIcon('wallet');
    else if (path.includes('/map')) setActiveIcon('map');
  }, [location]);

  return (
    <Box sx={{ display: 'flex' }}>
      <SideNav>
        <Box 
          component="img" 
          src="/logo.png" 
          alt="Logo"
          sx={{ 
            width: 32, 
            height: 32, 
            mb: { xs: 0, sm: 4 },
            mr: { xs: 0, sm: 0 },
          }}
        />
        
        <NavButton 
          active={activeIcon === 'home'}
          onClick={() => setActiveIcon('home')}
        >
          <HomeIcon />
        </NavButton>
        
        <NavButton 
          active={activeIcon === 'chat'}
          onClick={() => setActiveIcon('chat')}
        >
          <ChatIcon />
        </NavButton>
        
        <NavButton 
          active={activeIcon === 'notifications'}
          onClick={() => setActiveIcon('notifications')}
        >
          <NotificationsIcon />
        </NavButton>
        
        <NavButton 
          active={activeIcon === 'wallet'}
          onClick={() => setActiveIcon('wallet')}
        >
          <AccountBalanceWalletIcon />
        </NavButton>
        
        <NavButton 
          active={activeIcon === 'map'}
          onClick={() => setActiveIcon('map')}
        >
          <MapIcon />
        </NavButton>
      </SideNav>
      
      <MainContent>
        {children}
      </MainContent>
    </Box>
  );
};

export default Layout;
