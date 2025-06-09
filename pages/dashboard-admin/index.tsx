import AllInboxIcon from "@mui/icons-material/AllInbox";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Avatar, Badge, Box, Grid, Typography } from "@mui/material";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });
const blueFont = "#5D87FF";

export default function DashboardAdmin() {
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
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mt: 8 }}>
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
      </Grid>
      <Grid sx={{ backgroundColor: "white" }} size={{ xs: 6, md: 10.5 }}>
        <Grid
          sx={{ backgroundColor: "white", p: 3, height: "80px",  }}
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
          <Grid size={{ xs: 6, md: 1 }} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
