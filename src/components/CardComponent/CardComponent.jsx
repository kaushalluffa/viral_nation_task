import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardContent from "@mui/material/CardContent";

import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { useTheme } from "@mui/material";
import DropdownMenu from "../DropDownMenu/DropDownMenu";

export default function CardComponent({
  data,
  handleDeleteModalOpen,
  handleDeleteModalClose,
  handleOpenEditProfileModal,
  openDeleteModal,
}) {
  const theme = useTheme()
  return (
    <Card
      elevation={0}
      sx={{
        maxWidth: 345,
        backgroundColor:
          theme.palette.mode === "light" && theme.palette.grey.A200,
      }}
      variant="contained"
    >
      <CardHeader
        avatar={
          <Avatar src="https://source.unsplash.com/random" aria-label="recipe">
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
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body2"
              noWrap
              sx={{
                width: "60%",
              }}
            >
              {data.first_name} {data.last_name}
            </Typography>
            {data?.is_verified && (
              <VerifiedRoundedIcon color="primary" fontSize="small" />
            )}
          </Box>
        }
        subheader={
          <Typography variant="body2" noWrap>
            {data.email}
          </Typography>
        }
      />

      <CardContent
        sx={{
          paddingTop: 0,
        }}
      >
        <Typography variant="body2" color="text">
          {data?.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
