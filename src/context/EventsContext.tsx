'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { ContextProviderProps, EventsData } from '../lib/interfaces';

interface UseEventsProps {
  events: EventsData[];
  selectedEvent: string | null;
  setSelectedEvent: (value: string) => void;
}

const EventsContext = createContext({});
export const useEvents = () => useContext(EventsContext) as UseEventsProps;

export const EventsContextProvider = ({ children }: ContextProviderProps) => {
  return <EventsContext.Provider value={{}}>{children}</EventsContext.Provider>;
};
