
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';
    import { createGlobalStyle, ThemeProvider } from 'styled-components';

    const GlobalStyle = createGlobalStyle`
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
    `;

    const lightTheme = {
        background: '#ffffff',
        color: '#000000'
    };

    const darkTheme = {
        background: '#000000',
        color: '#ffffff'
    };

    const AppWrapper = () => {
        const [theme, setTheme] = React.useState(lightTheme);

        const toggleTheme = () => {
            setTheme(theme === lightTheme ? darkTheme : lightTheme);
        };

        return (
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <button onClick={toggleTheme}>Toggle Theme</button>
                <App />
            </ThemeProvider>
        );
    };

    ReactDOM.render(
        <React.StrictMode>
            <AppWrapper />
        </React.StrictMode>,
        document.getElementById('root')
    );
    