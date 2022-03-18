import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material';
import { PATH, theme } from 'constants';
import { AuthProvider, DataProvider } from 'context';
import Home from 'components/Home';
import PrivateRoute from 'components/PrivateRoute';
import MainPage from 'components/MainPage';

function App() {
    return (
        <ThemeProvider theme={theme}>
        <AuthProvider>
        <DataProvider>
        <CssBaseline />
            <Router>
                <Routes>
                <Route path={`/${PATH}`} element={<Home />} />
                <Route path={`/${PATH}/:type`} element={<PrivateRoute />}>
                    <Route path={`/${PATH}/:type/:tab`} element={<MainPage />} />
                </Route>
                </Routes>
            </Router>
      </DataProvider>
      </AuthProvider>
      </ThemeProvider>
    );
}

export default App;
