import { Button, Container, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { UserRoleContext } from "../contexts/UserRoleContext";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

export default function UserRoleTable() {
  const [userRoles, setUserRoles, URL] = useContext(UserRoleContext);

  useEffect(() => {
    fetchUserRoles();
  }, []);

  async function fetchUserRoles() {
    const FETCHED_DATA = await fetch(URL);
    const FETCHED_JSON = await FETCHED_DATA.json();
    setUserRoles(FETCHED_JSON);
  }

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "user_role_name", headerName: "Role name", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box>
            <Link to={`/editproduct/${params.row.id}`}>
              <Button color={"info"} variant={"outlined"}>
                <AutoFixHighOutlinedIcon />
              </Button>
            </Link>{" "}
            <Button color={"error"} variant={"contained"}>
              <DeleteOutlineIcon />
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Container style={{ height: 400, width: "50%" }}>
      <Typography variant="h3" sx={{ marginBottom: 3, marginTop: 10 }}>
        User Roles
      </Typography>
      <DataGrid
        rows={userRoles}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </Container>
  );
}
