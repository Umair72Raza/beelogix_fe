import { Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './guard/ProtectedRoute';
import PostJob from './pages/PostJob';

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/post-job" element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
