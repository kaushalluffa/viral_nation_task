import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Grid,
  IconButton,
  
  Typography,
} from "@mui/material";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const mock = [
  {
    name: "Ronald Richards",
    email: "ronaldrichards@gmail.com",
    description: `Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at
              faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut
              luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet
              porta tincidunt massa id quam pharetra. Massa vitae feugiat
              vulputate et praesent nisl neque nunc tortor.`,
  },
  {
    name: "Ronald Richards",
    email: "ronaldrichards@gmail.com",
    description: `Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at
              faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut
              luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet
              porta tincidunt massa id quam pharetra. Massa vitae feugiat
              vulputate et praesent nisl neque nunc tortor.`,
  },
  {
    name: "Ronald Richards",
    email: "ronaldrichards@gmail.com",
    description: `Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at
              faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut
              luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet
              porta tincidunt massa id quam pharetra. Massa vitae feugiat
              vulputate et praesent nisl neque nunc tortor.`,
  },
  {
    name: "Ronald Richards",
    email: "ronaldrichards@gmail.com",
    description: `Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at
              faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut
              luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet
              porta tincidunt massa id quam pharetra. Massa vitae feugiat
              vulputate et praesent nisl neque nunc tortor.`,
  },
  {
    name: "Ronald Richards",
    email: "ronaldrichards@gmail.com",
    description: `Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at
              faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut
              luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet
              porta tincidunt massa id quam pharetra. Massa vitae feugiat
              vulputate et praesent nisl neque nunc tortor.`,
  },
  {
    name: "Ronald Richards",
    email: "ronaldrichards@gmail.com",
    description: `Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at
              faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut
              luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet
              porta tincidunt massa id quam pharetra. Massa vitae feugiat
              vulputate et praesent nisl neque nunc tortor.`,
  },
  {
    name: "Ronald Richards",
    email: "ronaldrichards@gmail.com",
    description: `Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at
              faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut
              luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet
              porta tincidunt massa id quam pharetra. Massa vitae feugiat
              vulputate et praesent nisl neque nunc tortor.`,
  },
  {
    name: "Ronald Richards",
    email: "ronaldrichards@gmail.com",
    description: `Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at
              faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut
              luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet
              porta tincidunt massa id quam pharetra. Massa vitae feugiat
              vulputate et praesent nisl neque nunc tortor.`,
  },
];
const CardView = () => {
  return (
    <Grid container spacing={3}>
      {mock.map((data, i) => (
        <Grid item xs={3} key={i}>
          <Card
            elevation={0}
            sx={{
              maxWidth: "342px",
              backgroundColor: "#EEEEEE",
            }}
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
              title={data.name}
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
