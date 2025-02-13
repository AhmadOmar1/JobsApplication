import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Input,
  FormHelperText,
} from "@mui/material";

interface IApplicationFormProps {
  jobId: string;
  onSubmit: (formData: FormData) => void;
}

interface IFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  resume?: string;
  coverLetter?: string;
}

const ApplicationForm: React.FC<IApplicationFormProps> = ({
  jobId,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<File | null>(null);
  const [errors, setErrors] = useState<IFormErrors>({});

  const validateField = (
    name: string,
    value: string | File | null
  ): string | undefined => {
    switch (name) {
      case "name":
        if (!value || (typeof value === "string" && value.trim() === "")) {
          return "Name is required.";
        }
        if (typeof value === "string" && value.trim().length < 3) {
          return "Name must be at least 3 characters.";
        }
        break;

      case "email":
        if (!value || (typeof value === "string" && value.trim() === "")) {
          return "Email is required.";
        }
        if (
          typeof value === "string" &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ) {
          return "Invalid email address.";
        }
        break;

      case "phone":
        if (!value || (typeof value === "string" && value.trim() === "")) {
          return "Phone number is required.";
        }
        if (typeof value === "string" && !/^\d{10}$/.test(value)) {
          return "Phone number must be 10 digits.";
        }
        break;

      case "resume":
        if (!value) {
          return "Resume is required.";
        }
        break;

      case "coverLetter":
        if (value && value instanceof File && value.size > 2 * 1024 * 1024) {
          return "Cover letter must be less than 2MB.";
        }
        break;

      default:
        return undefined;
    }
  };

  const validateForm = () => {
    const errors: IFormErrors = {};
    errors.name = validateField("name", name);
    errors.email = validateField("email", email);
    errors.phone = validateField("phone", phone);
    errors.resume = validateField("resume", resume);
    errors.coverLetter = validateField("coverLetter", coverLetter);

    setErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void,
    fieldName: string
  ) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    if (resume) formData.append("resume", resume);
    if (coverLetter) formData.append("coverLetter", coverLetter);

    onSubmit(formData);
  };

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 2,
        maxWidth: 500,
        margin: "auto",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          Apply for Job
        </Typography>

        <TextField
          label="Full Name"
          fullWidth
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Email Address"
          fullWidth
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Phone Number"
          fullWidth
          required
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={!!errors.phone}
          helperText={errors.phone}
          sx={{ mb: 2 }}
        />

        <Typography variant="body2" sx={{ mb: 1 }}>
          Upload Resume (PDF, DOCX) *
        </Typography>
        <Input
          type="file"
          required
          inputProps={{ accept: ".pdf, .docx" }}
          onChange={(e) =>
            handleFileUpload(
              e as React.ChangeEvent<HTMLInputElement>,
              setResume,
              "resume"
            )
          }
          error={!!errors.resume}
        />
        <FormHelperText error={!!errors.resume} sx={{ mb: 2 }}>
          {errors.resume ||
            (resume ? `Uploaded: ${resume.name}` : "No file selected")}
        </FormHelperText>

        <Typography variant="body2" sx={{ mb: 1 }}>
          Upload Cover Letter (Optional - PDF, DOCX)
        </Typography>
        <Input
          type="file"
          inputProps={{ accept: ".pdf, .docx" }}
          onChange={(e) =>
            handleFileUpload(
              e as React.ChangeEvent<HTMLInputElement>,
              setCoverLetter,
              "coverLetter"
            )
          }
          error={!!errors.coverLetter}
        />
        <FormHelperText error={!!errors.coverLetter} sx={{ mb: 2 }}>
          {errors.coverLetter ||
            (coverLetter
              ? `Uploaded: ${coverLetter.name}`
              : "No file selected")}
        </FormHelperText>

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Submit Application
        </Button>
      </form>
    </Box>
  );
};

export default ApplicationForm;
