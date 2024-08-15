export const tablestyle={
    border: "none",
    "& .MuiDataGrid-cell": {
        color: '#fff',
    //   border: "none",
      "&:focus": {
        outline: "none",
      },
      "&:focus-within": {
        outline: "none",
      },
    },
    "& .MuiDataGrid-row": {
      borderBottom: "none",
      "&:focus": {
        outline: "none",
      },
      "&:focus-within": {
        outline: "none",
      },
    },
    "& .MuiDataGrid-columnSeparator": {
      display: "none",
    },
    "& .MuiDataGrid-cell--editable": {
      outline: "none",
    },
    "& .MuiDataGrid-cell:focus": {
      outline: "none",
    },
    "& .MuiDataGrid-cell:focus-within": {
      outline: "none",
    },
    "& .MuiDataGrid-columnHeaders": {
      border: "none",
      color: "#18357A", // Text color for the headers
      fontSize: "14px", // Font size for the headers
      fontWeight: 600, // Font weight for the headers\
      backgroundColor: '#6200ea',
    },

      '& .MuiDataGrid-footerContainer': {
        backgroundColor: '#6200ea',
      },
      '& .MuiDataGrid-row:hover': {
        backgroundColor: '#6200ea22',
      },
      '& .css-1oudwrl':{
        backgroundColor:"transparent !important",
        position:"static !important"
      },
  }