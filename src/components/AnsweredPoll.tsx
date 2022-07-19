import {
    Box,
    Card,
    CardHeader,
    Button,
    CardContent,
    Typography
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { DEFAULT_IMAGE, User, Question } from '../constants';
import { useNavigate } from 'react-router-dom';

export default function AnsweredPoll({ question, author }: { question: Question, author: User }) {
    const navigate = useNavigate();

    return (
        <Card sx={{ width: '100%', mb: 2 }}>
            <CardHeader sx={{ backgroundColor: '#DCDCEA' }} title={`${author?.name || 'No name'} asks:`} />
            <CardContent sx={{ display: 'flex' }}>
                <Avatar
                    sx={{ width: 150, height: 150, mr: 2 }}
                    src={author?.avatarURL || DEFAULT_IMAGE}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
                        Would you rather:
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{ alignSelf: 'center' }}
                    >
                        {question?.optionOne?.text} <br /> or...
                    </Typography>
                    <Button
                        fullWidth
                        onClick={() => navigate(`/questions/${question.id}`)}
                        variant="contained">
                        Result
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}
