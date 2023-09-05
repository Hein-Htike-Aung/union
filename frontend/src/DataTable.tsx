import { TableCell, TableRow } from "@mui/material";
import MUIDataTable, { MUIDataTableProps } from "mui-datatables";

const DataTable = (props: MUIDataTableProps) => {
  const customRowRender = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[],
    _dataIndex: number,
    rowIndex: number
  ) => {
    const rowKey = `${data.join("-")}-${rowIndex}`;
    return (
      <TableRow key={rowKey}>
        {data.map(
          (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            cell: any,
            columnIndex: number
          ) => (
            <TableCell key={columnIndex}>{cell}</TableCell>
          )
        )}
      </TableRow>
    );
  };

  return (
    <MUIDataTable
      {...props}
      options={{
        print: false,
        download: false,
        search: false,
        filter: false,
        viewColumns: false,
        selectableRows: undefined,
        sort: false,
        rowsPerPageOptions: [10, 40, 60, 80],
        ...props.options,
        customRowRender,
      }}
    />
  );
};
export default DataTable;
