import React, { useState, useEffect, useMemo } from "react";
import { Box, Drawer } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "theme/fullCalendar.css";

import Header from "components/layout/Header";
import DrawerAddSchedule from "components/schedule/DrawerAddSchedule";
import DrawerEditSchedule from "components/schedule/DrawerEditSchedule";
import { useGetScheduleQuery, useUpdateScheduleMutation } from "state/api";

const GetSchedule = () => {
  const { data: eventData, isLoading, refetch } = useGetScheduleQuery();
  const [updateSchedule] = useUpdateScheduleMutation();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const scheduleData = useMemo(() => {
    return eventData?.slice().map((event) => {
      return {
        id: event._id,
        title: event.scheduleTitle,
        start: new Date(event.scheduleStart).toISOString().slice(0, 10),
        end: new Date(event.scheduleEnd).toISOString().slice(0, 10),
      };
    });
  }, [eventData]);

  useEffect(() => {
    if (!isLoading && eventData) {
      setEvents(scheduleData);
    }
  }, [isLoading, eventData, scheduleData]);

  // handle event bar
  const handleEventDrop = async (info) => {
    const { event } = info;
    const updatedEvent = {
      id: event.id,
      data: {
        start: event.start.toISOString().slice(0, 10),
        end: event.end.toISOString().slice(0, 10),
      },
    };

    await updateSchedule(updatedEvent);
    setEvents((prevEvent) =>
      prevEvent.map((e) =>
        e.id === event.id ? { ...e, ...updatedEvent.data } : e
      )
    );
  };

  const handleEventResize = async (info) => {
    const { event } = info;
    const updatedEvent = {
      id: event.id,
      data: {
        start: event.start.toISOString().slice(0, 10),
        end: event.end.toISOString().slice(0, 10),
      },
    };

    await updateSchedule(updatedEvent);
    setEvents((prevEvent) =>
      prevEvent.map((e) =>
        e.id === event.id ? { ...e, ...updatedEvent.data } : e
      )
    );
  };

  // handle Event Click
  const handleClickEvent = (info) => {
    const { event } = info;
    setSelectedEvent({
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
    });
    toggleEditScheduleDrawer();
  };

  // handle AddDrawer
  const [isAddScheduleDrawerOpen, setIsAddScheduleDrawerOpen] = useState(false);
  const toggleAddScheduleDrawer = () => {
    setIsAddScheduleDrawerOpen(!isAddScheduleDrawerOpen);
  };

  // handle EditDrawer
  const [isEditScheduleDrawerOpen, setIsEditScheduleDrawerOpen] =
    useState(false);
  const toggleEditScheduleDrawer = () => {
    setIsEditScheduleDrawerOpen(!isEditScheduleDrawerOpen);
  };

  // Refresh
  const onUpdate = async () => {
    await refetch();
  };

  return (
    <Box>
      <Box direction="column">
        <Header title="SCHEDULE" subtitle="프로젝트 일정을 관리합니다." />
        <br />
      </Box>
      <Box>
        <div className="fullCalendar">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            editable={true}
            locale="ko"
            // dateClick={handleDateClick}
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "customButton",
            }}
            customButtons={{
              customButton: {
                text: "스케쥴 생성",
                click: toggleAddScheduleDrawer,
              },
            }}
            events={events}
            eventDrop={handleEventDrop}
            eventResize={handleEventResize}
            eventClick={handleClickEvent}
            eventDisplay="block"
            eventBackgroundColor="backgroundColor"
          />
          <Drawer
            anchor="right"
            open={isAddScheduleDrawerOpen}
            onClose={toggleAddScheduleDrawer}
          >
            <DrawerAddSchedule
              onUpdate={onUpdate}
              toggleAddScheduleDrawer={toggleAddScheduleDrawer}
            />
          </Drawer>

          <Drawer
            anchor="right"
            open={isEditScheduleDrawerOpen}
            onClose={toggleEditScheduleDrawer}
          >
            <DrawerEditSchedule
              onUpdate={onUpdate}
              selectedEvent={selectedEvent}
              toggleEditScheduleDrawer={toggleEditScheduleDrawer}
            />
          </Drawer>
        </div>
      </Box>
    </Box>
  );
};

export default GetSchedule;
