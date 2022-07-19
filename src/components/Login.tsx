import * as React from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  Box,
  Typography,
  Container,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { RootState } from '../app/store';
import { DEFAULT_LOGIN_IMAGE } from '../constants';
import { setUserAuthed } from '../slices/authSlice';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = React.useState({
    id: '',
    name: '',
    avatarURL: '',
    answers: {},
    questions: {}
  });

  const { users } = useAppSelector((state: RootState) => state.user);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(selectedUser.id){
      dispatch(setUserAuthed(selectedUser.id));
      navigate(-1);
    }else{
      alert("Please select a friend !")
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    const foundUser = Object.values(users).find(u => u.id === event.target.value);
    setSelectedUser(foundUser);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{ m: 1, width: 200, height: 200 }}
            src={ selectedUser.avatarURL || DEFAULT_LOGIN_IMAGE}
          />
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <FormControl sx={{ m: 1, width: 400 }} onSubmit={handleSubmit} component={'form'}>
            <InputLabel>Select a friend</InputLabel>
            <Select
              value={selectedUser.id}
              onChange={handleChange}
              input={<OutlinedInput
                label="Select a friend" />}
            >
              {
                Object.values(users).map(user => (
                  <MenuItem
                    key={user.id}
                    value={user.id}
                  >
                    <div className='thumbnail-image'>
                      <Avatar
                        sx={{ m: 1, width: 30, height: 30 }}
                        src={user.avatarURL}
                      />
                      {user.name}
                    </div>
                  </MenuItem>
                ))
              }
            </Select>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2, p: 1 }}
            >
              Login
            </Button>
          </FormControl>
        </Box>
      </Container>
    </ThemeProvider>
  );
}