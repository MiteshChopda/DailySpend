import { useEffect, useState } from "react";
import RecordsTable from "./Table";
import { BACKEND_URL } from "../config";
import { Alert } from "@mui/material";

export default function Dashboard() {
    const [records, setRecords] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${BACKEND_URL}/api/records/get`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Unauthorized");
                return res.json();
            })
            .then((data) => {
                setRecords(data.data);
                console.log("Dashboard: ", data);
            })
            .catch((err) => setError(err.message));
    }, []);

    if (error) return <Alert severity="error">{error}</Alert>;

    return <RecordsTable _records={records} />;
}
