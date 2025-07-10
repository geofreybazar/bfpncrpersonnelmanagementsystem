import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Filter from "./Filter/Filter";
import DefaultTable from "./Table/DefaultTable";
import FilteredTable from "./Table/FilteredTable";

const TablePersonnel = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();
  const filteredPersonnel = useSelector(
    (state: RootState) => state.personnel.personnel
  );

  const handleViewPersonnelDetails = useCallback(
    (id: string) => {
      navigate(`/personnel/${id}`);
    },
    [navigate]
  );

  return (
    <div>
      <Filter page={page} rowsPerPage={rowsPerPage} />
      {filteredPersonnel ? (
        <FilteredTable
          filteredPersonnel={filteredPersonnel}
          handleViewPersonnelDetails={handleViewPersonnelDetails}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      ) : (
        <DefaultTable handleViewPersonnelDetails={handleViewPersonnelDetails} />
      )}
    </div>
  );
};

export default TablePersonnel;
