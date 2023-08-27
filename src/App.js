import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import "./App.css";
import DB from "./DB";
import { useState } from "react";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DomainIcon from "@mui/icons-material/Domain";
import HailIcon from "@mui/icons-material/Hail";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "theme.palette.action.hover",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#ECECEC", // Specify the color you want on hover
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  outline: "none",
  border: "none",
};

function App() {
  const [search, setSearch] = useState("");
  const [mappedData, setMappedData] = useState(DB);

  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const handleOpen = (item) => {
    setOpen(true);
    setModalData(item);
  };
  const handleClose = () => setOpen(false);

  const userSearchInput = (e) => {
    setSearch(e.target.value);
    // console.log(search)
    if (e.target.value === "") {
      setMappedData(DB);
    }
  };

  const handleSearchBtn = () => {
    const filterUserData = DB.filter((item) => {
      return (
        item.first_name.toLowerCase().includes(search.toLowerCase()) ||
        item.last_name.toLowerCase().includes(search.toLowerCase()) ||
        item.position.toLowerCase().includes(search.toLowerCase()) ||
        item.department.toLowerCase().includes(search.toLowerCase()) ||
        item.salary.toString().includes(search.toLowerCase()) ||
        item.employee_id.toLowerCase().includes(search.toLowerCase())
      );
    });
    setMappedData(filterUserData);
  };

  return (
    <div className="app-div">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={{ maxWidth: 345 }} style={style}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {modalData?.first_name} {modalData?.last_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <b>
                  <HailIcon className="modalIcons" /> Position
                </b>{" "}
                : {modalData?.position}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <b>
                  <DomainIcon className="modalIcons" /> Department
                </b>{" "}
                : {modalData?.department}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <b>
                  <AttachMoneyIcon className="modalIcons" /> Salary
                </b>{" "}
                : {modalData?.salary}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ paddingTop: "1rem" }}
              >
                {modalData?.first_name} {modalData?.last_name}{" "}
                {modalData?.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Modal>
      <h1>Employee Register Book</h1>

      <div class="searchbar">
        <input
          type="text"
          placeholder="Type here ..."
          value={search}
          onChange={userSearchInput}
        />
        <Button
          variant="contained"
          onClick={handleSearchBtn}
          style={{ backgroundColor: "#111" }}
        >
          Search
        </Button>
      </div>

      <div className="userData">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Employee Id</StyledTableCell>
                <StyledTableCell align="right">First Name</StyledTableCell>
                <StyledTableCell align="right">Last Name</StyledTableCell>
                <StyledTableCell align="right">Position</StyledTableCell>
                <StyledTableCell align="right">Department</StyledTableCell>
                <StyledTableCell align="right">Salary</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mappedData.map((row, index) => (
                <StyledTableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => handleOpen(row)}
                >
                  <StyledTableCell component="th" scope="row">
                    {row.employee_id}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row?.first_name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row?.last_name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row?.position}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row?.department}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row?.salary}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default App;
