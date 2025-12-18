import React, { useState } from "react";

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


/*
records:[
    {
        amount: 1250,
        changeInBalance: "spent",
        created_at: "2025-12-12T08:22:01.536Z",
        title: "Campus Sliders",
        __v: 0,
        _id: "693bd0a9fb6b02509adcae03"
    },
    ...]
*/
export default function SimpleTable({ records }) {
    const [rows, setRows] = useState(records)
    const Columns = [
        {
            name: "Record Title",
            id: "title", // to uniquly identify coln in future
        },
        {
            name: "Amount",
            id: "amount", // to uniquly identify coln in future
        },
        {
            name: "Change",
            id: "changeInBalance", // to uniquly identify coln in future
        },
        {
            name: "Date",
            id: "created_at", // to uniquly identify coln in future
        },
        {
            name: "Action",
            id: "action", // to uniquly identify coln in future
        }

    ]

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
        fetch('https://dst-api-two.vercel.app/api/records/delete/' + id, {
            method: 'DELETE',
        })
            .then(res => { res.json(); })
            .then(data => {
                console.log("delete res:", data)
                setRows((prevRows) =>
                    prevRows.filter((row) => row._id !== id)
                );
                window.alert(title + " deleted!")
            })
            .catch(err => window.alert(err))

    }
    return (
        <>
            <TableContainer component={Paper}>
                <Table
                    sx={{ gap: 0 }}
                    aria-label="simple table">

                    <TableHead>
                        <TableRow>
                            {Columns.map(col => (
                                <TableCell align={col.id != "title" ? "right" : ""} key={col.id}>
                                    <Typography

                                        sx={{ color: "black", fontWeight: "bold" }} >
                                        {col.name}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
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
                                <TableCell align="right">{new Date(row.created_at).toLocaleDateString(
                                    "en-GB",
                                    { day: "numeric", month: "short" }
                                )}
                                </TableCell>

                                {/* action */}
                                <TableCell align="right">

                                    <IconButton color="primary" onClick={() => {
                                        handleDeleteClickOpen(row)
                                    }}>
                                        <DeleteIcon />
                                    </IconButton>

                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer >

            <Dialog
                open={openDeleteDialog}
                TransitionComponent={Fade}
                slotProps={{
                    backdrop: {
                        sx: {
                            backgroundColor: '#352f2f71', // Adjust opacity (0-1)
                        }
                    }, paper: {
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
                    <Button
                        onClick={() => {
                            handleDeleteClose();
                            handleDelete(selectedRow._id, selectedRow.title);
                        }}
                        autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
