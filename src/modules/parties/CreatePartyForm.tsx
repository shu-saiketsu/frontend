import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useForm } from "react-hook-form";

import TextFieldController from "@/common/components/Form/TextFieldController";
import { Party } from "@/common/types/Party";

import PartyCreationErrorSnackbar from "./create/PartyCreationErrorSnackbar";

type CreatePartyFormProps = {
  // eslint-disable-next-line no-unused-vars
  onPartyCreated: (partyId: number) => void;
};

function PartySection({
  control,
  disabled,
}: {
  control: any;
  disabled: boolean;
}) {
  return (
    <Box>
      <Typography variant="h5" mb={1}>
        Party Information
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
          <TextFieldController
            control={control}
            name="description"
            label="Description"
            type="text"
            rules={{
              required: "Description is required",
            }}
            fullWidth
            disabled={disabled}
            required={true}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

async function createParty(formData: FormData) {
  const response = await fetch("/api/parties", {
    method: "POST",
    body: JSON.stringify({
      name: formData.name,
      description: formData.description,
    }),
  });

  if (response.status === 200) {
    const json = await response.json();
    const party = json as Party;

    return party;
  }

  return null;
}

type FormData = {
  name: string;
  description: string;
};

export default function CreatePartyForm({
  onPartyCreated,
}: CreatePartyFormProps) {
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

    const candidate = await createParty(formData);
    if (candidate === null) {
      setFormSubmitting(false);
      return handleShowErrorSnackbar();
    }

    onPartyCreated(candidate.id);
  });

  return (
    <Box>
      <PartySection control={control} disabled={formSubmitting} />

      <PartyCreationErrorSnackbar
        open={showErrorSnackbar}
        onClose={handleHideErrorSnackbar}
      />

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
