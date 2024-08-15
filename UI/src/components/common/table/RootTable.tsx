// RootTable.tsx
import React from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { tablestyle } from '@/styles/globalstyle';

interface RootTableProps {
  rows: GridRowsProp;
  columns: GridColDef[];
  rowHeight?: number;
}

const RootTable: React.FC<RootTableProps> = ({ rows = [], columns = []}) => {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight // Adjust height based on content
        pageSizeOptions={[rows.length]} // Set page size options
        hideFooter // Hide footer
        disableColumnMenu // Disable column menu
        sx={{
          ...tablestyle,
          '& .MuiDataGrid-columnHeaders': {
            background: 'rgba(255, 255, 255, 0.1) !important',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '10px',
            color:"white"
          },
        }}
      />
    </div>
  );
};

export default RootTable;
