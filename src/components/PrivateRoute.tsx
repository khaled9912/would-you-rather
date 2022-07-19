import { RootState } from '../app/store';
import { useAppSelector } from '../app/hooks';
import NotFound from './NotFound';

export default function PrivateRoute({ element }: any) {
    const { isAuthed } = useAppSelector((state: RootState) => state.auth);
    const RouteComponent = () => (
        isAuthed
            ? element
            : <NotFound />
    );
    return <RouteComponent />;
};