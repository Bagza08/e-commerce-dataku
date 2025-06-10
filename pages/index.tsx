import MediaCard from "@/components/card";
import ResponsiveAppBar from "@/components/navbar";
import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

// import { Geist, Geist_Mono } from "next/font/google";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({x
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
const gradient = "linear-gradient(to right, #5D87FF, #A55DFF)";

type TProps = {
  name: string;
  data: string;
  price: number;
  desc: string[];
};

const paketData: TProps[] = [
  {
    name: "Paket 1",
    data: "20 GB",
    price: 500000,
    desc: ["paket 1", "paket 2", "paket 3"],
  },
  {
    name: "Paket 2",
    data: "50 GB",
    price: 700000,
    desc: ["paket 1", "paket 2", "paket 3"],
  },
  {
    name: "Paket 3",
    data: "100 GB",
    price: 800000,
    desc: ["paket 1", "paket 2", "paket 3"],
  },
];

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Grid container sx={{ height: "1000px" }}>
      <ResponsiveAppBar />
      {/* hero */}
      <Grid
        size={{ xs: 6, md: 12 }}
        sx={{
          px: "200px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: gradient,
        }}
      >
        <Grid
          data-aos="fade-up"
          data-aos-duration="2000"
          size={{ xs: 6, md: 5 }}
          sx={{ bgcolor: "transparent" }}
        >
          <Image src="/hero-1.svg" alt="Vercel Logo" width={650} height={650} />
        </Grid>
        <Grid
          data-aos="fade-left"
          data-aos-duration="2000"
          size={{ xs: 6, md: 7 }}
          sx={{
            bgcolor: "transparent",
            pl: "100px",
            height: "500px",
            pt: "50px",
          }}
        >
          <Typography variant="h1" color="white" fontWeight={"bold"}>
            Dataku
          </Typography>
          <Typography
            variant="h3"
            color="white"
            mt={5}
            fontFamily={"monospace"}
          >
            Website no 1 beli <br /> Paket Data Aman, Cepat, <br />
            Tanpa Ribet – Hanya di Dataku
          </Typography>
        </Grid>
      </Grid>
      {/* end hero */}
      {/* pricing */}
      <Grid
        size={{ xs: 6, md: 12 }}
        sx={{ position: "absolute", top: "800px" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <defs>
            <linearGradient id="myGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5D87FF" />
              <stop offset="100%" stopColor="#A55DFF" />
            </linearGradient>
          </defs>
          <path
            fill="url(#myGradient)"
            d="M0,288L40,272C80,256,160,224,240,192C320,160,400,128,480,128C560,128,640,160,720,176C800,192,880,192,960,192C1040,192,1120,192,1200,181.3C1280,171,1360,149,1400,138.7L1440,128L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
          />
        </svg>
      </Grid>
      <Grid
        size={{ xs: 6, md: 12 }}
        sx={{
          px: "200px",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          background: "#FFC107",
          pt: "125px",
        }}
      >
        <Grid
          size={{ xs: 6, md: 12 }}
          sx={{ bgcolor: "transparent", textAlign: "center", mb: "70px" }}
        >
          <Typography variant="h2" color="#5D87FF" fontWeight={"bold"}>
            Promo Terbaik
          </Typography>
          <Typography variant="h6" color="black" mt={2}>
            Temuin promo spesial hari ini, Beli Sekarang juga!
          </Typography>
        </Grid>
        <Grid
          container
          size={{ xs: 6, md: 12 }}
          sx={{
            bgcolor: "transparent",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {paketData.map((item, index) => {
            return (
              <Grid
                key={index}
                size={{ xs: 6, md: 3 }}
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <MediaCard
                  name={item.name}
                  data={item.data}
                  price={item.price}
                  desc={item.desc}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      {/* end hero */}
      {/* footer */}
      <Grid
        size={{ xs: 6, md: 12 }}
        sx={{
          px: "200px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: "20vh",
          background: "black",
        }}
      >
        <Grid
          size={{ xs: 6, md: 12 }}
          sx={{ bgcolor: "transparent", textAlign: "center" }}
        >
          <Typography color="white" variant="h6">
            © 2025 Dataku. All Rights Reserved.
          </Typography>
        </Grid>
      </Grid>
      {/* end hero */}
    </Grid>
  );
}
