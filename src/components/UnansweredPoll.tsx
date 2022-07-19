import {
    Box,
    Card,
    CardHeader,
    Button,
    CardContent,
    Typography,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { DEFAULT_IMAGE, User, Question } from '../constants';
import { useNavigate } from 'react-router-dom';

export default function UnansweredPoll({ question, author }: { question: Question, author: User }) {
    const navigate = useNavigate();

    const handleAnswerPoll = () => {
        navigate(`/questions/${question.id}`)
    }

    return (
        <Card sx={{ width: '100%', mb: 2 }}>
            <CardHeader sx={{ backgroundColor: '#DCDCEA' }} title={`${author?.name || 'No name'} asks:`} variant="h6" component={'div'}/>
            <CardContent sx={{ display: 'flex' }} >
                <Avatar
                    sx={{ width: 150, height: 150, mr: 2 }}
                    src={author?.avatarURL || DEFAULT_IMAGE}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontWeight: '600' }} component={'div'} >
                        Would you rather:
                    </Typography>
                    <Typography sx={{ alignSelf: 'center' }} component={'div'}>
                        {question?.optionOne?.text} <br /> or...
                    </Typography>
                    <Button
                        fullWidth
                        color='success'
                        onClick={handleAnswerPoll}
                        variant="contained">
                        Answer Poll
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}
