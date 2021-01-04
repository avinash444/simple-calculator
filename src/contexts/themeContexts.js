import React, { useState, createContext } from 'react';


const theme = {
    lightTheme: {
        backgroundColor:'#fff',
        btnColor: '#cdcdcd',
        fontColor:'#000'
    },
    darkTheme: {
        backgroundColor: '#000',
        btnColor: "#666",
        fontColor: '#fff'
    }
}

export const ThemeContext = createContext();

export function ThemeProvider(props) {
    const [selectedTheme,changeTheme] = useState('lightTheme')
    const onCallBack = (e) => {
        changeTheme(e.target.value);
    }
    return (
        <ThemeContext.Provider value={{ theme: theme[selectedTheme], selectedTheme, onCallBack }}>
            {props.children}
        </ThemeContext.Provider>
    )
}