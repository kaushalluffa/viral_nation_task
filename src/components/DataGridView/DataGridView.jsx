import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 284,
    editable: true,
    // getActions: (params) => [
    //   <GridActionsCellItem
    //     key={0}
    //     icon={<MoreVertIcon titleAccess={"edit"} />}
    //     label={"edit"}
    //     onClick={() => console.log(params)}
    //   />,
    // ],
    renderHeader: (params) => {
      return (
        <Paper
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            // justifyContent: "space-between",
            alignItems: "center",
            padding: 1,
            gap: 1,
          }}
          elevation={1}
        >
          {params.colDef.headerName}
        </Paper>
      );
    },
    renderCell: (params) => {
      return (
        <Paper
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            // justifyContent: "space-between",
            alignItems: "center",
            padding: 1,
            gap: 1,
          }}
          square
        >
          <Avatar
            src="https://source.unsplash.com/random"
            aria-label="avatar"
          ></Avatar>
          <Typography variant="body2">{params.value}</Typography>
        </Paper>
      );
    },
  },
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "email",
    headerName: "Email",
    width: 180,
    editable: true,
  },
  {
    field: "description",
    headerName: "Description",
    headerAlign: "left",
    flex: 1,
    width: 732,
    editable: true,
    renderCell: (params) => {
      return (
        <Box height="64px" whiteSpace="pre-line">
          {params.value}
        </Box>
      );
    },
  },
  {
    field: "actions",
    headerName: "actions",
    sortable: false,
    width: 52,
    //this method will return icon for the rows
    // getActions: (params) => [
    //   <GridActionsCellItem
    //     key={0}
    //     icon={<MoreVertIcon titleAccess={"edit"} />}
    //     label={"edit"}
    //     onClick={() => console.log(params)}
    //   />,
    // ],
    renderHeader: (params) => <SettingsIcon />,
    renderCell: (params) => {
      return <MoreVertIcon />;
    },
  },
];
const rows = [
  {
    id: 1,
    name: "kaushal",
    email: "email@email.com",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet porta tincidunt massa id quam pharetra. Massa vitae feugiat vulputate et praesent nisl neque nunc tortor.",
    actions: "actions",
  },
  {
    id: 2,
    name: "kaushal",
    email: "email@email.com",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet porta tincidunt massa id quam pharetra. Massa vitae feugiat vulputate et praesent nisl neque nunc tortor.",
    actions: "actions",
  },
  {
    id: 3,
    name: "kaushal",
    email: "email@email.com",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet porta tincidunt massa id quam pharetra. Massa vitae feugiat vulputate et praesent nisl neque nunc tortor.",
    actions: "actions",
  },
  {
    id: 4,
    name: "kaushal",
    email: "email@email.com",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet porta tincidunt massa id quam pharetra. Massa vitae feugiat vulputate et praesent nisl neque nunc tortor.",
    actions: "actions",
  },
  {
    id: 5,
    name: "kaushal",
    email: "email@email.com",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet porta tincidunt massa id quam pharetra. Massa vitae feugiat vulputate et praesent nisl neque nunc tortor.",
    actions: "actions",
  },
  {
    id: 6,
    name: "kaushal",
    email: "email@email.com",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet porta tincidunt massa id quam pharetra. Massa vitae feugiat vulputate et praesent nisl neque nunc tortor.",
    actions: "actions",
  },
  {
    id: 7,
    name: "kaushal",
    email: "email@email.com",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet porta tincidunt massa id quam pharetra. Massa vitae feugiat vulputate et praesent nisl neque nunc tortor.",
    actions: "actions",
  },
  {
    id: 8,
    name: "kaushal",
    email: "email@email.com",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet porta tincidunt massa id quam pharetra. Massa vitae feugiat vulputate et praesent nisl neque nunc tortor.",
    actions: "actions",
  },
  {
    id: 9,
    name: "kaushal",
    email: "email@email.com",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet porta tincidunt massa id quam pharetra. Massa vitae feugiat vulputate et praesent nisl neque nunc tortor.",
    actions: "actions",
  },
  {
    id: 10,
    name: "kaushal",
    email: "email@email.com",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet porta tincidunt massa id quam pharetra. Massa vitae feugiat vulputate et praesent nisl neque nunc tortor.",
    actions: "actions",
  },
];

const DataGridView = ({fetchedData}) => {
  return (
    <Stack
      height="70vh"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
          backgroundColor: "#fff",
        },

        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .MuiDataGrid-columnHeaders": {
          borderBottom: "none",
        },
        "& .MuiDataGrid-columnHeader": {
          borderBottom: "none",
          backgroundColor: "#fff",
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
        },
        "& .MuiSvgIcon-root": {
          display: "none",
        },
        "& .custom-header": {
          border: "none",
        },
      }}
    >
      <Stack></Stack>
      <DataGrid
        rows={fetchedData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        autoHeight
        cellClassName="custom-header"
      />
    </Stack>
  );
};

export default DataGridView;
