'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { events } from '../lib/eventsData';
import { ContextProviderProps, EventsData } from '../lib/interfaces';

interface UseEventsProps {
  events: EventsData[];
  selectedEvent: string | null;
  setSelectedEvent: (value: string) => void;
}

const EventsContext = createContext({});
export const useEvents = () => useContext(EventsContext) as UseEventsProps;

export const EventsContextProvider = ({ children }: ContextProviderProps) => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  useEffect(() => {
    setSelectedEvent(events[0].id);
  }, []);
  return (
    <EventsContext.Provider value={{ events, selectedEvent, setSelectedEvent }}>
      {children}
    </EventsContext.Provider>
  );
};
