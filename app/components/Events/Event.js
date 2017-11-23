import React from 'react';
import styled from 'styled-components';
import Color from 'color';
import theme from '../../theme';

const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const Link = styled.a`
  text-decoration: none;
  color: ${theme.link};
  &:hover {
    color: ${Color(theme.link).darken(0.5).rgb().string()};
  }
`;

export default ({ event }) => {
  let meetupName;
  let description;
  let url;

  switch (event.organizer.displayName) {
    case 'NodeSchool Toronto':
      meetupName = 'NodeSchool';
      description = event.description;
      url = 'http://nodeschool.io/toronto/';
      break;
    case 'One-Off JavaScript Events in Toronto':
      [, url, meetupName, ...description] = event.description.split('\n');
      break;
    default:
      [meetupName,,, description,, url] = event.description.split('\n');
  }

  const startDate = new Date(event.start.dateTime);

  const day = DAYS_OF_WEEK[startDate.getDay()];
  const month = MONTHS[startDate.getMonth()];
  const date = startDate.getDate();
  const hours = startDate.getHours() % 12;
  let minutes = startDate.getMinutes();
  const AMPM = startDate.getHours() < 12 ? 'AM' : 'PM';

  if (minutes <= 10) {
    minutes = `0${minutes}`;
  }

  const displayStartDate = `${day}, ${month} ${date} at ${hours}:${minutes}${AMPM}`;

  return (
    <div>
      <h4>{meetupName} - {event.summary}</h4>
      <p>{displayStartDate}</p>
      <p>{event.location}</p>
      <p>{description}</p>
      <p>
        <Link href={url} target="_blank">
          Event Details
        </Link>
      </p>
    </div>
  );
};
