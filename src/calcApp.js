import React, { useContext } from 'react';
import CalcDisplay from './components/calcDisplay';
import ThemeSelector from './components/themeSelector';
import { ThemeContext } from './contexts/themeContexts';
const CalcApp = () => {
    const { theme } = useContext(ThemeContext);
    return (
        <div className="mainApp" style={{backgroundColor:`${theme.backgroundColor}`}}>
            <ThemeSelector/>
            <CalcDisplay/>
        </div>
    )
}
export default CalcApp;