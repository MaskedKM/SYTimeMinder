import { Progress, Button, Modal } from "antd";
import "antd/dist/antd.css";
import { useEffect, useRef, useState } from "react";
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
import PlayIcon from "../assets/PlayCircle.png";
import PauseIcon from "../assets/PauseCircle.png";
import request from "umi-request";

export default function Layout() {
  const [progress, setProgress] = useState<number>();
  const [smile, setSmile] = useState<string>();
  const audioObj = useRef(new Audio());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [leakDay, setLeakDay] = useState(0);
  const [workDay, setWorkDay] = useState(0);
  const [hourStr, setHourStr] = useState(0);
  const [minStr, setMinStr] = useState(0);
  const [secStr, setSecStr] = useState(0);

  const smileArray = [
    Smile0,
    Smile1,
    Smile2,
    Smile3,
    Smile4,
    Smile5,
    Smile6,
    Smile7,
    Smile8,
  ];

  const getNewTime = () => {
    let leakTime = 0;
    const timeNow = new Date();
    const time9 = new Date(new Date().setHours(9, 0, 0, 0));
    const time1145 = new Date(new Date().setHours(11, 45, 0, 0));
    const time14 = new Date(new Date().setHours(14, 0, 0, 0));
    const time1730 = new Date(new Date().setHours(17, 30, 0, 0));
    if (leakDay > 0) {
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
        leakTime = time1730.getTime() - timeNow.getTime();
      } else {
        leakTime = 0;
      }
      leakTime += (leakDay - 1) * 22500000;
    }
    const leakSec = Math.floor(leakTime / 1000);
    const hour = Math.floor(leakSec / 3600);
    const min = Math.floor((leakSec - hour * 3600) / 60);
    const sec = leakSec - hour * 3600 - min * 60;
    let fixIndex = 2;
    if (leakSec < 10) {
      fixIndex = 3;
    }
    const totalWorkTime = workDay * 22500;
    const workTimePart = workDay * 2500;
    const tempP = Number(
      ((1 - leakSec / totalWorkTime) * 100).toFixed(fixIndex)
    );
    if (leakSec === 0) {
      if (smile !== Smile8) {
        setSmile(Smile8);
      }
    } else {
      for (let i = 0; i < 9; i++) {
        if (leakSec > workTimePart * i && leakSec <= workTimePart * (i + 1)) {
          if (smile !== smileArray[i]) {
            setSmile(smileArray[i]);
          }
          break;
        }
      }
    }
    if (tempP !== progress) {
      setProgress(tempP);
    }
    if (hour !== hourStr) {
      setHourStr(hour);
    }
    if (min !== minStr) {
      setMinStr(min);
    }
    if (sec !== secStr) {
      setSecStr(sec);
    }
  };

  setInterval(getNewTime, 1010);

  useEffect(() => {
    audioObj.current = new Audio("/loser.mp3");
    audioObj.current.loop = true;
    audioObj.current.autoplay = true;
    const promise = audioObj.current.play();
    if (promise !== undefined) {
      promise
        .then((_) => {
          setIsPaused(false);
        })
        .catch((error) => {
          setIsModalOpen(true);
        });
    }
  }, []);

  useEffect(() => {
    const getDayData = async () => {
      const res1 = await request.get("/api/date/getLeakDay");
      if (res1.code === 200) {
        setLeakDay(res1.data);
      }
      const res2 = await request.get("/api/date/getWorkDay");
      if (res2.code === 200) {
        setWorkDay(res2.data);
      }
    };
    getDayData();
  }, []);

  return (
    <div className={styles.mianBox}>
      <div className={styles.Horizaontal}>
        {progress === 100 ? "工作爱咋咋滴" : "工作非你不可"}
      </div>
      <div className={styles.topImg}>
        <div className={styles.antitheticalCouplet}>
          {progress === 100 ? "周末爱你" : "工作爱你"}
        </div>
        <img src={smile} width={180} height={180} className={styles.smileImg} />
        <div className={styles.antitheticalCouplet}>
          {progress === 100 ? "你爱周末" : "你爱工作"}
        </div>
      </div>
      <Progress
        type="dashboard"
        percent={progress}
        style={{ marginTop: "30px" }}
      />
      <div>距离周末</div>
      <div
        className={styles.timeText}
      >{`${hourStr}时${minStr}分${secStr}秒`}</div>
      <img
        src={isPaused ? PlayIcon : PauseIcon}
        width={50}
        height={50}
        onClick={() => {
          if (audioObj.current.paused) {
            audioObj.current.play();
            setIsPaused(false);
          } else {
            audioObj.current.pause();
            setIsPaused(true);
          }
        }}
        style={{ cursor: "pointer" }}
        className={styles.audioButton}
      />
      <Modal
        open={isModalOpen}
        onOk={() => {
          audioObj.current.play();
          setIsPaused(false);
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsPaused(true);
          setIsModalOpen(false);
        }}
        title={"Confirm"}
      >
        Do you want to play automatically?
      </Modal>
    </div>
  );
}
