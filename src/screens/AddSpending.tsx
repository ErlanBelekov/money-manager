import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { Formik } from 'formik';
import { FontSizes, Spacing } from '../constants';
import { InputWithAccessory } from '../components/InputWithAccessory';
import {
  TextInputWithlabel,
  Button,
  FormField,
  DismissKeyboard,
} from '../components';
import { Label } from '../ui';
import { useTheme } from '../hooks';
import { SpendingsBrain } from '../services';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export function AddSpending() {
  const {
    colors: { grey, primary },
  } = useTheme();

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.screen}>
      <DismissKeyboard>
        <View
          style={{
            flex: 1,
            paddingTop: Spacing.XL,
            paddingBottom: Spacing.XL * 2,
            paddingHorizontal: Spacing.MD,
          }}>
          <View style={{ alignItems: 'center', marginBottom: Spacing.XL }}>
            <Label fontSize={FontSizes.XL} fontWeight="bold">
              New Expense
            </Label>
          </View>
          <Formik
            initialValues={{ expenseName: '', amount: 0 }}
            validate={(values) => {
              const errors: { amount?: string; expenseName?: string } = {};

              if (!values.amount) {
                errors.amount = 'Provide an amount';
              }

              if (!values.expenseName) {
                errors.expenseName = 'Provide expense name';
              }

              return errors;
            }}
            onSubmit={async (values) => {
              await SpendingsBrain.shared.addExpense({
                createdAt: new Date(),
                amount: values.amount,
                name: values.expenseName,
              });
            }}>
            {({
              handleChange,
              handleBlur,
              setFieldValue,
              values,
              handleSubmit,
              isSubmitting,
            }) => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                }}>
                <View style={{ flex: 1 }}>
                  <FormField name="expenseName">
                    <TextInputWithlabel
                      labelText="What did you spend your money on?"
                      placeholder="Groceries"
                      value={values.expenseName}
                      onBlur={handleBlur('expenseName')}
                      onChangeText={handleChange('expenseName')}
                    />
                  </FormField>

                  <FormField name="amount">
                    <TextInputWithlabel
                      styles={{ marginTop: Spacing.SM }}
                      labelText="How much did you spend?"
                      renderInputComponent={() => {
                        return (
                          <InputWithAccessory
                            style={{
                              marginTop: Spacing.SM,
                              fontSize: FontSizes.MD,
                              fontFamily: 'AtkinsonHyperlegible-Regular',
                              color: grey,
                              width: '100%',
                            }}
                            value={
                              typeof values.amount === 'number'
                                ? String(values.amount)
                                : undefined
                            }
                            onChangeText={(text) => {
                              if (!text) {
                                setFieldValue('amount', 0, false);
                                return;
                              }
                              const converted = Number(text);
                              if (
                                typeof converted === 'number' &&
                                !Number.isNaN(converted)
                              ) {
                                setFieldValue('amount', converted, true);
                              } else {
                                setFieldValue('amount', 0, true);
                              }
                            }}
                            keyboardType="numeric"
                            returnKeyType="done"
                          />
                        );
                      }}
                    />
                  </FormField>
                </View>

                <Button
                  rounded
                  labelProps={{ fontSize: FontSizes.LG, color: 'white' }}
                  renderLeftItem={() => {
                    return <>{isSubmitting && <ActivityIndicator />}</>;
                  }}
                  styles={{ backgroundColor: primary }}
                  onPress={handleSubmit}>
                  Save
                </Button>
              </View>
            )}
          </Formik>
        </View>
      </DismissKeyboard>
    </KeyboardAvoidingView>
  );
}
