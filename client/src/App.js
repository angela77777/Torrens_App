import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NotFound from './components/NotFound/NotFound.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx';
import TasksPage from './pages/TasksPage/TasksPage.jsx';
import UsersPage from './pages/UsersPage/UsersPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/sign-up" element={<RegisterPage />} />
        <Route exact path="/user/home" element={<HomePage />} />
        <Route exact path="/user/list" element={<UsersPage />} />
        <Route exact path="/user/tasks" element={<TasksPage />} />
      </Routes>
    </Router>
  );
}

export default App;
