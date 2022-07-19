import * as React from 'react';
import {
    Box,
    Tabs,
    Tab,
    Button,
    Avatar
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch } from '../app/hooks';
import { logout } from '../slices/authSlice';
import { User } from '../constants';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

export default function NavTabs({ user }: { user: User }) {
    const [value, setValue] = React.useState(0);
    const location = useLocation();
    const navigate = useNavigate();

    React.useEffect(() => {
        if(location.pathname === '/') {
            setValue(0)
        }else if(location.pathname === '/add') {
            setValue(1)
        }else if(location.pathname === '/leaderboard') {
            setValue(2)
        }
    }, [location.pathname])
    const dispatch = useAppDispatch();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <Box sx={{ height: '10%', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Home" to="/" component={NavLink} />
                <Tab label="New Poll" to="/add" component={NavLink} />
                <Tab label="Leader Board" to="/leaderboard" component={NavLink}/>
            </Tabs>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                    sx={{ m: 1, width: 30, height: 30 }}
                    src={user.avatarURL || ''}
                />
                {user.name}
                <Button variant='outlined' sx={{ ml: 2 }} onClick={handleLogout}>Logout &nbsp;<LogoutIcon /></Button>
            </div>
        </Box>
    );
}