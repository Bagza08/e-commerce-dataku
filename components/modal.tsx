import { useCustomers } from "@/hooks/customers";
import { TCustomer } from "@/lib/customers";
import CloseIcon from "@mui/icons-material/Close";
import { Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  handleClickOpen: (customer: TCustomer) => void;
  customer: TCustomer;
};

type FormInputs = {
  name: string;
  email: string;
  no_hp: string;
};

export default function CustomizedDialogs(props: ModalProps) {
  const { update } = useCustomers();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      name: props.customer.name,
      email: props.customer.email,
      no_hp: props.customer.no_hp,
    },
  });

  React.useEffect(() => {
    if (props.customer) {
      reset({
        name: props.customer.name,
        email: props.customer.email,
        no_hp: props.customer.no_hp,
      });
    }
  }, [props.customer, reset]);

  const onSubmit = async (data: FormInputs) => {
    console.log(data);

    const dataSubmit = {
      id: props.customer.id,
      name: data.name,
      email: data.email,
      no_hp: data.no_hp,
      password: props.customer.password,
    };

    update.mutate(
      { id: props.customer.id, data: dataSubmit },
      {
        onSuccess: () => {
          Swal.fire({
            icon: "success",
            title: "Berhasil!",
            text: "Update berhasil!",
            confirmButtonColor: "#5D87FF",
          });

          props.handleClose(); // misal menutup modal/form
        },
        onError: (err) => {
          Swal.fire({
            icon: "error",
            title: "Gagal!",
            text: `Gagal Update : ${err.message}`,
            confirmButtonColor: "#d33",
          });
        },
      }
    );
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={props.handleClose}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Edit Customer
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={props.handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            width="400px"
            mt={2}
          >
            <TextField
              label="nama"
              fullWidth
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              label="Email"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="No Hp"
              fullWidth
              {...register("no_hp")}
              error={!!errors.no_hp}
              helperText={errors.no_hp?.message}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            autoFocus
            onClick={props.handleClose}
            variant="contained"
          >
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
