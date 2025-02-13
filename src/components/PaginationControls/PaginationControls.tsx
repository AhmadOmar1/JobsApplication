
import React from "react";
import { Pagination, Box } from "@mui/material";

interface IPaginationControlsProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const PaginationControls: React.FC<IPaginationControlsProps> = ({
  count,
  page,
  onChange,
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        color="primary"
      />
    </Box>
  );
};

export default PaginationControls;
