import React, { useState, useEffect } from "react";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-calendar-timeline/lib/Timeline.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "moment/locale/pl";
import CalendarFunction from "./function/CalendarFunction";
import TimelineFunction from "./function/TimelineFunction";
const localizer = momentLocalizer(moment);

const CalendarMain = () => {


  return (
    <div>
      <div className="CalendarMain-Container">
      <TimelineFunction />
      </div>
    </div>
  );
};

export default CalendarMain;
