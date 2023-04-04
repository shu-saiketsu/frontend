import {
  UserProfile,
  useUser,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0/client";
import PersonIcon from "@mui/icons-material/Person";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import VerifiedIcon from "@mui/icons-material/Verified";
import WarningIcon from "@mui/icons-material/Warning";
import { Stack } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { isUserInRole } from "@/util/roleRetriver";

function renderUser(user: UserProfile, isAdmin: boolean) {
  return (
    <>
      <Typography variant="h4">Account Information</Typography>
      <Typography variant="subtitle2">
        View related account information
      </Typography>

      <Grid container spacing={2} style={{ marginTop: 15 }}>
        <Grid item xs={3}>
          <Card style={{ padding: 5 }} elevation={2}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Email Address
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user.email}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={{ padding: 5 }} elevation={2}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Email Status
              </Typography>
              <Typography
                variant="body1"
                color={user.email_verified ? "success.main" : "error.main"}
              >
                <Stack direction="row" alignItems="center">
                  {user.email_verified ? (
                    <VerifiedIcon style={{ marginRight: 5 }} fontSize="small" />
                  ) : (
                    <WarningIcon style={{ marginRight: 5 }} fontSize="small" />
                  )}
                  {user.email_verified ? "Verified" : "Unverified"}
                </Stack>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={{ padding: 5 }} elevation={2}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Privilages
              </Typography>
              <Typography variant="body1">
                <Stack direction="row" alignItems="center">
                  {isAdmin ? (
                    <SupervisorAccountIcon
                      style={{ marginRight: 5 }}
                      fontSize="small"
                    />
                  ) : (
                    <PersonIcon style={{ marginRight: 5 }} fontSize="small" />
                  )}
                  {isAdmin ? "Administrator" : "Voter"}
                </Stack>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={{ padding: 5 }} elevation={2}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Nickname
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user.nickname}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default withPageAuthRequired(function Page() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const isAdministrator = isUserInRole(user, "Administrator");

  if (user) {
    return (
      <>
        <Alert style={{ marginBottom: "15px" }} severity="warning">
          <AlertTitle>Sensitive Data</AlertTitle>
          The below information is sensitive data —{" "}
          <strong>please be careful!</strong>
        </Alert>

        {renderUser(user, isAdministrator)}
      </>
    );
  }

  return (
    <>
      <p>not logged in</p>
    </>
  );
});
