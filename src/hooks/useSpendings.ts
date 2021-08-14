import { useEffect, useState } from 'react';
import { SpendingsBrain } from '../services';

export function useSpendings() {
  const [spendings, setSpendings] = useState<Array<Spending>>([]);

  useEffect(() => {
    async function onMount() {
      const data = await SpendingsBrain.shared.getSpendings();

      console.log('data', data);

      setSpendings([]);
    }

    onMount();
  }, []);

  return [spendings];
}
