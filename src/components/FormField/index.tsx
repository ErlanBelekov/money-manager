import React, { PropsWithChildren } from 'react';
import { Field, useField } from 'formik';
import { Label } from '../../ui';
import { FontSizes, Spacing } from '../../constants';

export interface FormFieldProps {
  name: string;
}

export function FormField({
  name,
  children,
}: PropsWithChildren<FormFieldProps>) {
  const [, meta] = useField({ name });

  return (
    <Field name={name}>
      {() => (
        <>
          {children}
          <Label
            styles={{ marginTop: Spacing.SM }}
            fontSize={FontSizes.SM}
            color="error">
            {meta.error}
          </Label>
        </>
      )}
    </Field>
  );
}
