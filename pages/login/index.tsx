import { useRouter } from "next/router";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";
import { useCustomers } from "@/hooks/customers";
import { TCustomer } from "@/lib/customers";

const loginSchema = z.object({
  // id: z.number(),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  useEffect(() => {
    AOS.init();
  }, []);

  const { query } = useCustomers();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  console.log("e", errors);
  console.log("email", watch("email"));
  console.log(" password", watch("password"));

  const onSubmit = async (data: LoginForm) => {
    const dataSubmit = {
      // id: data.id,
      email: data.email,
      password: data.password,
    };

    console.log("dataSubmit", dataSubmit);

    const foundCustomer = query.data.find(
      (item: TCustomer) => item.email === data.email
    );

    if (dataSubmit?.email === "bagza@mail.com") {
      localStorage.setItem("user", dataSubmit?.email);
      localStorage.setItem("userID", foundCustomer.id.toString());
      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Login berhasil!",
        confirmButtonColor: "#5D87FF",
      });
      router.push("/dashboard-admin/customers");
    } else if (dataSubmit.email === foundCustomer?.email) {
      localStorage.setItem("user", data.email);
      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Login berhasil!",
        confirmButtonColor: "#5D87FF",
      });
      router.push("/");
    } else {
      await Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Login gagal! Silakan coba lagi.",
        confirmButtonColor: "#d33",
      });
    }
  };

  const gradient = "linear-gradient(to right, #5D87FF, #A55DFF)";

  return (
    <Grid
      container
      size={{ xs: 6, md: 12 }}
      sx={{
        background: gradient,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Grid
        data-aos="fade-left"
        data-aos-duration="2000"
        size={{ xs: 6, md: 6 }}
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pl: "100px",
        }}
      >
        <Image src="/monitor.svg" alt="Vercel Logo" width={500} height={500} />
      </Grid>
      <Grid
        data-aos="fade-right"
        data-aos-duration="2000"
        size={{ xs: 6, md: 6 }}
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pr: "100px",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.10)",
            maxWidth: "500px",
            borderRadius: "15px",
            width: "100%",
            height: "60%",
            bgcolor: "white",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              maxHeight: "100px",
              mt: 5,
            }}
          >
            <AllInboxIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                color: "#5D87FF",
                fontSize: "45px",
              }}
            />
            <Typography
              variant="h3"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#5D87FF",
                textDecoration: "none",
              }}
            >
              DataKu
            </Typography>
          </Box>

          <Typography
            variant="h4"
            gutterBottom
            sx={{ mt: 5 }}
            color="#5D87FF"
            fontWeight={"bold"}
          >
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            display="flex"
            flexDirection="column"
            gap={2}
            width="400px"
            mt={2}
          >
            <TextField
              label="Email"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="password"
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ bgcolor: "#5D87FF" }}
            >
              Login
            </Button>
            <Typography>
              belum punya akun?{" "}
              <Link href="/register">
                <span style={{ color: "#ff8c00" }}>daftar disini!</span>
              </Link>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
