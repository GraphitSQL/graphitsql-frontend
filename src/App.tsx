import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router';
import { HomePage } from './pages/home-page';
import { Routing } from './common/routes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={Routing.home.route()} />} />
        <Route path={Routing.home.route()} element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App
