import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardContent from "@mui/material/CardContent";

import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import useTheme from "@mui/material/styles/useTheme";
import DropdownMenu from "../DropDownMenu/DropDownMenu";

export default function CardComponent({
  data,
  handleDeleteModalOpen,
  handleDeleteModalClose,
  handleOpenEditProfileModal,
  openDeleteModal,
}) {
  const theme = useTheme();
  return (
    <Card
      elevation={0}
      sx={{
        maxWidth: 345,
        minHeight: 234,
        backgroundColor:
          theme.palette.mode === "light" && theme.palette.grey.A200,
      }}
      variant="contained"
    >
      <CardHeader
       
        avatar={
          <Avatar
            src={data.image_url || "https://source.unsplash.com/random"}
            aria-label="recipe"
            sx={{
              width: 64,
              height: 64,
            }}
          >
            {data.first_name.split("")[0]}
            {data.last_name.split("")[0]}
          </Avatar>
        }
        action={
          <DropdownMenu
            onDelete={() => {
              handleDeleteModalOpen(data);
            }}
            onEdit={() => handleOpenEditProfileModal(data)}
            onClose={() => handleDeleteModalClose(data)}
            openDeleteModal={openDeleteModal}
            data={data}
          />
        }
        title={
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Typography
              variant="body2"
              noWrap
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              {data.first_name} {data.last_name}
              {data?.is_verified && (
                <VerifiedRoundedIcon color="primary" fontSize="small" />
              )}
            </Typography>
          </Box>
        }
        subheader={
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography variant="body2" noWrap color="">
              {data.email}
            </Typography>
          </Box>
        }
      />

      <CardContent
        sx={{
          paddingTop: 0,
          textAlign: "left",
        }}
      >
        <Typography
          variant="body2"
          color={
            theme.palette.mode === "dark"
              ? theme.palette.common.white
              : "text.secondary"
          }
        >
          {data?.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
