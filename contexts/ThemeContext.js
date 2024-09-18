import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({});

const themes = {
    day: {
        body: '#006200',
        backgroundColor: '#1be32c',
        primary: '#000000', 
        toggleText: 'Light Mode',
    },
    night: {
        body: '#1be32c',
        backgroundColor: '#006200',
        primary: '#ffffff',
        toggleText: 'Dark Mode',
    },
}

export const ThemeProvider = ( {children}) => {
    const themeProv = useThemeProv(); 

    return (
        <ThemeContext.Provider value={themeProv}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    return useContext(ThemeContext);    
}

const useThemeProv = () => {
    const [theme, setTheme] = useState(themes.day);

    const toggleTheme = (thm) => {
        if (thm === themes.day)
        {
            setTheme(themes.night);
            console.log(thm);
            console.log('theme toggled');
            // sets theme to dark mode                        
        } else {
                    setTheme(themes.day);
                    console.log(thm);
                    console.log('theme toggled');
                    // sets theme to light mode
               }

    }

    useEffect ( () => {
        const ini = () => {
            setTheme(themes.day)
        }
        return () => ini();
    }, [])
    
    return {
        theme,
        toggleTheme
    }
}