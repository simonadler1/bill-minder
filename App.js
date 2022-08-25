import React, {useEffect, useState} from 'react';
import {storeData, getData} from './utils/asyncstorage';
import {v4 as uuid} from 'uuid';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import Header from './components/header.js';
import ListItem from './components/listitem.js';
import AddItem from './components/addItem';

const App = () => {
  const [bills, setBills] = useState([]);

  const deleteBill = async id => {
    setBills(prevBills => {
      return prevBills.filter(bill => {
        bill.id !== id;
      });
    });
  };
  const addBill = async item => {
    await setBills(prevBills => {
      return [...prevBills, {...item, id: uuid()}];
    });
  };
  useEffect(() => {
    async function getDataAsync() {
      setBills(await getData());
    }
    getDataAsync();
  }, []);
  useEffect(() => {
    async function storeDataAsync() {
      await storeData(bills);
    }
    storeDataAsync();
  }, [bills]);

  return (
    <View style={styles.container}>
      <Header />
      <AddItem addBill={addBill} />
      <FlatList
        data={bills}
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
