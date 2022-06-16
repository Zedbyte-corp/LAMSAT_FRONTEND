import React from 'react';
import { notification } from 'antd';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import { scheduleTimeMinute } from 'components/constants';

export function showNotification({ type, message, description, onClose }) {
  notification[type]({
    message: message,
    description: description,
    className: type === 'error' ? 'error-notification' : 'success-notification',
    icon: (
      <img alt={'icon'} />
    ),
    onClose: onClose,
  });
}

export function getLocalTimeZone() {
  return momentTimezone.tz.guess();
}

export function getTimeWithTimeZone(date, dateFormat, getTimeZone) {
  return moment(date).tz(getTimeZone).format(dateFormat);
}
export function getMomentTime(time, format) {
  return moment(time, format);
}

export function isValidTime(time) {
  //checks the time is in 15 minutes interval
  return moment(time).minute() % scheduleTimeMinute === 0;
}

export function getRandom(arr, n) {
  if (arr.length >= 3) {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  } else {
    return arr;
  }
}

export function formatTimeShow(h_24) {
  var hr = moment(h_24, "hh:mm").format('LT');
  return hr;
}

export function getCurrentDay(arr) {
  const cdate = new Date();
  const date = moment(cdate);
  const day = date.format('dddd');
  const time = date.hour();
  const min = date.minutes();
  let d = arr.filter((date) => {
    return date.days == day;
  })
  let vt = `${time}:${min}`;
  let res = "---";
  if (d[0] && parseInt(d[0].status) === 1) {
    let sha = d[0].starttime.split(":");
    let eha = d[0].endtime.split(":");
    if (parseInt(sha[0]) <= time && parseInt(eha[0]) >= time) {
      res = `Open now ${formatTimeShow(d[0].starttime)} - ${formatTimeShow(d[0].endtime)}`
    } else {
      res = "Closed"
    }
  } else {
    res = "Closed"
  }

  return res;
}
