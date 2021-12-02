import './App.css';

import { Calendar } from 'components';

import store from 'store/store';
import { Provider as ReduxProvider } from 'react-redux';

function App() {
  return (
    <ReduxProvider store={store}>
      <div className="App" style={{textAlign: 'center'}}>
        <Calendar />
      </div>
    </ReduxProvider>
  );
}

export default App;
