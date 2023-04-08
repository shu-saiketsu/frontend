import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextFieldController from "@/common/components/Form/TextFieldController";
import { useForm } from "react-hook-form";
import NumberTextFieldController from "@/common/components/Form/NumberTextFieldController";
import { Candidate } from "@/common/types/Candidate";
import CandidateCreationErrorSnackbar from "./create/CandidateCreationErrorSnackbar";

type CreateCandidateFormProps = {
  // eslint-disable-next-line no-unused-vars
  onCandidateCreated: (candidateId: number) => void;
};

function CandidateSection({
  control,
  disabled,
}: {
  control: any;
  disabled: boolean;
}) {
  return (
    <Box>
      <Typography variant="h5" mb={1}>
        Candidate Information
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
          <NumberTextFieldController
            control={control}
            name="partyId"
            label="Party Identifier"
            fullWidth
            disabled={disabled}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

async function createCandidate(formData: FormData) {
  let response = await fetch("/api/candidates", {
    method: "POST",
    body: JSON.stringify({ name: formData.name, partyId: formData.partyId }),
  });

  if (response.status === 200) {
    let json = await response.json();
    let candidate = json as Candidate;

    return candidate;
  }

  return null;
}

type FormData = {
  name: string;
  partyId?: number;
};

export default function CreateCandidateForm({
  onCandidateCreated,
}: CreateCandidateFormProps) {
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

    if (formData.partyId === 0) formData.partyId = undefined;

    const candidate = await createCandidate(formData);
    if (candidate === null) {
      setFormSubmitting(false);
      return handleShowErrorSnackbar();
    }

    onCandidateCreated(candidate.id);
  });

  return (
    <Box>
      <CandidateSection control={control} disabled={formSubmitting} />

      <CandidateCreationErrorSnackbar
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
