import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const PinkButton = styled(Button)({
  borderRadius: "50px",
  background:
    " var(--gradient-1, linear-gradient(90deg, #FF0080 0%, #AA1CA6 100%))",
  fontFamily: "Outfit",
  fontSize: "20px",
  color: "#fff",
  fontWeight: 400,
  textTransform: "capitalize",
  height: "fit-content",
});
