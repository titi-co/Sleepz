import React, { useContext } from "react";
import { Dayjs } from "dayjs";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  BaseSingleInputFieldProps,
  FieldSection,
} from "@mui/x-date-pickers/models";
import { NightlightOutlined } from "@mui/icons-material";
import { alpha } from "@mui/material";
import {
  MobileTimePicker,
  MobileTimePickerProps,
  TimeView,
} from "@mui/x-date-pickers";
import timeContext from "@/context/time-context";

interface ButtonFieldProps
  extends BaseSingleInputFieldProps<Dayjs | null, Dayjs, FieldSection, any> {
  setOpen?: (value: React.SetStateAction<boolean>) => void;
}

const ButtonField = ({ setOpen }: ButtonFieldProps) => {
  return (
    <Button
      onClick={() => setOpen?.(true)}
      sx={{
        borderRadius: 4,
        px: 4,
        py: 2,
        color: (theme) => theme.palette.primary.contrastText,
        bgcolor: (theme) => theme.palette.primary.main,

        ":hover": {
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.8),
        },
      }}
    >
      <NightlightOutlined />
    </Button>
  );
};

interface ButtonDatePickerProps
  extends Omit<
    MobileTimePickerProps<Dayjs, TimeView>,
    "open" | "onOpen" | "onClose"
  > {}

const ButtonDatePicker = ({ ...props }: ButtonDatePickerProps) => {
  const [open, setOpen] = React.useState(false);
  const { setTime } = useContext(timeContext);

  return (
    <MobileTimePicker
      slots={{
        field: ButtonField,
      }}
      slotProps={{
        field: { setOpen } as any,
      }}
      {...props}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => {
        setTime(null);
        setOpen(true);
      }}
    />
  );
};

export const TiticoTimePicker = () => {
  const { setTime } = useContext(timeContext);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={1}>
        <ButtonDatePicker
          onChange={(value) => {
            setTime(value);
          }}
        />
      </Stack>
    </LocalizationProvider>
  );
};
