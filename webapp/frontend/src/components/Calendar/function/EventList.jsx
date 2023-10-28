import React from "react";
import moment from "moment";
import "./EventList.css";

const EventList = ({ events }) => {
  return (
    <div className="event-list">
      <h2>Wydarzenia na {moment().format("dddd, D MMMM YYYY")}</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>Data rozpoczęcia: {moment(event.start_time).format("HH:mm")}</p>
            <p>Data zakończenia: {moment(event.end_time).format("HH:mm")}</p>
            <p>{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
