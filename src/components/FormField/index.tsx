import React, { PropsWithChildren } from 'react';
import { Field, useField } from 'formik';
import { Label } from '../../ui';

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
          <Label color="error">{meta.error}</Label>
        </>
      )}
    </Field>
  );
}
