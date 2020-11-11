import React from 'react';
import { ErrorMessage, Field, FieldProps } from 'formik';
import { Form } from 'semantic-ui-react';
import { Gender } from '../types';

// USED IN ADD PATIENT //

export type GenderOption = {
  value: Gender;
  label: string;
};

export const selectOptions: GenderOption[] = [
  { value: Gender.Male, label: 'Male' },
  { value: Gender.Female, label: 'Female' },
  { value: Gender.Other, label: 'Other' },
];

type SelectFieldProps = {
  name: string;
  label: string;
  options: GenderOption[]; 
};

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
}: SelectFieldProps) => {
  return (
    <Form.Field >
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
};

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
        <ErrorMessage name={field.name} />
      </div>
    </Form.Field>
  );
};
/////////////////////////////////////

