import { useEffect, useState } from "react";

export default function ProgressBar({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const time = setTimeout(onTimeout, timeout);
    return () => {
      clearTimeout(time);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress value={remainingTime} max={timeout} className={mode} />;
}
