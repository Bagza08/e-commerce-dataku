import { useCustomers } from "@/hooks/customers";
import { zodResolver } from "@hookform/resolvers/zod";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Swal from "sweetalert2";

const registerSchema = z.object({
  // id: z.number(),
  name: z.string().min(2, "Nama minimal 2 karakter"),
  no_hp: z.string().min(10, "Nomor HP minimal 10 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

type LoginForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  useEffect(() => {
    AOS.init();
  }, []);

  const { create, query } = useCustomers();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
  } = useForm<LoginForm>({
    resolver: zodResolver(registerSchema),
  });

  const longData = query?.data?.length + 1;

  const gradient = "linear-gradient(to right, #5D87FF, #A55DFF)";

  const onSubmit = async (data: LoginForm) => {
    console.log("botton"); // ✅ pastikan ini muncul
    const dataSubmit = {
      id: longData,
      name: data.name,
      no_hp: data.no_hp,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await create.mutateAsync(dataSubmit);

      console.log("Data berhasil disimpan:", response);

      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Registrasi berhasil!",
        confirmButtonColor: "#5D87FF",
      });

      router.push("/login");
    } catch (error) {
      console.error("Gagal submit:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Registrasi gagal. Silakan coba lagi.",
        confirmButtonColor: "#d33",
      });
    }
  };

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
            height: "80%",
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
            Register
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
              label="Nama"  
              fullWidth
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              label="No HP"
              fullWidth
              {...register("no_hp")}
              error={!!errors.no_hp}
              helperText={errors.no_hp?.message}
            />
            <TextField
              label="email"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="password"
              fullWidth
              type="password"
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
              Register
            </Button>
            <Typography>
              sudah punya akun?{" "}
              <Link href="/login">
                <span style={{ color: "#ff8c00" }}>login disini!</span>
              </Link>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
