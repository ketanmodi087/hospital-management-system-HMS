import { useEffect } from "react";
import { useAppSelector } from "../store/store";
import moment from "moment-timezone";

const useTimezone = () => {
  const { userData } = useAppSelector((state) => state.authReducer);
  useEffect(() => {
    const setTimezone = () => {
      if (userData?.timezone) {
        moment.tz.setDefault(userData.timezone);
      } else {
        moment.tz.setDefault(moment.tz.guess());
      }
    };
    setTimezone(); // Set timezone initially
    return () => {};
  }, [userData]);
};

export default useTimezone;
