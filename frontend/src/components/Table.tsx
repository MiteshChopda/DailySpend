import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config.ts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Pagination,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Record } from "../types/api.types.ts";

interface RecordsTableProps {
  _records: Record[];
}

export default function RecordsTable({ _records }: RecordsTableProps) {
  const [rows, setRows] = useState<Record[]>(_records);
  const rowsPerPage = 10;
  const [page, setPage] = useState(1);

  useEffect(() => {
    setRows(_records);
  }, [_records]);

  useEffect(() => {
    console.log("Table: ", rows);
  }, [rows]);

  const paginated = rows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Record | null>(null);
  const handleDeleteClickOpen = (row: Record) => {
    setSelectedRow(row);
    setOpenDeleteDialog(true);
  };
  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
  };

  const deleteRecord = async (id: string): Promise<void> => {
    const token: string | null = localStorage.getItem("token");
    await fetch(`${BACKEND_URL}/api/records/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token || ""}`,
      },
    });
    setRows(rows.filter((r: Record) => r._id !== id));
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Change</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>

        <TableBody>
          {paginated.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.title}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">
                <Typography
                  color={row.changeInBalance !== "spent" ? "green" : "red"}
                >
                  {row.changeInBalance}
                </Typography>
              </TableCell>
              <TableCell align="right">
                {new Date(row.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  color="primary"
                  onClick={() => {
                    handleDeleteClickOpen(row);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        count={Math.ceil(rows.length / rowsPerPage)}
        page={page}
        onChange={(_, v) => setPage(v)}
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
      <Dialog
        open={openDeleteDialog}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "#352f2f71",
            },
          },
          paper: {
            sx: {
              borderRadius: "15px",
            },
          },
        }}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Record"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do You want to delete {selectedRow != null ? selectedRow.title : ""}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleDeleteClose();
              if (selectedRow) {
                deleteRecord(selectedRow._id);
              }
            }}
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

