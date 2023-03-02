import React from "react";
import { ButtonGroup, Button } from "@mui/material";

const VerifiedFilter = ({ column, value, onChange }) => {
  const handleChange = (newValue) => {
    onChange({ ...value, [column.field]: newValue });
  };

  const verifiedButtonSelected = value[column.field] === "verified";
  const unverifiedButtonSelected = value[column.field] === "unverified";
  const allButtonSelected =
    !verifiedButtonSelected && !unverifiedButtonSelected;

  return (
    <ButtonGroup variant="contained" size="small">
      <Button
        onClick={() => handleChange("verified")}
        color={verifiedButtonSelected ? "primary" : "default"}
      >
        Verified
      </Button>
      <Button
        onClick={() => handleChange("unverified")}
        color={unverifiedButtonSelected ? "primary" : "default"}
      >
        Unverified
      </Button>
      <Button
        onClick={() => handleChange("all")}
        color={allButtonSelected ? "primary" : "default"}
      >
        All
      </Button>
    </ButtonGroup>
  );
};

export default VerifiedFilter;
