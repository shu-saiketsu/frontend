import { useUser } from "@auth0/nextjs-auth0/client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { isUserInRole } from "@/util/roleRetriver";

function renderViewer() {
  return <p>viewer</p>;
}

function renderAdministrator() {
  return (
    <Grid container spacing={2} style={{ marginTop: 15 }}>
      <Grid item xs={4}>
        <Card style={{ padding: 5, backgroundColor: "#386641" }} elevation={2}>
          <CardContent>
            <Typography color="white" gutterBottom variant="h6" component="div">
              Active Elections
            </Typography>
            <Typography variant="body1" color="white">
              ACTIVE_ELECTION_NUMBER
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card style={{ padding: 5, backgroundColor: "#bc4749" }} elevation={2}>
          <CardContent>
            <Typography color="white" gutterBottom variant="h6" component="div">
              Registered Users
            </Typography>
            <Typography variant="body1" color="white">
              TOTAL_USER_COUNT
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card style={{ padding: 5, backgroundColor: "#e36414" }} elevation={2}>
          <CardContent>
            <Typography color="white" gutterBottom variant="h6" component="div">
              Total Votes
            </Typography>
            <Typography variant="body1" color="white">
              TOTAL_VOTE_COUNT
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

function renderVoter() {
  return <p>voter</p>;
}

export default function Page() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const isAdministrator = isUserInRole(user, "Administrator");

  return (
    <>
      <Typography variant="h4">Homepage</Typography>
      <Typography variant="subtitle2">Welcome to democracy</Typography>

      {user
        ? isAdministrator
          ? renderAdministrator()
          : renderVoter()
        : renderViewer()}
    </>
  );
}
