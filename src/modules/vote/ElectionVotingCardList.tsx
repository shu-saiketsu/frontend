import AddCircleIcon from "@mui/icons-material/AddCircle";
import VerifiedIcon from "@mui/icons-material/Verified";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import * as React from "react";

import { Election } from "@/common/types/Election";

type ElectionVotingCardListProps = {
  elections: Election[];
};

export default function ElectionVotingCardList({
  elections,
}: ElectionVotingCardListProps) {
  return (
    <Paper variant="outlined">
      <CardContent>
        <Typography variant="h6">Votable Elections</Typography>
        <Typography mb={1}>Vote for your eligible elections here.</Typography>

        <Grid spacing={2} container>
          {elections.map((election) => {
            return (
              <Grid key={election.id} lg sm={12} item>
                <Paper variant="outlined" key={election.id}>
                  <CardContent>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Tooltip title="Verified Election" placement="top" arrow>
                        <VerifiedIcon color="success" />
                      </Tooltip>
                      <Typography variant="h6">
                        Election: <strong>{election.name}</strong>
                      </Typography>
                    </Stack>

                    <Typography>You can vote in this election.</Typography>
                    <Box mt={1}>
                      <Link href={`/vote/${election.id}`} passHref>
                        <Button
                          variant="outlined"
                          startIcon={<AddCircleIcon />}
                          fullWidth
                        >
                          Vote
                        </Button>
                      </Link>
                    </Box>
                  </CardContent>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Paper>
  );
}
