import { useEffect, useMemo, useState } from "react";
import { clampNumber, pad2 } from "../utils/date.js";

function diffParts(targetDate) {
  const now = Date.now();
  const t = targetDate.getTime();
  const delta = Math.max(0, t - now);
  const totalSec = Math.floor(delta / 1000);

  const days = Math.floor(totalSec / (3600 * 24));
  const hours = Math.floor((totalSec % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  return { days, hours, minutes, seconds, done: t <= now };
}

export default function Countdown({ targetISO }) {
  const targetDate = useMemo(() => new Date(targetISO), [targetISO]);
  const [parts, setParts] = useState(() => diffParts(targetDate));

  useEffect(() => {
    const id = window.setInterval(() => {
      setParts(diffParts(targetDate));
    }, 1000);
    return () => window.clearInterval(id);
  }, [targetDate]);

  const days = clampNumber(parts.days, 0, 9999);
  return (
    <div className="countdown" aria-label="Hitung mundur acara">
      <div className="cd">
        <div className="cdv">{days}</div>
        <div className="cdl">Hari</div>
      </div>
      <div className="cd">
        <div className="cdv">{pad2(parts.hours)}</div>
        <div className="cdl">Jam</div>
      </div>
      <div className="cd">
        <div className="cdv">{pad2(parts.minutes)}</div>
        <div className="cdl">Menit</div>
      </div>
      <div className="cd">
        <div className="cdv">{pad2(parts.seconds)}</div>
        <div className="cdl">Detik</div>
      </div>
      {parts.done ? <div className="cd-done">Hari ini!</div> : null}
    </div>
  );
}

