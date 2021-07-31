import React, { useState, useEffect } from 'react';
import MainPanel from './components/MainPanel';
import NotFound from './components/NotFound';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from './themes.js';

const App = () => {

    const [theme, setTheme] = useState("light");
    const themeToggler = (isBulbOn) => {
        let localTheme = "";

        if (isBulbOn) {
            localTheme = "light";
        } else {
            localTheme = "dark";
        }

        setTheme(localTheme);
        window.localStorage.setItem("theme", localTheme);
    }

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        if (!localTheme) {
            setTheme("light");
        } else {
            setTheme(localTheme);
        }
    }, []);

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <GlobalStyles />
            <Router>
                <Switch>
                    <Route exact path="/" render={(props) => <MainPanel {...props} themeToggler={themeToggler} />} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;