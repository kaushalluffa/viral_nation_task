import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const CardView = ({ fetchedData }) => {
  const theme = useTheme();
  return (
    <Grid container spacing={3}>
      {fetchedData.map((data, i) => (
        <Grid item xs={3} key={i}>
          <Card
            elevation={0}
            sx={{
              maxWidth: "342px",
              backgroundColor:
                theme.palette.mode === "light" && theme.palette.grey.A200,
            }}
            variant="contained"
          >
            <CardHeader
              avatar={
                <Avatar
                  src="https://source.unsplash.com/random"
                  aria-label="avatar"
                >
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={
                <Typography
                  variant="body2"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  {data.name}{" "}
                  {data.is_verified && (
                    <VerifiedRoundedIcon color="primary" fontSize="small" />
                  )}
                </Typography>
              }
              subheader={
                <Typography variant="caption">{data.email}</Typography>
              }
            />

            <Box paddingLeft={3} paddingRight={3} paddingBottom={3}>
              <Typography variant="body2" textAlign="left">
                {data.description}
              </Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CardView;
