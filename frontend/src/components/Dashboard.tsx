import { useEffect, useState } from "react";
import RecordsTable from "./Table.tsx";
import { BACKEND_URL } from "../config.ts";
import { Alert } from "@mui/material";
import { Record, RecordsResponse } from "../types/api.types.ts";

export default function Dashboard() {
  const [records, setRecords] = useState<Record[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/records/get`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res: Response) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data: RecordsResponse) => {
        setRecords(data.data);
        console.log("Dashboard: ", data);
      })
      .catch((err: any) => setError(err instanceof Error ? err.message : "Unknown error"));
  }, []);

  if (error) return <Alert severity="error">{error}</Alert>;

  return <RecordsTable _records={records} />;
}

