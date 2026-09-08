"use clinet";
import { useState, useEffect } from "react";

function TimeClock() {
  const label = "LA";
  const UTC = -5;
  const [now, setNow] = useState(new Date());
  const offsetMs =
    now.getTime() + now.getTimezoneOffset() * 60000 + UTC * 3600000;
  const local = new Date(offsetMs);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const day = days[local.getDay()];
  const time = local.toTimeString().slice(0, 8);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <h5>
      {day} {time} {label}
    </h5>
  );
}

export default TimeClock;
