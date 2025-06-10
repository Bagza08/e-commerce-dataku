import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import { Box } from "@mui/material";

type TProps = {
  name: string;
  data: string;
  price: number;
  desc: string[];
};

export default function MediaCard(props: TProps) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 5,
        minHeight: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 1,
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          {props.name}
        </Typography>
        <Typography
          gutterBottom
          variant="h3"
          component="div"
          sx={{ fontWeight: "bold", color: "#5D87FF" }}
        >
          {props.data} /
          <span style={{ fontSize: "25px", fontWeight: "bold" }}>30 Hari</span>
        </Typography>
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Rp. {props.price.toLocaleString("id-ID")}
        </Typography>
        {props.desc.map((item, index) => {
          return (
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, color: "#5D87FF" }}
              key={index}
            >
              <CheckIcon />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {item}
              </Typography>
            </Box>
          );
        })}
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          fullWidth
          size="small"
          sx={{
            borderRadius: 5,
            py: 1,
            fontWeight: "bold",
            bgcolor: "#5D87FF",
          }}
        >
          Bali Sekarang!
        </Button>
      </CardActions>
    </Card>
  );
}
