import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import {
  expenseCategories,
  FontSizes,
  Spacing,
  categoryNamesDict,
} from '../constants';
import { InputWithAccessory } from '../components/InputWithAccessory';
import {
  TextInputWithlabel,
  Button,
  FormField,
  DismissKeyboard,
} from '../components';
import { Label, Tag } from '../ui';
import { useTheme } from '../hooks';
import { SpendingsBrain } from '../services';
import { ExpenseCategory, ExpenseCategoryKey } from '../types';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

interface FormValues {
  amount: number;
  expenseName?: string;
  category?: ExpenseCategory;
}

export function AddSpending() {
  const {
    colors: { grey, primary },
  } = useTheme();

  const onTagPress = (
    tag: ExpenseCategoryKey,
    setFieldValue: Function,
    currentValue: ExpenseCategory | undefined
  ) => {
    if (currentValue) {
      setFieldValue('category', '', false);
      if (currentValue !== tag) {
        setFieldValue('category', tag, false);
      }
    } else {
      setFieldValue('category', tag, false);
    }
  };

  const { goBack } = useNavigation();

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
          <Formik<FormValues>
            initialValues={{
              expenseName: '',
              amount: 0,
              category: '' as ExpenseCategory,
            }}
            validate={(values) => {
              const errors: {
                amount?: string;
                expenseName?: string;
                category?: string;
              } = {};

              if (!values.amount) {
                errors.amount = 'Provide an amount';
              }

              if (!values.expenseName) {
                errors.expenseName = 'Provide expense name';
              }

              if (!values.category) {
                errors.category = 'Pick a category';
              }

              return errors;
            }}
            onSubmit={async (values) => {
              if (values.expenseName && values.category) {
                await SpendingsBrain.shared.addExpense({
                  createdAt: new Date(),
                  amount: values.amount,
                  name: values.expenseName,
                  category: values.category,
                });
                goBack();
              }
            }}>
            {({
              handleChange,
              handleBlur,
              setFieldValue,
              values,
              handleSubmit,
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

                  <FormField name="category">
                    <TextInputWithlabel
                      styles={{ marginTop: Spacing.SM }}
                      labelText="What is the type of expense?"
                      renderInputComponent={() => {
                        return (
                          <View
                            style={{
                              marginTop: Spacing.MD,
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                            }}>
                            {expenseCategories.map((x) => (
                              <Tag
                                key={x}
                                text={categoryNamesDict[x]}
                                onPress={() =>
                                  onTagPress(x, setFieldValue, values.category)
                                }
                                styles={{
                                  margin: Spacing.XS,
                                  backgroundColor: grey,
                                  ...(values.category === x
                                    ? {
                                        backgroundColor: primary,
                                      }
                                    : {}),
                                }}
                              />
                            ))}
                          </View>
                        );
                      }}
                    />
                  </FormField>
                </View>

                <Button
                  rounded
                  labelProps={{ fontSize: FontSizes.LG, color: 'white' }}
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
