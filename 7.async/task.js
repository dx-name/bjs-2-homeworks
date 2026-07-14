class AlarmClock {
  constructor() {
    this.alarmCollection = [];
    this.intervalId = null;
  }

  addClock(time, callback) {
    if (time === undefined || time === null || callback === undefined || callback === null) {
      throw new Error('Отсутствуют обязательные аргументы');
    }

    const exists = this.alarmCollection.some(alarm => alarm.time === time);
    if (exists) {
      console.warn('Уже присутствует звонок на это же время');
      return;
    }

    const alarm = {
      callback: callback,
      time: time,
      canCall: true
    };

    this.alarmCollection.push(alarm);
  }

  removeClock(time) {
    this.alarmCollection = this.alarmCollection.filter(alarm => alarm.time !== time);
  }

  getCurrentFormattedTime() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const hh = String(h).padStart(2, '0');
    const mm = String(m).padStart(2, '0');
    return `${hh}:${mm}`;
  }

  start() {
    if (this.intervalId !== null) {
      return;
    }

    this.intervalId = setInterval(() => {
      const currentTime = this.getCurrentFormattedTime();

      this.alarmCollection.forEach(alarm => {
        if (alarm.time === currentTime && alarm.canCall === true) {
          alarm.canCall = false;
          try {
            alarm.callback();
          } catch (e) {
            console.error('Ошибка в callback будильника:', e);
          }
        }
      });
    }, 1000);
  }

  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  resetAllCalls() {
    for (let i = 0; i < this.alarmCollection.length; i++) {
      this.alarmCollection[i].canCall = true;
    }
  }

  clearAlarms() {
    this.stop();
    this.alarmCollection = [];
  }
}
