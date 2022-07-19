import {
    Box,
    Avatar,
    Card,
    CardContent,
    Divider,
    Typography,
    CardHeader,
    Grid
} from '@mui/material';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { DEFAULT_IMAGE } from '../constants';

export default function LeaderBoard() {
    const { users } = useAppSelector((state: RootState) => state.user);

    const getLeaderBoard = () => {
        const leaderBoard = Object.values(users).map(user => ({
            ...user,
            questionCount: Object.values(user.questions).length,
            answerCount: Object.values(user.answers).length,
        })).sort((a, b) => (a.questionCount + a.answerCount) - (b.questionCount + b.answerCount))
            .reverse()
            .slice(0, 3);
        return leaderBoard;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
            {
                getLeaderBoard().map((user, index) =>
                    <Card key={index} sx={{ m: 2, width: 700 }}>
                        <CardContent sx={{ display: 'flex' }}>
                            <Box sx={{ mr: 2, flex: 0.5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly'}}>
                                <Typography variant="h3" sx={{ mb: 2}}>
                                    {index + 1}
                                </Typography>
                            </Box>
                            <Box sx={{ mr: 2, flex: 1 }}>
                                <Avatar
                                    sx={{ height: 150, width: 150 }}
                                    src={user.avatarURL || DEFAULT_IMAGE}
                                />
                            </Box>
                            <Grid item xs={6} md={8} sx={{ flex: 2, borderRight: 1, borderLeft: 1, borderColor: 'grey.500', p: 2 }}>
                                <Typography variant="h5" sx={{ mb: 2 }}>
                                    {user.name}
                                </Typography>
                                <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body2">
                                        Answered questions
                                    </Typography>
                                    <Typography variant="h5">
                                        {user.questionCount}
                                    </Typography>
                                </Box>
                                <Divider />
                                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body2">
                                        Created questions
                                    </Typography>
                                    <Typography variant="h5">
                                        {user.answerCount}
                                    </Typography>
                                </Box>

                            </Grid>
                            <Card sx={{ width: 500, flex: 1 }}>
                                <CardHeader sx={{ backgroundColor: 'cyan', fontSize: 5, textAlign: 'center' }} title="Score" />
                                <Divider />
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography variant="h3" >
                                        {user.questionCount + user.answerCount}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Card>)
            }
        </Box>
    );
}
