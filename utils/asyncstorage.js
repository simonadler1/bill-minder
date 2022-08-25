import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('bills', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('bills');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    // error reading value
  }
};

export const clearAllBills = async () => {
  try {
    await AsyncStorage.removeItem('bills');
  } catch (e) {
    // remove error
  }

  console.log('Done.');
};
