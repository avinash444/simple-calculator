import logo from './logo.svg';
import './App.css';
import CalcApp from './calcApp';
import { ThemeProvider } from './contexts/themeContexts';
function App() {
  return (
    <div className="App">
        <ThemeProvider>
            <CalcApp/>
        </ThemeProvider>
    </div>
  );
}

export default App;
