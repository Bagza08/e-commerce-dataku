import AllInboxIcon from "@mui/icons-material/AllInbox";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PaidIcon from "@mui/icons-material/Paid";
import { Avatar, Badge, Box, Button, Grid, Typography } from "@mui/material";
import { Montserrat } from "next/font/google";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useCustomers } from "@/hooks/customers";
import { TCustomer } from "@/lib/customers";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import CustomizedDialogs from "@/components/modal";
// import Swal from "sweetalert2";

const montserrat = Montserrat({ subsets: ["latin"] });
const blueFont = "#5D87FF";

const items = [
  {
    title: "Customers",
    icon: <GroupIcon sx={{ color: "black", fontSize: "20px" }} />,
    link: "/dashboard-admin/customers",
  },
  {
    title: "Transaction",
    icon: <PaidIcon sx={{ color: "black", fontSize: "20px" }} />,
    link: "/dashboard-admin/transactions",
  },
];

export default function DashboardAdmin() {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [selectedCustomer, setSelectedCustomer] =
    React.useState<TCustomer | null>(null);

  const handleClickOpen = (customer: TCustomer) => {
    setSelectedCustomer(customer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    // Cek apakah ada data 'user' di localStorage
    const user = localStorage.getItem("user");

    if (!user) {
      router.replace("/login");
    }
  }, [router]);

  const { query, remove } = useCustomers();

  const handleRemove = (id: string, name: string) => {
    Swal.fire({
      title: `Apakah kamu yakin ingin menghapus ${name} ini?`,
      showCancelButton: true,
      confirmButtonText: "Iya, saya yakin",
      confirmButtonColor: "#d32f2f",
      cancelButtonColor: "#9e9e9e",
    }).then((result) => {
      if (result.isConfirmed) {
        remove.mutate(id);

        Swal.fire("Data berhasil dihapus", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        sx={{
          backgroundColor: "white",
          p: 2,
          borderRightColor: "#D9D9D9",
          borderRightWidth: 1,
        }}
        size={{ xs: 6, md: 1.5 }}
        flexDirection={"column"}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <AllInboxIcon sx={{ color: blueFont, fontSize: "45px" }} />
          <Typography
            onClick={() => {
              window.location.href = "/";
            }}
            variant="h4"
            sx={{
              cursor: "pointer",
              color: blueFont,
              fontWeight: "bold",
              fontFamily: montserrat.style,
            }}
          >
            DataKu
          </Typography>
        </Box>
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              mt: index === 0 ? 8 : 2,
              bgcolor: "#D9D9D9",
            }}
          >
            <Button
              variant="text"
              fullWidth
              sx={{
                color: "black",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => {
                window.location.href = item.link;
              }}
            >
              {item.icon}
              {item.title}
            </Button>
          </Box>
        ))}
      </Grid>
      <Grid sx={{ backgroundColor: "white" }} size={{ xs: 6, md: 10.5 }}>
        <Grid
          sx={{ backgroundColor: "white", p: 3, height: "80px" }}
          size={{ xs: 6, md: 12 }}
          flexDirection={"row"}
          container
          justifyContent={"space-between"}
        >
          <Grid size={{ xs: 6, md: 1 }}>
            <Badge badgeContent={4} color="primary">
              <NotificationsIcon color="action" sx={{ fontSize: "30px" }} />
            </Badge>
          </Grid>
          <Grid
            size={{ xs: 6, md: 1 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Avatar alt="Remy Sharp" src="/user.png" />
          </Grid>
        </Grid>
        <Typography
          variant="h4"
          sx={{
            color: blueFont,
            fontWeight: "bold",
            fontFamily: montserrat.style,
            p: 3,
          }}
        >
          List Customers
        </Typography>
        <Grid sx={{ p: 3 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ bgcolor: blueFont }}>
                  <TableCell align="right" sx={{ color: "white" }}>
                    ID
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>Nama</TableCell>
                  <TableCell sx={{ color: "white" }} align="right">
                    No Telp
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="right">
                    Email
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="right">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {query?.data?.map((row: TCustomer, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{row.id}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.no_hp}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell
                      align="right"
                      sx={{ display: "flex", gap: "10px" }}
                    >
                      <DeleteIcon
                        sx={{
                          color: "red",
                          fontSize: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleRemove(row.id.toLocaleString(), row.name)
                        }
                      />
                      <EditIcon
                        onClick={() => handleClickOpen(row)}
                        sx={{
                          color: "blue",
                          fontSize: "20px",
                          cursor: "pointer",
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      {selectedCustomer && (
        <CustomizedDialogs
          open={open}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
          customer={selectedCustomer}
        />
      )}
    </Grid>
  );
}
