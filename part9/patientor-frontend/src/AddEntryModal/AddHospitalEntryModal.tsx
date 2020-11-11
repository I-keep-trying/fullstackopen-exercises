import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddHospitalEntryForm, {
  HospitalEntryFormValues,
} from './AddHospitalEntryForm';

interface Props {
  hospitalModalOpen: boolean;
  onClose: () => void;
  onHospitalSubmit: (values: HospitalEntryFormValues) => void;
  error?: string;
}

const AddHospitalEntryModal = ({
  hospitalModalOpen,
  onClose,
  onHospitalSubmit,
  error,
}: Props) => (
  <Modal open={hospitalModalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new hospital entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddHospitalEntryForm onSubmit={onHospitalSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddHospitalEntryModal;
