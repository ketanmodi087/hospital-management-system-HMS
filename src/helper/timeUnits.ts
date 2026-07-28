interface TimeUnits {
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

const  convertSeconds = (seconds: number): TimeUnits =>  {
  const units = [
    { name: "month", seconds: 30 * 24 * 60 * 60 },
    { name: "day", seconds: 24 * 60 * 60 },
    { name: "hour", seconds: 60 * 60 },
    { name: "minute", seconds: 60 },
    { name: "second", seconds: 1 },
  ];
  let result: TimeUnits = { month: 0, day: 0, hour: 0, minute: 0, second: 0 };
  for (let unit of units) {
    result[unit.name as keyof TimeUnits] = Math.floor(seconds / unit.seconds);
    seconds %= unit.seconds;
  }
  return result;
}
export default convertSeconds