"use client"
import React, { useEffect, useState } from "react";
import RootTable from "@/components/common/table/RootTable";
import Image from "next/image";
import Input from "../common/Input";
import { useQuery } from "@apollo/client";
import { GET_RECORDING } from "@/lib/graphql/queries/recording";
import RecordingListModal from "../common/modal/RecordingListModal";

const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 200,
    headerClassName: "table_header",
  },
  {
    field: "date",
    headerName: "Date",
    width: 150,
    headerClassName: "table_header",
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 100,
    headerClassName: "table_header",
  },
  {
    field: "address",
    headerName: "Address",
    width: 250,
    headerClassName: "table_header",
  },
  {
    field: "mobile",
    headerName: "Mobile",
    width: 150,
    headerClassName: "table_header",
  },
  {
    field: "view",
    headerName: "View",
    width: 100,
    renderCell: (params: any) => (
      <button className="bg-transparent">
        <Image src="/eye.png" alt="eye" width={24} height={14} />
      </button>
    ),
  },
];


const RecordingTable: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const {data} = useQuery(GET_RECORDING);
  const rows=convertToRowsFormat(data?.getRecording);
  const [filteredRows, setFilteredRows] = useState<any[]>([]);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(selectedRowId,"selectedRowIdselectedRowId")
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);
    setFilteredRows(
      rows.filter(
        (row) =>
          row.name.toLowerCase().includes(value) ||
          row.address.toLowerCase().includes(value) ||
          row.mobile.includes(value)
      )
    );
  };
  useEffect(() => {
    if (data?.getRecording) {
      const filyterrows = convertToRowsFormat(data.getRecording);
      setFilteredRows(filyterrows);
    }
  }, [data?.getRecording]);

  const handleEyeClick = (id: string) => {
    setSelectedRowId(id);
    setIsModalOpen(true);
  };

  const handleClose=()=>setIsModalOpen(false)

  return (
    <div className="glassmorphic-bg">
      <div className="flex justify-between mb-4">
        <p className="text-xl font-bold">Recording List</p>
        <div className="flex gap-4 searchcontainer">
          <Input
            placeholder="Search Users by Name, Email or Address"
            value={searchText}
            onChange={handleSearch}
            id={"search"}
            label={""}
            name={"search"}
            icon={
              <Image src="/Search.png" alt="search" width={16} height={16} />
            }
          />
          <button className="bg-transparent">
            <Image src="/filter.png" alt="eye" width={20} height={20} />
            <p className="text-xs mt-1 mr-2">Filter</p>
          </button>
        </div>
      </div>
      <div className="text-white">
        <RootTable rows={filteredRows} columns={columns.map((column) =>
            column.field === "view"
              ? {
                  ...column,
                  renderCell: (params: any) => (
                    <button
                      className="bg-transparent"
                      onClick={() => handleEyeClick(params.row.id)}
                    >
                      <Image src="/eye.png" alt="eye" width={24} height={14} />
                    </button>
                  ),
                }
              : column
          )} />
      </div>
      <RecordingListModal isShow={isModalOpen} id={selectedRowId} onClose={handleClose}/>
    </div>
  );
};
 
export default RecordingTable
  
  interface RecordingConnection {
    edges: any[];
    totalCount: number;
  }
  
  // Function to convert GraphQL data to rows format
  const convertToRowsFormat = (data: RecordingConnection) => {
    return data?.edges.map((edge, index) => ({
      id: edge.node.id,
      name: edge.node.patient.fullName,
      date: new Date(edge.node.createdAt).toLocaleDateString(),
      gender: edge.node.patient.gender || "Unknown",
      address: edge.node.patient?.address || "Unknown",
      mobile: edge.node.patient?.phoneNumber|| "Unknown",
    }));
  };
  
  