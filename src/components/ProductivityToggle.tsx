import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { FunctionComponent } from "react";

interface ProductivityToggleProps {
  productivityState: "work" | "break";
  handleChangeProductivityState: (
    event: React.MouseEvent<HTMLElement>,
    newProductivityState: "work" | "break"
  ) => void;
}

export const ProductivityToggle: FunctionComponent<ProductivityToggleProps> = ({
  productivityState,
  handleChangeProductivityState,
}) => {
  return (
    <ToggleButtonGroup
      color="primary"
      value={productivityState}
      exclusive
      onChange={handleChangeProductivityState}
      aria-label="Platform"
      sx={{
        display: "flex",
        marginBottom: "20px",
        justifyContent: "center",
        "& .MuiToggleButton-root.Mui-selected": {
          color: "black",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <ToggleButton value="work">Work</ToggleButton>
      <ToggleButton value="break">Break</ToggleButton>
    </ToggleButtonGroup>
  );
};
