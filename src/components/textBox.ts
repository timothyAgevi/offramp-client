import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

export const CustomTextField = styled(TextField)({
  backgroundColor: "#grey",
  "& label.Mui-focused": {
    color: "#FF4422",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#FF4422",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "12px",
      borderColor: "#FF4422",
    },
    "&:hover fieldset": {
      borderColor: "#FF4422",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FF4422",
    },
  },
  ".MuiInputBase-root": {
    backgroundColor: "#grey",
  },
  "& .MuiSelect-icon": {
    color: "#fff",
  },
});
