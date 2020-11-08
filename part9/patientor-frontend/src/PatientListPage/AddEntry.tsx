import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { TextField, SelectField } from '../AddPatientModal/FormField';
import {
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
} from '../types';

//export type PatientFormValues = Omit<Patient, 'id'>;
// 'Entry' type should be ok to use without redefining type (?)

type EntryOption = {
    value: Entry;
    label: string;
  };

export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;

export type NewOccupationalHealthcareEntry = Omit<
  OccupationalHealthcareEntry,
  'id'
>;

export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;

type SelectFieldProps = {
    name: string;
    label: string;
    options: EntryOption[];
  };

  const SelectEntryField: React.FC<SelectFieldProps> = ({
    name,
    label,
    options,
  }: SelectFieldProps) => (
    <Form.Field>
      <label>{label}</label>
      <Field as="select" name={name} className="ui dropdown">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </Field>
    </Form.Field>
  );

interface Props {
  onSubmit: (
    values:
      | NewHospitalEntry
      | NewOccupationalHealthcareEntry
      | NewHealthCheckEntry
  ) => void;
  onCancel: () => void;
}

const entryTypeOptions: Entry[] = [
  { value: HospitalEntry.type, label: 'Hospital' },
  { value: OccupationalHealthcareEntry.type, label: 'Occupational Health' },
  { value: HealthCheckEntry.type, label: 'Health Check' },
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  return (
    <Formik
      initialValues={{
        name: 'ffffffff',
        ssn: '432234234',
        dateOfBirth: '1990-10-10',
        occupation: 'freeloader',
        gender: Gender.Other,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.name) {
          errors.name = requiredError;
        }
        if (!values.ssn) {
          errors.ssn = requiredError;
        }
        if (!values.dateOfBirth) {
          errors.dateOfBirth = requiredError;
        }
        if (!values.occupation) {
          errors.occupation = requiredError;
        }
        return errors;
      }}
    >
      {({
        isValid,
        // dirty
      }) => {
        return (
          <Form className="form ui">
            <Field
              label="Name"
              placeholder="Name"
              name="name"
              component={TextField}
            />
            <Field
              label="Social Security Number"
              placeholder="SSN"
              name="ssn"
              component={TextField}
            />
            <Field
              label="Date Of Birth"
              placeholder="YYYY-MM-DD"
              name="dateOfBirth"
              component={TextField}
            />
            <Field
              label="Occupation"
              placeholder="Occupation"
              name="occupation"
              component={TextField}
            />
            <SelectField label="Gender" name="gender" options={genderOptions} />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={
                    // !dirty ||
                    !isValid
                  }
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
