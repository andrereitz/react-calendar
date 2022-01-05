import './App.css';

import { useState } from 'react';

import { Calendar, EventView } from 'components';

import { useSelector } from 'react-redux';
import { selectView } from 'store/EventsUi/EventsUi.selectors';

function App() {
  const view = useSelector(selectView);
  const [calendarDate, setCalendarDate] = useState();

  return (
    <div className="App" style={{textAlign: 'center'}}>
      <Calendar date={calendarDate} setDate={setCalendarDate} />
      {view.show && (
        <EventView />
      )}
    </div>
  );
}

export default App;
