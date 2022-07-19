import React, { useState } from "react";
import {
    Box,
    Card,
    CardHeader,
    Button,
    CardContent,
    Typography,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Radio,
    Avatar
} from '@mui/material';
import { User, Question } from '../constants';
import { handleSaveQuestionAnswer } from '../slices/questionSlice';
import { useAppDispatch } from "../app/hooks";

type PropsType = {
    user: User,
    question: Question,
    author: User
}

export default function PollQuestion(props: PropsType) {
    const { user, author, question } = props;
    const [option, setOption] = useState('');
    const dispatch = useAppDispatch();

    const handleAnswerPoll = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (option) {
            const payload = {
                authedUser: user.id,
                qid: question.id,
                answer: option
            }
            dispatch(handleSaveQuestionAnswer(payload));
        }
    }

    return (
        <Box sx={{ width: 600, display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: '100%', m: 2 }}>
                <CardHeader sx={{ backgroundColor: '#DCDCEA' }} title={`${author?.name} asks:`} />
                <CardContent sx={{ display: 'flex' }}>
                    <Avatar
                        sx={{ width: 150, height: 150, mr: 2 }}
                        src={author?.avatarURL}
                    />
                    <FormControl onSubmit={handleAnswerPoll} component='form' sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
                            Would you rather:
                        </Typography>
                        <RadioGroup
                            value={option}
                            name="radio-buttons-group"
                            onChange={(e) => setOption((e.target as HTMLInputElement).value)}
                            sx={{ pl: 3 }}
                        >
                            <FormControlLabel value="optionOne" control={<Radio />} label={question.optionOne.text} />
                            <FormControlLabel value="optionTwo" control={<Radio />} label={question.optionTwo.text} />
                        </RadioGroup>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained">
                            Submit
                        </Button>
                    </FormControl>
                </CardContent>
            </Card>
        </Box>
    );
}
