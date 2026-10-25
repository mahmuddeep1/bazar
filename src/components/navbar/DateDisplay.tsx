"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

const getDate = () =>
  new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Dhaka",
  });

const DateDisplay = () => {
  const date = useSyncExternalStore(subscribe, getDate, () => "");

  return <>{date}</>;
};

export default DateDisplay;