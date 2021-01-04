import React, { useContext } from 'react';
import { ThemeContext } from "../contexts/themeContexts";

const ThemeSelector = () => {
    const { onCallBack, selectedTheme } = useContext(ThemeContext);
    return (
        <div>
            <select id="themeSelector" value={selectedTheme} onChange={onCallBack}>
                <option value={'lightTheme'}>LightMode</option>
                <option value={'darkTheme'}>DarkMode</option>
            </select>
        </div>
    )
}

export default ThemeSelector