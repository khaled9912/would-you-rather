import {
    Box,
    Button,
    Avatar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { NOT_FOUND_IMAGE } from '../constants'

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ width: 500, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                    sx={{ width: 300, height: 300, mr: 2 }}
                    src={NOT_FOUND_IMAGE}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={() => navigate('/')}
                    sx={{ mt: 2, p: 1 }}
                >
                    BACK TO HOME
                </Button>
            </Box>
        </ Box>
    );
}
