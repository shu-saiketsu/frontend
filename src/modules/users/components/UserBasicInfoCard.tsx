import * as React from "react";
import { User } from "@/common/types/User";
import Paper from "@mui/material/Paper";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import InfoCardItem from "@/common/components/InfoCardItem";

type UserBasicInfoCardProps = {
  user: User;
};

export default function UserBasicInfoCard({ user }: UserBasicInfoCardProps) {
  return (
    <Paper variant="outlined">
      <CardContent>
        <Typography variant="h6" mb={2}>
          Basic Details
        </Typography>

        <InfoCardItem title="Identifier" content={user.id} />

        <Box mt={2} mb={2}>
          <Divider />
        </Box>

        <InfoCardItem title="Email" content={user.email} />

        <Box mt={2} mb={2}>
          <Divider />
        </Box>

        <InfoCardItem
          title="Full Name"
          content={`${user.firstName} ${user.lastName}`}
        />
      </CardContent>
    </Paper>
  );
}
