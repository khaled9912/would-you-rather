import { useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Login from './components/Login';
import { handleInitialData } from './slices/sharedSlice';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RootState } from './app/store';
import NewPoll from './components/NewPoll';
import LeaderBoard from './components/LeaderBoard';
import PollPage from './components/PollPage';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const dispatch = useAppDispatch();
  const { isAuthed, userId } = useAppSelector((state: RootState) => state.auth);
  const { users } = useAppSelector((state: RootState) => state.user);

  const getUserById = () => {
    return Object.values(users).find(user => user.id === userId);
  }

  useEffect(() => {
    function fetchInitialData() {
      dispatch(handleInitialData());
    }
    fetchInitialData();
  },[])

  return (
    <Router>
      <div className="App">
        {
          isAuthed && <NavBar user={getUserById()} />
        }
        <Routes>
          <Route path="/" element={isAuthed ? <Home user={getUserById()} /> : <Login />} />
          <Route path="/add" element={<PrivateRoute element={<NewPoll user={getUserById()} />} />} />
          <Route path="/leaderboard" element={<PrivateRoute element={<LeaderBoard />} />} />
          <Route path="/questions/:id" element={<PrivateRoute element={<PollPage user={getUserById()} />} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
