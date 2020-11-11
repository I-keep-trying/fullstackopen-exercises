import React from 'react';
import { ErrorMessage, Field, FieldProps, FormikProps } from 'formik';
import {
  Dropdown,
  DropdownProps,
  CheckboxProps,
  Form,
  Checkbox,
} from 'semantic-ui-react';
import { Diagnosis, EntryType, OccupationalHealthcareEntry } from '../types';

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField: React.FC<TextProps> = ({
  field,
  label,
  placeholder,
}) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <Field placeholder={placeholder} {...field} />
      <div style={{ color: 'red' }}>
        <ErrorMessage className="error" name={field.name} />
      </div>
    </Form.Field>
  );
};

interface ToggleProps extends FieldProps {
  label: string;
  toggle: boolean;
}

export const SickLeaveToggle = ({
  toggle,
  setFieldValue,
}: {
  toggle: OccupationalHealthcareEntry['sickLeave'];
  setFieldValue: FormikProps<{ sickLeave: boolean }>['setFieldValue'];
}) => {
  const field = 'sickLeave';
  const onToggle = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: CheckboxProps
  ) => {
    console.log('onchange data property', data);
    // checked: true // changes when toggled!
    setFieldValue(field, data.checked);
  };
  const stateOptions = toggle ? !toggle : toggle;

  return (
    <Form.Field>
      <Checkbox options={stateOptions} onChange={onToggle} />
    </Form.Field>
  );
};

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched,
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>['setFieldValue'];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>['setFieldTouched'];
}) => {
  const field = 'diagnosisCodes';
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = diagnoses.map((diagnosis) => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code,
  }));

  return (
    <Form.Field>
      <label>Diagnoses</label>
      <Dropdown
        fluid
        multiple
        search
        selection
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export const NumberField: React.FC<NumberProps> = ({
  field,
  label,
  min,
  max,
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type="number" min={min} max={max} />

    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

export const EntryTypeSelection = ({
  types,
  setFieldValue,
  setFieldTouched,
}: {
  types: EntryType[];
  setFieldValue: FormikProps<{ type: string }>['setFieldValue'];
  setFieldTouched: FormikProps<{ type: string }>['setFieldTouched'];
}) => {
  const field = 'type';
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = types.map((type) => ({
    key: Object.keys(type),
    text: `${type} `,
    value: type,
  }));

  return (
    <Form.Field>
      <label>Entry Type</label>
      <Dropdown
        fluid
        search
        selection
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};
