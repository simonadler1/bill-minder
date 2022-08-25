import React, {useEffect, useState} from 'react';
import {storeData, getData, clearAllBills} from './utils/asyncstorage';
import {v4 as uuid} from 'uuid';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import Header from './components/header.js';
import ListItem from './components/listitem.js';
import AddItem from './components/addItem';

const App = () => {
  const [bills, setBills] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const deleteBill = async id => {
    setBills(prevItems => {
      prevItems = prevItems.filter(bill => bill.id !== id);

      return prevItems;
    });
  };
  const addBill = item => {
    setBills(prevBills => {
      return [...prevBills, {...item, id: uuid()}];
    });
  };
  useEffect(() => {
    async function StoreBills() {
      await storeData(bills);
    }
    if (loaded) {
      StoreBills();
    }
  }, [bills, loaded]);
  useEffect(() => {
    async function FetchData() {
      setBills(await getData());
    }
    FetchData();
    setLoaded(true);
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <AddItem addBill={addBill} />
      <FlatList
        data={bills.sort(
          (a, b) =>
            a.dueDate.diff(a.created, 'days') -
            b.dueDate.diff(b.created, 'days'),
        )}
        renderItem={({item}) => (
          <ListItem bill={item} deleteBill={deleteBill} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
