import { Progress, Button } from "antd";
import "antd/dist/antd.css";
import { useState } from "react";
import styles from "./index.less";

export default function Layout() {
  const [time, setTime] = useState<string>();
  const [progress, setProgress] = useState<number>();

  const getNewTime = () => {
    const weekDay = new Date().getDay();
    let leakDay;
    let leakTime = 0;
    const timeNow = new Date();
    const time9 = new Date(new Date().setHours(9, 0, 0, 0));
    const time1145 = new Date(new Date().setHours(11, 45, 0, 0));
    const time14 = new Date(new Date().setHours(14, 0, 0, 0));
    const time1730 = new Date(new Date().setHours(17, 30, 0, 0));
    if (weekDay > 0 && weekDay < 6) {
      leakDay = 5 - weekDay;
      if (timeNow.getTime() < time9.getTime()) {
        leakTime = 22500000;
      } else if (
        timeNow.getTime() >= time9.getTime() &&
        timeNow.getTime() <= time1145.getTime()
      ) {
        leakTime = time1145.getTime() - timeNow.getTime() + 12600000;
      } else if (
        timeNow.getTime() > time1145.getTime() &&
        timeNow.getTime() <= time14.getTime()
      ) {
        leakTime = 12600000;
      } else if (
        timeNow.getTime() > time14.getTime() &&
        timeNow.getTime() <= time1730.getTime()
      ) {
        leakTime = timeNow.getTime() - time1730.getTime();
      } else {
        leakTime = 0;
      }
    }
    if (leakDay) {
      leakTime += leakDay * 22500000;
    }
    const leakSec = Math.floor(leakTime / 1000);
    const hour = Math.floor(leakSec / 3600);
    const min = Math.floor((leakSec - hour * 3600) / 60);
    const sec = leakSec - hour * 3600 - min * 60;
    let fixIndex = 2;
    if (leakSec < 10) {
      fixIndex = 3;
    }
    const tempP = Number(((1 - leakSec / 112500) * 100).toFixed(fixIndex));
    setProgress(tempP);
    setTime(`${hour}小时${min}分钟${sec}秒`);
  };

  setInterval(getNewTime, 1000);

  return (
    <div className={styles.mianBox}>
      <Progress type="dashboard" percent={progress} />
      <div className={styles.timeText}>{time}</div>
    </div>
  );
}
