import { Provider, useSelector } from 'react-redux';
import './App.css';
import { store } from './redux/store';
import Boards from './Workspace/Board/Boards';

import Board from './Workspace/Board/Boards';
import Workspace from './Workspace/Workspace';

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
