import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRoutes from './routes';
import GlobalStyle from './styles/global';

const App = () => (
    <>
        <GlobalStyle />
        <Router>
            <AppRoutes />
        </Router>
    </>
);

export default App;
