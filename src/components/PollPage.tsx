import { Box } from '@mui/material';
import { User, Question } from '../constants';
import { useParams } from 'react-router-dom';
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import PollQuestion from "./PollQuestion";
import PollResult from "./PollResult";
import NotFound from "./NotFound";

export default function PollPage({ user }: { user: User }) {
    const { questions } = useAppSelector((state: RootState) => state.question);
    const { users } = useAppSelector((state: RootState) => state.user);
    const { id } = useParams();

    const getQuestionById = (id: string): Question => {
        const question: any = questions[id as keyof Object];
        return question;
    }

    const getAuthorById = (id: string): User => {
        const question = getQuestionById(id);
        const author: any = users[question.author as keyof Object];
        return author;
    }

    if (!(id && getQuestionById(id))) {
        return <NotFound />;
    }

    return (
        <Box sx={{ width: 600, display: 'flex', justifyContent: 'center' }}>
            {
                user.answers[id as keyof Object] ?
                    (<PollResult
                        user={user}
                        author={getAuthorById(id)}
                        question={getQuestionById(id)}
                    />)
                    :
                    (<PollQuestion
                        user={user}
                        author={getAuthorById(id)}
                        question={getQuestionById(id)}
                    />)
            }
        </Box>
    );
}
