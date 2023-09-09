import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Timeline, { TimelineHeaders, SidebarHeader, DateHeader, CustomHeader } from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import { momentLocalizer } from "react-big-calendar";
import "moment/locale/pl";

const localizer = momentLocalizer(moment);

const TimelineFunction = (props) => {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersResponse = await axios.get("http://localhost:5000/users");
      setUsers(usersResponse.data);

      // Przykład: Tworzenie grup na podstawie danych pracowników
      const userGroups = usersResponse.data.map((user) => ({
        id: user.id,
        title: `${user.name} ${user.surname}`,
      }));
      setGroups(userGroups);

      // Przykładowe dane elementów (zmieniłem na dane statyczne)
      const staticItems = [
        { id: 1, group: 1, title: "Spotkanie 1", start_time: moment().add(1, 'hour').toDate(), end_time: moment().add(2, 'hours').toDate() },
        { id: 2, group: 2, title: "Spotkanie 2", start_time: moment().add(4, 'hours').toDate(), end_time: moment().add(5, 'hours').toDate() },
      ];
      setItems(staticItems);
    } catch (error) {
      console.error("Błąd podczas pobierania danych:", error);
    }
  };

  return (
    <Timeline
      groups={groups}
      items={items}
      defaultTimeStart={moment().add(-12, 'hour')}
      defaultTimeEnd={moment().add(12, 'hour')}
    >
      <TimelineHeaders>
        <SidebarHeader>
          {({ getRootProps }) => {
            return <div className="timeline-left-bar"{...getRootProps()}>Lista pracowników</div>;
          }}
        </SidebarHeader>
        <DateHeader unit="primaryHeader" />
        <DateHeader />
        <CustomHeader height={50} headerData={{ someData: "data" }} unit="year">
          {({
            headerContext: { intervals },
            getRootProps,
            getIntervalProps,
            showPeriod,
            data,
          }) => {
            return (
              <div {...getRootProps()}>
                {intervals.map((interval) => {
                  const intervalStyle = {
                    lineHeight: "30px",
                    textAlign: "center",
                    borderLeft: "1px solid black",
                    cursor: "pointer",
                    backgroundColor: "Turquoise",
                    color: "white",
                  };
                  return (
                    <div
                      onClick={() => {
                        showPeriod(interval.startTime, interval.endTime);
                      }}
                      {...getIntervalProps({
                        interval,
                        style: intervalStyle,
                      })}
                    >
                      <div className="sticky">
                        {interval.startTime.format("YYYY")}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          }}
        </CustomHeader>
      </TimelineHeaders>
    </Timeline>
  );
};

export default TimelineFunction;
