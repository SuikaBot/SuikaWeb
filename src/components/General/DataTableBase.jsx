import React, { useEffect, useRef } from "react";
import DataTable from "react-data-table-component";

import Checkbox from "@mui/material/Checkbox";

import ArrowDownward from "@mui/icons-material/ArrowDownward";

const DataTableBase = (props) => {
  const sortIcon = <ArrowDownward />;
  const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };

  return (
    <DataTable
      pagination
      //   selectableRowsComponent={Checkbox}
      //   selectableRowsComponentProps={selectProps}
      //   sortIcon={sortIcon}
      //   dense
      {...props}
    />
  );
};

export default DataTableBase;
