import { Dayjs } from "dayjs";
import { createContext } from "react";

interface TimeContextType {
    time: Dayjs | null;
    setTime: (time: Dayjs | null) => void;
  }

const timeContext = createContext<TimeContextType>({
    time: null,
    setTime: (time: Dayjs | null) => {} 
});

export default timeContext;