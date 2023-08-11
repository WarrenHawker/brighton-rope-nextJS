import { Prisma } from '@prisma/client';
import {
  Address,
  EventClient,
  EventClientAdmin,
  EventDateTime,
  Position,
  Prices,
  TeacherAdminClient,
  TeacherDB,
  TeacherDBAdmin,
  UserClient,
  UserIdEmail,
  UserRole,
} from './interfaces';
import validator from 'validator';

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

export const isContact = (option: string) => {
  if (option == 'firstName' || option == 'lastName' || option == 'email') {
    return true;
  } else return false;
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

export const getFullDate = (date: Date | string | undefined | null): string => {
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

export const getTimeString = (time: string): string => {
  let hour = parseInt(time.split(':')[0]);
  let minutes = parseInt(time.split(':')[1]);
  let hours;
  let suffix;

  if (hour < 12) {
    suffix = 'am';
    if (hour == 0) {
      hours = '12';
    } else {
      hours = hour;
    }
  } else {
    suffix = 'pm';
    switch (hour) {
      case 13:
        hours = '1';
        break;
      case 14:
        hours = '2';
        break;
      case 15:
        hours = '3';
        break;
      case 16:
        hours = '4';
        break;
      case 17:
        hours = '5';
        break;
      case 18:
        hours = '6';
        break;
      case 19:
        hours = '7';
        break;
      case 20:
        hours = '8';
        break;
      case 21:
        hours = '9';
        break;
      case 22:
        hours = '10';
        break;
      case 23:
        hours = '11';
        break;
      default:
        break;
    }
  }

  if (minutes == 0) {
    return `${hours}${suffix}`;
  } else if (minutes < 10) {
    return `${hours}:0${minutes}${suffix}`;
  } else {
    return `${hours}:${minutes}${suffix}`;
  }
};

export const excludePropertyFromObject = (obj: {}, keys: any[]) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key))
  );
};

export const handleError = (
  error: any
): { message: string; status: number } => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return {
      message: `code: ${error.code}, from: ${error.meta?.target}, message: ${error.message}`,
      status: 500,
    };
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return { message: error.message, status: 500 };
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    return { message: error.message, status: 400 };
  } else return { message: error, status: 500 };
};

export const decodeEventAdmin = (event: EventClientAdmin): EventClientAdmin => {
  return {
    id: event.id,
    title: validator.unescape(event.title),
    description: decodeURIComponent(event.description),
    startDate: event.startDate,
    dateTimes: event.dateTimes as EventDateTime[],
    location: {
      lineOne: validator.unescape(event.location.lineOne),
      lineTwo: event.location.lineTwo
        ? validator.unescape(event.location.lineTwo)
        : '',
      city: validator.unescape(event.location.city),
      country: validator.unescape(event.location.country),
      postcode: validator.unescape(event.location.postcode),
    } as Address,
    isFree: event.isFree,
    maxTickets: event.maxTickets,
    ticketsSold: event.ticketsSold,
    ticketsRemaining: event.ticketsRemaining,
    prices: event.prices?.map((item) => ({
      key: validator.unescape(item.key),
      value: {
        maxPrice: item.value.maxPrice,
        minPrice: item.value.minPrice,
      },
      fixedPrice: item.fixedPrice,
    })) as Prices[],
    allowMultipleTickets: event.allowMultipleTickets,
    createdOn: event.createdOn,
    createdBy: event.createdBy as UserIdEmail,
    updatedOn: event.updatedOn,
    updatedBy: event.updatedBy as UserIdEmail,
  };
};

export const decodeEvent = (event: EventClient): EventClient => {
  return {
    id: event.id,
    title: validator.unescape(event.title),
    description: decodeURIComponent(event.description),
    startDate: event.startDate,
    dateTimes: event.dateTimes as EventDateTime[],
    location: {
      lineOne: validator.unescape(event.location.lineOne),
      lineTwo: event.location.lineTwo
        ? validator.unescape(event.location.lineTwo)
        : '',
      city: validator.unescape(event.location.city),
      country: validator.unescape(event.location.country),
      postcode: validator.unescape(event.location.postcode),
    } as Address,
    isFree: event.isFree,
    maxTickets: event.maxTickets,
    ticketsSold: event.ticketsSold,
    ticketsRemaining: event.ticketsRemaining,
    prices: event.prices?.map((item) => ({
      key: validator.unescape(item.key),
      value: {
        maxPrice: item.value.maxPrice,
        minPrice: item.value.minPrice,
      },
      fixedPrice: item.fixedPrice,
    })) as Prices[],
    allowMultipleTickets: event.allowMultipleTickets,
  };
};

export const decodeUser = (user: UserClient): UserClient => {
  return {
    id: user.id,
    email: user.email,
    name: user.name ? validator.unescape(user.name) : '',
    claimed: user.claimed,
    preferences: user.preferences,
    createdOn: user.createdOn,
    claimedOn: user.claimedOn,
    updatedOn: user.updatedOn,
    updatedBy: user.updatedBy as UserIdEmail,
    role: user.role as UserRole,
  };
};

export const decodeTeacherAdmin = (
  teacher: TeacherAdminClient
): TeacherAdminClient => {
  return {
    id: teacher.id,
    name: validator.unescape(teacher.name),
    pronouns: validator.unescape(teacher.pronouns),
    description: decodeURIComponent(teacher.description),
    position: teacher.position as Position,
    imageUrl: decodeURIComponent(teacher.imageUrl),
    public: teacher.public,
    createdOn: teacher.createdOn,
    updatedOn: teacher.updatedOn,
    updatedBy: teacher.updatedBy,
    email: teacher.email,
  };
};

export const decodeTeacher = (teacher: TeacherDB): TeacherDB => {
  return {
    id: teacher.id,
    name: validator.unescape(teacher.name),
    pronouns: validator.unescape(teacher.pronouns),
    description: decodeURIComponent(teacher.description),
    position: teacher.position as Position,
    imageUrl: decodeURIComponent(teacher.imageUrl),
  };
};
