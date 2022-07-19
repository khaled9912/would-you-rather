import React, { useState } from "react";
import {
    Box,
    Card,
    CardHeader,
    CardContent,
    Typography,
    FormControl,
    Button,
    TextField,
    FormLabel
} from '@mui/material';
import { useAppDispatch } from '../app/hooks';
import { handleSaveQuestion } from '../slices/questionSlice';
import { User } from '../constants';
import { useNavigate } from 'react-router-dom';

export default function NewPoll({ user }: { user: User }) {
    const [optionOne, setOptionOne] = useState('');
    const [optionTwo, setOptionTwo] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleAddNewPoll = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            optionOneText: optionOne,
            optionTwoText: optionTwo,
            author: user.id
        }
        dispatch(handleSaveQuestion(payload));
        navigate('/');
    }

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ m: 3, width: 500 }}>
                <CardHeader sx={{ backgroundColor: 'cyan' }} title="Create a New Poll" />
                <CardContent>
                    <Typography variant="subtitle1" component="div">
                        Complete the question:
                    </Typography>
                    <br />
                    <FormControl sx={{ width: '100%' }} onSubmit={handleAddNewPoll} component={'form'}>
                        <TextField
                            label="Enter option 1"
                            variant="outlined"
                            value={optionOne}
                            onChange={(e) => setOptionOne(e.target.value)}
                        />
                        <RedBar />
                        <TextField
                            label="Enter option 2"
                            variant="outlined"
                            value={optionTwo}
                            onChange={(e) => setOptionTwo(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, p: 1 }}
                            disabled={!optionOne || !optionTwo}
                        >
                            Submit
                        </Button>
                    </FormControl>
                </CardContent>
            </Card>
        </ Box>
    );
}

function RedBar() {
    return (
        <Box sx={{ width: '100%', mt: 1, mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
            <Box
                sx={{
                    width: '40%',
                    height: 5,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? 'rgba(255, 0, 0, 0.1)'
                            : 'rgb(255 132 132 / 25%)',
                }}
            />
            <FormLabel sx={{ width: '10%' }}>OR</FormLabel>
            <Box
                sx={{
                    width: '40%',
                    height: 5,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? 'rgba(255, 0, 0, 0.1)'
                            : 'rgb(255 132 132 / 25%)',
                }}
            />
        </ Box>
    );
}