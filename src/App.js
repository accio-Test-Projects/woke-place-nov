import './App.css';
import Navs from './Navs';
import { DarkModeContextProvider } from './Components/context/Darkmode';
import { UserContextProvider } from './Components/context/UserContext';
function App() {

  return (
    <div className="App">
      <UserContextProvider>
        <DarkModeContextProvider >
          <Navs />
        </DarkModeContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
