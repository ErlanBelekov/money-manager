import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { SpendingsBrain } from '../services';
import { expensesState } from '../states';

export function useExpenses() {
  const state = useSnapshot(expensesState);

  useEffect(() => {
    async function onMount() {
      await SpendingsBrain.shared.getSpendings();
    }

    onMount();
  }, []);

  return state;
}
