import React from "react";
import Table from "./components/Table";
import { tableData } from "./mock/table";
import "./App.css";

function App() {
    const columns = [
        {
            title: "name",
            dataIndex: "name",
            key: "name",
            width: 100,
            fixed: "left",
        },
        {
            title: "age",
            dataIndex: "age",
            key: "age",
            sortable: true,
            width: 100,
        },
        {
            title: "address",
            dataIndex: "address",
            key: "address",
            width: 200,
        },
        {
            title: "phone",
            dataIndex: "phone",
            key: "phone",
            width: 200,
        },
        {
            title: "email",
            dataIndex: "email",
            key: "email",
            width: 200,
            fixed: "right",
        }
    ];
    return (
        <div className="App">
            <Table dataSource={tableData} columns={columns} scroll={{ x: 600, y: 500}} />
        </div>
    );
}

export default App;
