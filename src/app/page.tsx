"use client";

import { TiticoTimePicker } from "@/components/titico-time-picker/titico-time-picker";
import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import timeContext from "../context/time-context";
import dayjs, { Dayjs } from "dayjs";
import { TiticoFooter } from "@/components";

export default function Home() {
  const [time, setTime] = useState<Dayjs | null>(null);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(window.innerHeight);
  }, [])

  useEffect(() => {
    const now = dayjs(new Date());

    if (time) {
      const awakeTime =
        time.diff(now, "minute") < 0 ? time.add(1, "day") : time;
      const diffMinutes = awakeTime.diff(now, "minute");
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      setHours(hours);
      setMinutes(minutes);
    }
  }, [time]);

  return (
    <timeContext.Provider value={{ time, setTime }}>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          height: height,
          flexDirection: "column",
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          flex={1}
        >
          {time && (
            <Typography
              lineHeight={"1em"}
              variant="h1"
              fontWeight={"bold"}
              color={(theme) => theme.palette.primary.light}
            >
              {hours.toString().length == 1 ? `0${hours}` : hours}
              <br />
              {minutes.toString().length == 1 ? `0${minutes}` : minutes}
            </Typography>
          )}

          {!time && (
            <Typography
              lineHeight={"1em"}
              variant="h1"
              fontWeight={"bold"}
              color={(theme) => theme.palette.primary.light}
            >
              00
              <br />
              00
            </Typography>
          )}

          <Box display={"flex"} justifyContent={"center"} mt={2}>
            <TiticoTimePicker />
          </Box>
        </Box>
      </Container>
      <TiticoFooter />
    </timeContext.Provider>
  );
}
