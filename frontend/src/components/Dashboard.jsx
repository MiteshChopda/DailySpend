import React, { useState, useEffect } from 'react';
import Table from './Table'
import {BACKEND_URL} from '../config'
const Dashboard = () => {

    /*  api response:

    {
        success: true || false,
        data: [
            {
                amount: 1250,
                changeInBalance: "spent",
                created_at: "2025-12-12T08:22:01.536Z",
                title: "Campus Sliders",
                __v: 0,
                _id: "693bd0a9fb6b02509adcae03"
            },
            ...
        ]
    }
    */
    const [transactions, setTransactions] = useState([]);
    const [dataIsLoaded, setDataIsLoaded] = useState(false);

    useEffect(() => {
        fetch(`${BACKEND_URL}/api/records/get`)
            .then((res) => res.json())
            .then((data) => {
                console.log("json: ", data);
                setTransactions(data.data);
                setDataIsLoaded(true);
            }).catch(e => { console.log(e); console.error(e); });
    }, []);


    if (!dataIsLoaded) {
        return (
            <div>
                <h1>Please wait some time....</h1>
            </div>
        );
    }

    return (
        <>
            <Table records={transactions} ></Table>
        </>
    )
}
export default Dashboard;