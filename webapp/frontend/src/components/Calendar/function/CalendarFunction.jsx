import React, { useState, useEffect }  from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/pl";

const localizer = momentLocalizer(moment);

const CalendarFunction = (props) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // dane zdarzeń 
  }, []);
  return (
    
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start" 
      endAccessor="end"
      style={{ height: 500, margin: "20px" }}
    />
   
  
  );
};

export default CalendarFunction;
