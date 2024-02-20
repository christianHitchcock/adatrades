import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Index from './pages';

const App = () => {
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <>
            {/*<BrowserRouter>*/}
                {/*<Route component={ScrollToTop} />*/}
                <ThemeProvider
                    value={{
                        data: { theme },
                        update: toggleTheme,
                    }}
                >
                    <Index />
                </ThemeProvider>
            {/*</BrowserRouter>*/}
        </>
    );
};
//
// const ScrollToTop = () => {
//     window.scrollTo(0, 0);
//     return null;
// };

export default App;
