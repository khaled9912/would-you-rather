import {
    Box,
    Card,
    CardHeader,
    Button,
    CardContent,
    Typography,
    Avatar
} from '@mui/material';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { User, Question } from '../constants';
import { useNavigate } from 'react-router-dom';

export default function PollResult({ user, author, question }: { user: User, author: User, question: Question }) {
    const navigate = useNavigate();

    const vote = {
        optionOne: question.optionOne.votes.length,
        optionTwo: question.optionTwo.votes.length,
        total: question.optionOne.votes.length + question.optionTwo.votes.length,
    }

    const votePercent = {
        optionOne: vote.optionOne / vote.total * 100,
        optionTwo: vote.optionTwo / vote.total * 100
    }

    const myOption: any = user.answers[question.id as keyof Object];

    type colorType = 'inherit' | 'secondary';
    let optionOneColor: colorType = 'inherit';
    let optionTwoColor: colorType = 'inherit';

    let optionOneStyle = {
        border: 3,
        borderRadius: '10px',
        borderColor: 'grey.500'
    };
    let optionTwoStyle = {
        border: 3,
        borderRadius: '10px',
        borderColor: 'grey.500'
    };
    if (myOption === 'optionOne') {
        optionOneStyle.borderColor = 'secondary.main';
        optionOneColor = 'secondary';
    } else {
        optionTwoStyle.borderColor = 'secondary.main';
        optionTwoColor = 'secondary';
    }

    const MyVoteLabel = () => {
        return (
            <Box sx={{ position: 'relative' }} >
                <Box
                    sx={{
                        bgcolor: 'orange',
                        color: 'grey.50',
                        border: '1px solid',
                        p: 1.5,
                        borderRadius: 2,
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        position: 'absolute',
                        top: -40,
                        right: -30,
                        zIndex: 1,
                    }}
                >
                    YOUR VOTE
                </Box>
            </Box>
        )
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

                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', ml: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: '600' }}>
                            Results:
                        </Typography>
                        <Typography variant="body1">
                            Would you rather
                        </Typography>
                        <Box sx={{ mt: 2, mb: 3, p: 2, ...optionOneStyle }}>
                            {
                                myOption === 'optionOne' && <MyVoteLabel />
                            }
                            <Typography variant="body1" sx={{ fontWeight: '600' }}>
                                {question.optionOne.text}
                            </Typography>
                            <LinearProgressWithLabel sx={{ height: 30 }} color={optionOneColor} value={votePercent.optionOne} />
                            <Typography variant="body1" sx={{ fontWeight: '600' }}>
                                {`${vote.optionOne} out of ${vote.total} votes`}
                            </Typography>
                        </Box>
                        <Box sx={{ mb: 2, p: 2, ...optionTwoStyle }}>
                            {
                                myOption === 'optionTwo' && <MyVoteLabel />
                            }
                            <Typography variant="body1" sx={{ fontWeight: '600' }}>
                                {question.optionOne.text}
                            </Typography>
                            <LinearProgressWithLabel sx={{ height: 30 }} color={optionTwoColor} value={votePercent.optionTwo} />
                            <Typography variant="body1" sx={{ fontWeight: '600' }}>
                                {`${vote.optionTwo} out of  ${vote.total} votes`}
                            </Typography>
                        </Box>
                        <Button variant="contained" onClick={() => navigate(-1)}> Back </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 50 }}>
                <Typography variant="h5" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}