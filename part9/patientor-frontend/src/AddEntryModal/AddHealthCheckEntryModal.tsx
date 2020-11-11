import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddHealthCheckEntryForm, { HealthCheckEntryFormValues } from './AddHealthCheckEntryForm';

interface Props {
  healthCheckModalOpen: boolean;
  onClose: () => void;
  onHealthCheckSubmit: (values: HealthCheckEntryFormValues) => void;
  error?: string;
}

const AddHealthCheckEntryModal = ({ healthCheckModalOpen, onClose, onHealthCheckSubmit, error }: Props) => (
  <Modal open={healthCheckModalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new health check entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddHealthCheckEntryForm onSubmit={onHealthCheckSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddHealthCheckEntryModal;
