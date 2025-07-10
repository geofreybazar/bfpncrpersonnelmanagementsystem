import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Tooltip,
} from "@mui/material/";

import { FaEye } from "react-icons/fa";
import variables from "../../../utilities/variables";
import { ReturnedGetFilteredPersonnel } from "../../../utilities/models";

interface FilteredTableProps {
  filteredPersonnel: ReturnedGetFilteredPersonnel;
  handleViewPersonnelDetails: (id: string) => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const FilteredTable: React.FC<FilteredTableProps> = ({
  filteredPersonnel,
  handleViewPersonnelDetails,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}) => {
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
          {filteredPersonnel.searchedPersonnelLength === 0 ? (
            <TableRow>
              <TableCell colSpan={7}>
                <p className="text-center italic font-semibold">
                  No Personnel Found!
                </p>
              </TableCell>
            </TableRow>
          ) : (
            filteredPersonnel.searchedPersonnel.map((data, index) => (
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
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={filteredPersonnel.searchedPersonnelLength}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default FilteredTable;
