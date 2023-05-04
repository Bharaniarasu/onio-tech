import axios from "axios";

export const columns = [
  {
    name: "Name",
    selector: (row) => row.Name,
    sortable: true,
  },
  {
    name: " Age/Sex",
    selector: (row) =>
      new Date().getFullYear() -
      new Date(row.Age).getFullYear() +
      " / " +
      row.Sex,
    sortable: true,
  },
  {
    name: "Mobile",
    selector: (row) => row.Mobile,
    sortable: true,
    // cell: (d) => <span>{d.genres.join(", ")}</span>,
  },
  {
    name: "Address",
    selector: (row) => row.Address,
    sortable: true,
  },
  {
    name: " Govt ID",
    selector: (row) => row.IDType + " / " + row.IDNumber,
    sortable: true,
  },
  {
    name: " Guardian Details",
    selector: (row) => row.GuardianLabel + " / " + row.GuardianName,
    sortable: true,
  },
  {
    name: "Nationality",
    selector: (row) => row.Nationality,
    sortable: true,
  },
];
