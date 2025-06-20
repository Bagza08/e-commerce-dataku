import { useTransactions } from "@/hooks/transactions";
import { TTransactions } from "@/lib/transactions";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PaidIcon from "@mui/icons-material/Paid";
import { Avatar, Badge, Box, Button, Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Montserrat } from "next/font/google";
import { useRouter } from "next/router";
import * as React from "react";

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

  React.useEffect(() => {
    // Cek apakah ada data 'user' di localStorage
    const user = localStorage.getItem("user");

    if (user !== "bagza@mail.com") {
      router.replace("/");
    } else if (!user) {
      router.replace("/login");
    }
  }, [router]);

  const { query } = useTransactions();

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
            variant="h4"
            sx={{
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
          List Transaction
        </Typography>
        <Grid sx={{ p: 3 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ bgcolor: blueFont }}>
                  <TableCell align="center" sx={{ color: "white" }}>
                    ID
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>Nama</TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    Harga
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    ID pembeli
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    package
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    date
                  </TableCell>
                  {/* <TableCell align="right"></TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {query?.data?.map((row: TTransactions, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.price}</TableCell>
                    <TableCell component="th" align="center" scope="row">
                      {row.customerId}
                    </TableCell>
                    <TableCell align="center">{row.package}</TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    {/* <TableCell align="right">{row.protein}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  );
}
