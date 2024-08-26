import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';

import AddPatientForm from "./AddPatientForm";
import { PatientFormValues } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientFormValues) => void;
  error?: string;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;

}

const AddPatientModal = ({ modalOpen, onClose, onSubmit, error , setError}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new patient</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddPatientForm onSubmit={onSubmit} onCancel={onClose} setError={setError}/>
    </DialogContent>
  </Dialog>
);

export default AddPatientModal;
