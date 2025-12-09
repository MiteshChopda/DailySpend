import React, { useState } from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from '@mui/material/Link';
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
    const [rows] = useState(records)
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
    return (
        <TableContainer component={Paper}>
            <Table
                // sx={{ minWidth: 650 }} 
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
                            <TableCell sx={{ display: "flex", alignItems: "center" }} align="right">
                                <CurrencyRupeeIcon fontSize="small" />
                                <Typography >{row.amount}</Typography>
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
                                <Link underline="hover" color="primary" href="/new">
                                <DeleteIcon />
                                </Link>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
