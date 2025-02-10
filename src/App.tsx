import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { HomePage } from './pages/home-page';
import { Routing } from './common/routes';
import { SignInPage } from './pages/sign-in-page';
import { GlobalStyle } from './styles/global.styles';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={Routing.home.route()} />} />
          <Route path={Routing.home.route()} element={<HomePage />} />
          <Route path={Routing.signIn.route()} element={<SignInPage />} />
          <Route path={Routing.signUp.route()} element={<>Sign Up</>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
