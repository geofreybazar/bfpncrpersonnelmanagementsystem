const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
};

const rank = [
  "FCSUPT",
  "FSSUPT",
  "FSUPT",
  "FCINSP",
  "FSINSP",
  "FINSP",
  "SFO4",
  "SFO3",
  "SFO2",
  "SFO1",
  "FO3",
  "FO2",
  "FO1",
  "NUP",
];

const officerRanks = ["FCSUPT", "FSSUPT", "FSUPT", "FCINSP", "FSINSP", "FINSP"];

const nonOfficerRanks = ["SFO4", "SFO3", "SFO2", "SFO1", "FO3", "FO2", "FO1"];

const tableHeadStyle = [
  { width: "14.28%" },
  { width: "14.28%" },
  { width: "14.28%" },
  { width: "14.28%" },
  { width: "14.28%" },
  { width: "23.56%" },
  { width: "5%" },
];

const newstyle = tableHeadStyle.map((item) => ({
  ...item,
  color: "white",
}));

const tableHeads: string[] = [
  "Account Number",
  "Rank",
  "First Name",
  "Middle Name",
  "Last Name",
  "City Station",
  "Action",
];

export default {
  style,
  rank,
  officerRanks,
  nonOfficerRanks,
  newstyle,
  tableHeads,
};
