import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Skeleton,
  Tooltip,
} from "@mui/material/";
import variables from "../../../utilities/variables";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import useGetAllPersonnel from "../../../hooks/useGetAllPersonnel";

interface DefaultTableProps {
  handleViewPersonnelDetails: (id: string) => void;
}

const DefaultTable: React.FC<DefaultTableProps> = ({
  handleViewPersonnelDetails,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { allPersonnel, isLoadingGetAllPersonnel } = useGetAllPersonnel({
    page,
    rowsPerPage,
  });

  if (isLoadingGetAllPersonnel) {
    return (
      <>
        <Skeleton variant="rectangular" width="100%" height={50} />
      </>
    );
  }

  return (
    <TableContainer>
      <Table size="small">
        <TableHead className="bg-turquoise">
          <TableRow>
            {variables.tableHeads.map((head, index) => (
              <TableCell key={index} style={variables.newstyle[index]}>
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {allPersonnel.personnel.map((data, index) => (
            <TableRow key={index}>
              <TableCell>{data.accountNumber}</TableCell>
              <TableCell>{data.rank}</TableCell>
              <TableCell>{data.firstName}</TableCell>
              <TableCell>{data.middleName}</TableCell>
              <TableCell>{data.lastName}</TableCell>
              <TableCell>{data.city}</TableCell>
              <TableCell>
                <Tooltip title="View personnel">
                  <div
                    className="cursor-pointer hover:text-darBlue2"
                    onClick={() => handleViewPersonnelDetails(data.id)}
                  >
                    <FaEye />
                  </div>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={allPersonnel.personnelLength}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default DefaultTable;
