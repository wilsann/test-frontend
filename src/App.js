import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './styles/theme';
import Header from './components/Header';
import Home from './pages/Home';
import Admin from './pages/Admin';
import User from './pages/User';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;