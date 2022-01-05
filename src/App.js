import './App.css';

import { Calendar, EventView } from 'components';

import { useSelector } from 'react-redux';
import { selectView } from 'store/EventsUi/EventsUi.selectors';

function App() {
  const view = useSelector(selectView);

  return (
    <div className="App" style={{textAlign: 'center'}}>
      <Calendar />
      {view.show && (
        <EventView />
      )}
    </div>
  );
}

export default App;
