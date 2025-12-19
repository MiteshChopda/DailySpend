import React, { useState } from "react";
import { BACKEND_URL } from '../config.js'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Fade from '@mui/material/Fade';
import Pagination from '@mui/material/Pagination';

/* records:[ { amount: 1250, changeInBalance: "spent", created_at: "2025-12-12T08:22:01.536Z", title: "Campus Sliders", __v: 0, _id: "693bd0a9fb6b02509adcae03" },...] */
export default function SimpleTable({ records }) {
    const [rows, setRows] = useState(records)
    const Columns = [
        { name: "Record Title", id: "title", },
        { name: "Amount", id: "amount", },
        { name: "Change", id: "changeInBalance", },
        { name: "Date", id: "created_at", },
        { name: "Action", id: "action", }
    ]
    const rowsPerPage = 10;
    const totalPages = Math.ceil(rows.length / rowsPerPage);
    const [page, setPage] = useState(0);
    const slicedRows = rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    const handlePageChange = (event, value) => {
        setPage(value - 1);
    };

    // Delete Record
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const handleDeleteClickOpen = (row) => {
        setSelectedRow(row);
        setOpenDeleteDialog(true);
    };
    const handleDeleteClose = () => {
        setOpenDeleteDialog(false);
    };
    const handleDelete = (_id, title) => {
        const id = _id
        fetch(`${BACKEND_URL}/api/records/delete/` + id, {
            method: 'DELETE',
        })
            .then(res => {
                res.json();
            })
            .then(data => {
                console.log("delete res:", data)
                setRows((prevRows) => prevRows.filter((row) => row._id !== id));
                window.alert(title + " deleted!")
            })
            .catch(err => window.alert(err))
    }


    return (
        <>
            <TableContainer component={Paper} sx={{ mb: 2 }}>
                <Table sx={{ gap: 0 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            {Columns.map(col => (
                                <TableCell align={col.id != "title" ? "right" : ""} key={col.id}>
                                    <Typography sx={{ color: "black", fontWeight: "bold" }} >
                                        {col.name}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {slicedRows.map((row) => (
                            <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                {/* title */}
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                {/* amount */}
                                <TableCell align="right">
                                    {row.amount}
                                </TableCell>
                                {/* change */}
                                <TableCell align="right">
                                    <Typography color={row.changeInBalance != "spent" ? "green" : "red"} >
                                        {row.changeInBalance}
                                    </Typography>
                                </TableCell>
                                {/* date */}
                                <TableCell align="right">{
                                    new Date(row.created_at)
                                        .toLocaleDateString("en-GB", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric"
                                        })}
                                </TableCell>
                                {/* action */}
                                <TableCell align="right">
                                    <IconButton color="primary" onClick={() => { handleDeleteClickOpen(row) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={totalPages}
                page={page + 1}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
            />
            <Dialog
                open={openDeleteDialog}
                TransitionComponent={Fade}
                slotProps={{
                    backdrop: {
                        sx: {
                            backgroundColor: '#352f2f71',
                        }
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
                <DialogTitle id="alert-dialog-title">
                    {"Delete Record"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do You want to delete {selectedRow != null ? selectedRow.title : ""}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose}>Cancel</Button>
                    <Button onClick={() => { handleDeleteClose(); handleDelete(selectedRow._id, selectedRow.title); }} autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}