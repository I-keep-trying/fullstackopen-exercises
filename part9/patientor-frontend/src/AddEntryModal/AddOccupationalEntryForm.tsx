import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import { useStateValue } from '../state';
import { TextField, DiagnosisSelection } from './FormField';
import {
  OccupationalHealthCareEntry,
  //SickLeave
} from '../types';

export type OccupationalEntryFormValues = Omit<
OccupationalHealthCareEntry,
  'id'
>;

//export type SickLeaveValues = SickLeave;

interface Props {
  // onSubmit: (values: OccupationalEntryFormValues | SickLeaveValues) => void;
  onSubmit: (values: OccupationalEntryFormValues) => void;
  onCancel: () => void;
 // onToggle: () => (sickLeave: OccupationalEntryFormValues['sickLeave']) => void;
}

const AddOccupationalEntryForm: React.FC<Props> = (props) => {
  const [{ diagnoses }] = useStateValue();
  /* 
  const diagnoses: {
    [code: string]: Diagnosis;
}
  */

  return (
    <Formik
      initialValues={{
        type: 'OccupationalHealthcare',
        description: 'aaa',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        employerName: '',
        sickLeave: undefined,
        startDate: '',
        endDate: '',
      }}
      onSubmit={props.onSubmit}
      validate={(values) => {
        console.log('values???', values);
        /* console output: where is 'sickLeave'????
        date: ""
        description: "aaa"
        diagnosisCodes: []
        employerName: ""
        endDate: ""
        sickLeave: undefined // cannot use true or false
        specialist: ""
        startDate: ""
        type: "OccupationalHealthcare"
        */
        const requiredError = 'Field is required';
        const errors: {
          type?: string;
          description?: string;
          date?: string;
          specialist?: string;
          diagnosisCodes?: [];
          employerName?: string;
          sickLeave?: boolean;
          startDate?: string;
          endDate?: string;
        } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if (values.sickLeave === true) {
          if (!values.startDate) {
            errors.startDate = requiredError;
          }
          if (!values.endDate) {
            errors.endDate = requiredError;
          }
          return errors;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <Field
              label="Type"
              placeholder="Type"
              name="type"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />

            {/*             {values.sickLeave ? (
            <Field
              label="Sick Leave Start Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick Leave End Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />) : 
            (
              <></>
            )
            } */}
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={props.onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
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

export default AddOccupationalEntryForm;
