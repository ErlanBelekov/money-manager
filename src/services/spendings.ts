// import AsyncStorage from '@react-native-async-storage/async-storage';

// import { StorageKeys } from '../constants';

interface SpendingsBrainAPI {
  getSpendings(): Promise<Array<Spending>>;
}

export class SpendingsBrain implements SpendingsBrainAPI {
  static shared = new SpendingsBrain();

  async getSpendings() {
    let data: Array<Spending> = [];

    try {
      // const json = await AsyncStorage.getItem(StorageKeys.Spendings);
      // data = json != null ? JSON.parse(json) : [];
    } catch (err) {
      console.log(err);
    }

    return data;
  }
}
