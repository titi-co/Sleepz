import { Box, Typography } from "@mui/material";
import { LuGhost } from "react-icons/lu";

export const TiticoFooter = ({}) => {
  return (
    <Box
      bgcolor={(theme) => theme.palette.primary.main}
      width={"100%"}
      position={"fixed"}
      bottom={0}
      p={2}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography color={(theme) => theme.palette.primary.contrastText}>
        Get some sleep by{" "}
        <Box component={"span"}>
          <LuGhost />
        </Box>{" "}
        titico.
      </Typography>
    </Box>
  );
};
