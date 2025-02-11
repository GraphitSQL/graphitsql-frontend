import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { HomePage } from './pages/home-page';
import { Routing } from './common/routes';
import { SignInPage } from './pages/sign-in-page';
import { GlobalStyle } from './styles/global.styles';
import { SignUpPage } from './pages/sign-up-page';
import { Toaster } from './common/components/ui/toaster';

function App() {
  return (
    <>
      <GlobalStyle />
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={Routing.home.route()} />} />
          <Route path={Routing.home.route()} element={<HomePage />} />
          <Route path={Routing.signIn.route()} element={<SignInPage />} />
          <Route path={Routing.signUp.route()} element={<SignUpPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
