import React, {useEffect, useState} from 'react';
import {storeData, getData} from './utils/asyncstorage';
import {v4 as uuid} from 'uuid';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import Header from './components/header.js';
import ListItem from './components/listitem.js';
import AddItem from './components/addItem';

const App = () => {
  const [bills, setBills] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const deleteBill = async id => {
    console.log('looking to delete ', id);
    setBills(prevItems => {
      console.log('previtems before ', prevItems);
      prevItems = prevItems.filter(bill => bill.id !== id);
      console.log('prev items after ', prevItems);
      return prevItems;
    });
  };
  const addBill = item => {
    setBills(prevBills => {
      return [...prevBills, {...item, id: uuid()}];
    });
  };
  useEffect(() => {
    console.log('store data use effect is running');
    async function StoreBills() {
      await storeData(bills);
    }
    if (loaded) {
      StoreBills();
    }
  }, [bills, loaded]);
  useEffect(() => {
    console.log('fetch data use effect is running');
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
        data={bills.sort((a, b) => a.due - b.due)}
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
