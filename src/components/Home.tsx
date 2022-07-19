import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Tabs,
    Tab,
    AppBar,
    Box,
    Card,
    Typography
} from '@mui/material';
import UnansweredPoll from './UnansweredPoll';
import AnsweredPoll from './AnsweredPoll';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { User } from '../constants';

export default function Home({ user }: { user: User }) {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const { questions } = useAppSelector((state: RootState) => state.question);
    const { users } = useAppSelector((state: RootState) => state.user);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const isQuestionAnswered = (questionId: string) => {
        return user.answers[questionId as keyof Object] ? true : false;
    }

    const getAuthorByPoll = (authorId: string) => {
        return Object.values(users).find(user => user.id === authorId)
    }

    const unansweredQuestions = Object.values(questions).sort((a, b) => b.timestamp - a.timestamp).filter(question => !isQuestionAnswered(question.id));
    const answeredQuestions = Object.values(questions).sort((a, b) => b.timestamp - a.timestamp).filter(question => isQuestionAnswered(question.id));

    return (
        <Card sx={{ bgcolor: 'background.paper', width: 500, m: 3 }}>
            <AppBar position="static" color='secondary'>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                >
                    <Tab label="Unanswered" {...a11yProps(0)} />
                    <Tab label="Answered" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} dir={theme.direction}>
                {
                    unansweredQuestions.map(question => (
                        !isQuestionAnswered(question.id) && <UnansweredPoll key={question.id} question={question} author={getAuthorByPoll(question.author)} />
                    ))
                }
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                {
                    answeredQuestions.map(question => (
                        isQuestionAnswered(question.id) && <AnsweredPoll key={question.id} question={question} author={getAuthorByPoll(question.author)} />
                    ))
                }
            </TabPanel>
        </Card>
    );
}
interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 2 }}>
                    <Typography component={'div'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}