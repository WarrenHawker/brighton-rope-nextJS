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
  if (
    option == 'firstName' ||
    option == 'lastName' ||
    option == 'email' ||
    option == 'phone'
  ) {
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