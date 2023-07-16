import { EventsData } from './interfaces';

export const convertToArray = (obj: any): EventsData[] => {
  const newArray = Object.entries(obj);
  return newArray.map((item) => {
    return item[1] as EventsData;
  });
};

export const getShortDate = (date: Date | string): String => {
  if (typeof date == 'string') {
    date = new Date(date);
  }
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    month: 'short',
    day: 'numeric',
  }).format(date);
  return formattedDate;
};

export const getLongDate = (date: Date | string): string => {
  if (typeof date == 'string') {
    date = new Date(date);
  }
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
  }).format(date);
  return formattedDate;
};

export const getTime = (date: Date): String => {
  const newTime = new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
  return newTime;
};

export const isTicket = (option: string) => {
  if (option == 'child' || option == 'adult' || option == 'senior') {
    return true;
  } else return false;
};

export const isContact = (option: string) => {
  if (
    option == 'firstName' ||
    option == 'lastName' ||
    option == 'email' ||
    option == 'phone'
  ) {
    return true;
  } else return false;
};

export const dateToString = (
  date: Date | undefined,
  reversed: boolean = false
): string => {
  if (!date) {
    return '';
  }
  const year: string = date.getFullYear().toString();

  let month: string;
  if (date.getMonth() < 10) {
    month = `0${date.getMonth() + 1}`;
  } else month = (date.getMonth() + 1).toString();

  let day: string;
  if (date.getDate() < 10) {
    day = `0${date.getDate()}`;
  } else day = date.getDate().toString();

  if (reversed) {
    return `${year}-${month}-${day}`;
  } else return `${day}-${month}-${year}`;
};

export const trimString = (str: string, length: number): string => {
  if (str.length < length) {
    return str;
  }
  let trimmedString = str.substring(0, length);
  trimmedString = trimmedString.substring(
    0,
    Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
  );

  return `${trimmedString}...`;
};

export const getFullDate = (date: Date | string | undefined): string => {
  if (!date) {
    return '';
  }
  if (typeof date == 'string') {
    date = new Date(date);
  }

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  const nthNumber = (number: number) => {
    if (number > 3 && number < 21) return 'th';
    switch (number % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  return `${month} ${day}${nthNumber(day)} ${year}`;
};
