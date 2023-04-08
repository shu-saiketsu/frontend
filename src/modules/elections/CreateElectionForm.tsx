import { UserProfile } from "@auth0/nextjs-auth0/client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DateTime } from "luxon";
import * as React from "react";
import { useForm } from "react-hook-form";

import DateTimePickerController from "@/common/components/Form/DateTimePickerController";
import SelectionController from "@/common/components/Form/SelectionController";
import TextFieldController from "@/common/components/Form/TextFieldController";
import { ElectionTypeEnum } from "@/common/enums/ElectionTypeEnum";
import { Election } from "@/common/types/Election";

import ElectionCreationErrorSnackbar from "./create/ElectionCreationErrorSnackbar";

function Section({
  control,
  disabled,
  user,
}: {
  control: any;
  disabled: boolean;
  user: UserProfile;
}) {
  return (
    <Box>
      <Typography variant="h5" mb={1}>
        Election Information
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextFieldController
            control={control}
            name="name"
            label="Name"
            type="text"
            rules={{
              required: "Name is required",
            }}
            fullWidth
            disabled={disabled}
            required={true}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Owner"
            type="text"
            value={user.sub}
            disabled
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DateTimePickerController
            control={control}
            name="startDate"
            label="Start Date"
            rules={{
              required: "A start date is required",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DateTimePickerController
            control={control}
            name="endDate"
            label="End Date"
            rules={{ required: "An end date is required" }}
          />
        </Grid>
        <Grid item xs={12}>
          <SelectionController
            name="type"
            label="Election Type"
            control={control}
            selections={Object.keys(ElectionTypeEnum)
              .map((key: any) => ElectionTypeEnum[key])
              .filter((value) => typeof value === "string")}
            rules={{ required: "An election type is required" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

async function createElection(formData: FormData) {
  const startDate = formData.startDate.toISODate() as string;
  const endDate = formData.endDate.toISODate() as string;

  const response = await fetch("/api/elections", {
    method: "POST",
    body: JSON.stringify({
      name: formData.name,
      startDate: startDate,
      endDate: endDate,
      type: formData.type,
    }),
  });

  if (response.status === 200) {
    const json = await response.json();
    const election = json as Election;

    return election;
  }

  return null;
}

type FormData = {
  name: string;
  startDate: DateTime;
  endDate: DateTime;
  type: ElectionTypeEnum;
};

type CreateElectionFormProps = {
  // eslint-disable-next-line no-unused-vars
  onElectionCreated: (electionId: number) => void;
  user: UserProfile;
};

export default function CreateElectionForm({
  onElectionCreated,
  user,
}: CreateElectionFormProps) {
  const { handleSubmit, control } = useForm<FormData>();

  const [formSubmitting, setFormSubmitting] = React.useState<boolean>(false);

  const [showErrorSnackbar, setShowErrorSnackbar] =
    React.useState<boolean>(false);

  const handleHideErrorSnackbar = () => {
    setShowErrorSnackbar(false);
  };

  const handleShowErrorSnackbar = () => {
    setShowErrorSnackbar(true);
  };

  const onSubmit = handleSubmit(async (formData) => {
    setFormSubmitting(true);

    const election = await createElection(formData);
    if (election === null) {
      setFormSubmitting(false);
      return handleShowErrorSnackbar();
    }

    onElectionCreated(election.id);
  });

  return (
    <Box>
      <ElectionCreationErrorSnackbar
        open={showErrorSnackbar}
        onClose={handleHideErrorSnackbar}
      />

      <Section control={control} disabled={false} user={user} />

      <Box mt={2}>
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={formSubmitting}
          size="large"
          fullWidth
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
