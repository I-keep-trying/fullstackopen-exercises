import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddOccupationalEntryForm, {
  OccupationalEntryFormValues,
 // SickLeaveValues,
} from './AddOccupationalEntryForm';

interface Props {
  occupationalModalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: OccupationalEntryFormValues) => void;
  error?: string;
}

const AddOccupationalEntryModal = ({
  occupationalModalOpen,
  onClose,
  onSubmit,
  error,
}: Props) => (
  <Modal
    open={occupationalModalOpen}
    onClose={onClose}
    centered={false}
    closeIcon
  >
    <Modal.Header>Add a new occupational health entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddOccupationalEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddOccupationalEntryModal;
