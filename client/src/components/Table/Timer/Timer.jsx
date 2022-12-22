import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import './Timer.scss';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import relativeTime from 'dayjs/plugin/relativeTime.js';
dayjs.extend(utc);
dayjs.extend(relativeTime);

const Timer = ({ timerEnd }) => {
  const [countDown, setCountDown] = useState(
    `2:00`
  );

  useEffect(() => {
    const interval = setInterval(() => {
      let timeNow = dayjs().valueOf() + window.timeDiff;
      let delta = timerEnd - timeNow;

      setCountDown(dayjs(delta).format('mm:ss'));
    }, 1000);

    return () => clearInterval(interval);
  }, [timerEnd]);

  return (
    <div className="auction-timer">
      <span className="auction-timer__countdown">
        {countDown}
      </span>
    </div>
  )
};

export default Timer;