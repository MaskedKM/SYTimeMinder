import { Progress, Button } from "antd";
import "antd/dist/antd.css";
import { useState } from "react";
import styles from "./index.less";
import Smile0 from "../assets/smile/smile0.jpg";
import Smile1 from "../assets/smile/smile1.jpg";
import Smile2 from "../assets/smile/smile2.jpg";
import Smile3 from "../assets/smile/smile3.jpg";
import Smile4 from "../assets/smile/smile4.jpg";
import Smile5 from "../assets/smile/smile5.jpg";
import Smile6 from "../assets/smile/smile6.jpg";
import Smile7 from "../assets/smile/smile7.jpg";
import Smile8 from "../assets/smile/smile8.jpg";

export default function Layout() {
  const [time, setTime] = useState<string>();
  const [progress, setProgress] = useState<number>();
  const [smile, setSmile] = useState<string>();

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
    // const leakSec = 0;
    const leakSec = Math.floor(leakTime / 1000);
    const hour = Math.floor(leakSec / 3600);
    const min = Math.floor((leakSec - hour * 3600) / 60);
    const sec = leakSec - hour * 3600 - min * 60;
    let fixIndex = 2;
    if (leakSec < 10) {
      fixIndex = 3;
    }
    const tempP = Number(((1 - leakSec / 112500) * 100).toFixed(fixIndex));
    if (leakSec === 0) {
      setSmile(Smile8);
    } else if (leakSec > 0 && leakSec <= 12500) {
      setSmile(Smile0);
    } else if (leakSec > 12500 && leakSec <= 25000) {
      setSmile(Smile1);
    } else if (leakSec > 25000 && leakSec <= 37500) {
      setSmile(Smile2);
    } else if (leakSec > 37500 && leakSec <= 50000) {
      setSmile(Smile3);
    } else if (leakSec > 50000 && leakSec <= 62500) {
      setSmile(Smile4);
    } else if (leakSec > 62500 && leakSec <= 75000) {
      setSmile(Smile5);
    } else if (leakSec > 75000 && leakSec <= 87500) {
      setSmile(Smile6);
    } else if (leakSec > 87500 && leakSec <= 100000) {
      setSmile(Smile7);
    } else if (leakSec > 100000 && leakSec <= 112500) {
      setSmile(Smile8);
    }
    setProgress(tempP);
    setTime(`${hour}小时${min}分钟${sec}秒`);
  };

  setInterval(getNewTime, 1000);

  return (
    <div className={styles.mianBox}>
      <img
        src={smile}
        width={200}
        height={200}
        style={{ marginTop: "100px" }}
      />
      <Progress
        type="dashboard"
        percent={progress}
        style={{ marginTop: "50px" }}
      />
      <div>距离周末</div>
      <div className={styles.timeText}>{time}</div>
    </div>
  );
}
