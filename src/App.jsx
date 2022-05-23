import {Provider} from 'react-redux';
import { store } from './redux/store';
import Workspace from "./components/Workspace/Workspace"

import './App.css';

function App() {
  
  return (
    <Provider store={store} >
    <div className="App">
      <Workspace />
    </div>
    </Provider>
  );
}

export default App;
