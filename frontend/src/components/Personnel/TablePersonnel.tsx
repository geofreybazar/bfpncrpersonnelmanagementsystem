import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clickedPersonnelActions } from "../../store/clickedPersonnelSlice";
import useGetAllPersonnel from "../../hooks/useGetAllPersonnel";

import EditIcon from "@mui/icons-material/Edit";
import { Skeleton } from "@mui/material/";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  // TablePagination,
  TableRow,
} from "@mui/material/";

type TableHead = string[];

const tableHeadStyle = {
  color: "white",
  width: "14.28%",
};

const tableHeads: TableHead = [
  "Account Number",
  "Rank",
  "First Name",
  "Middle Name",
  "Last Name",
  "City Station",
  "Action",
];

const TablePersonnel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allPersonnel, isLoadingGetAllPersonnel } = useGetAllPersonnel();
  console.log(allPersonnel);
  if (isLoadingGetAllPersonnel) {
    return (
      <>
        <Skeleton variant="rectangular" width="100%" height={50} />
      </>
    );
  }

  const handleViewPersonnelDetails = (id: string) => {
    dispatch(clickedPersonnelActions.setClickedPersonnel(id));
    navigate("/personnel/viewpersonnel");
  };

  return (
    <div>
      <TableContainer>
        <Table size="small">
          <TableHead className="bg-turquoise">
            <TableRow>
              {tableHeads.map((head, index) => (
                <TableCell key={index} style={tableHeadStyle}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {allPersonnel?.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{data.accountNumber}</TableCell>
                <TableCell>{data.rank}</TableCell>
                <TableCell>{data.firstName}</TableCell>
                <TableCell>{data.middleName}</TableCell>
                <TableCell>{data.lastName}</TableCell>
                <TableCell>{data.city}</TableCell>
                <TableCell>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleViewPersonnelDetails(data.id)}
                  >
                    <EditIcon />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TablePersonnel;
