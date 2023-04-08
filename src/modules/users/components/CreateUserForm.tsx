import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useForm } from "react-hook-form";

import CheckboxController from "@/common/components/Form/CheckboxController";
import SelectionController from "@/common/components/Form/SelectionController";
import TextFieldController from "@/common/components/Form/TextFieldController";
import { User } from "@/common/types/User";
import emailValidator from "@/common/utils/emailValidator";
import passwordValidator from "@/common/utils/passwordValidator";

import UserCreationErrorSnackbar from "./create/UserCreationErrorSnackbar";

// eslint-disable-next-line no-unused-vars
enum RoleType {
  // eslint-disable-next-line no-unused-vars
  Administrator = "Administrator",
  // eslint-disable-next-line no-unused-vars
  Voter = "Administrator",
}

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: RoleType;
  termsAccepted: boolean;
};

function AccountInformationSection({
  control,
  disabled,
}: {
  control: any;
  disabled: boolean;
}) {
  return (
    <Box>
      <Typography variant="h5" mb={1}>
        Account Information
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextFieldController
            control={control}
            name="email"
            label="Email"
            type="email"
            rules={{
              required: "Email is required",
              validate: (email) =>
                emailValidator(email) || "Email is not valid.",
            }}
            fullWidth
            disabled={disabled}
            required={true}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextFieldController
            control={control}
            name="password"
            label="Password"
            type="password"
            rules={{
              required: "Password is required",
              validate: (password) =>
                passwordValidator(password) || "Password is not valid.",
            }}
            fullWidth
            disabled={disabled}
            required={true}
          />
        </Grid>
      </Grid>

      <Box mt={2}>
        <SelectionController
          name="role"
          label="Role"
          control={control}
          rules={{ required: "You must select a role." }}
          selections={Object.keys(RoleType).map((item) => item)}
          disabled={disabled}
        />
      </Box>
    </Box>
  );
}

function IdentificationInformationSection({
  control,
  disabled,
}: {
  control: any;
  disabled: boolean;
}) {
  return (
    <Box>
      <Typography variant="h5" mb={1}>
        Identification Information
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextFieldController
            control={control}
            name="firstName"
            label="First Name"
            type="text"
            rules={{
              required: "First name is required",
            }}
            fullWidth
            disabled={disabled}
            required={true}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextFieldController
            control={control}
            name="lastName"
            label="Last Name"
            type="text"
            rules={{
              required: "Last name is required",
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

function LegalSection({
  control,
  disabled,
}: {
  control: any;
  disabled: boolean;
}) {
  return (
    <Box>
      <Typography variant="h5" mb={1}>
        Legal Bits
      </Typography>

      <CheckboxController
        control={control}
        name="termsAccepted"
        label="This user agrees to the terms and conditions."
        rules={{ required: "You must agree to this statement." }}
        disabled={disabled}
      />
    </Box>
  );
}

async function createUser(formData: FormData) {
  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: formData.role,
    }),
  });

  if (response.status === 200) {
    const json = await response.json();
    const user = json as User;

    return user;
  }

  return null;
}

type CreateUserFormProps = {
  // eslint-disable-next-line no-unused-vars
  onUserCreated: (userId: string) => void;
};

export default function CreateUserForm({ onUserCreated }: CreateUserFormProps) {
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

    const user = await createUser(formData);
    if (user === null) {
      setFormSubmitting(false);
      return handleShowErrorSnackbar();
    }

    onUserCreated(user.id);
  });

  return (
    <Box>
      <AccountInformationSection control={control} disabled={formSubmitting} />

      <UserCreationErrorSnackbar
        open={showErrorSnackbar}
        onClose={handleHideErrorSnackbar}
      />

      <Box mt={2}>
        <IdentificationInformationSection
          control={control}
          disabled={formSubmitting}
        />
      </Box>

      <Box mt={2}>
        <LegalSection control={control} disabled={formSubmitting} />
      </Box>

      <Box mt={2}>
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={formSubmitting}
          size="large"
          fullWidth
          startIcon={<PersonAddIcon />}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
