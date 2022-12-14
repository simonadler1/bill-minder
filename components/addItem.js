import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {DateTime} from 'luxon';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const AddItem = ({addBill}) => {
  const [newBill, setAddBill] = useState({name: '', amount: '', due: 0});
  return (
    <View style={styles.header}>
      <TextInput
        placeholder="Bill Name"
        style={styles.input}
        onChangeText={name => {
          setAddBill({...newBill, name});
        }}
        value={newBill.name}
      />
      <TextInput
        placeholder="Bill Amount"
        style={styles.input}
        onChangeText={amount => setAddBill({...newBill, amount})}
        value={newBill.amount}
      />
      <TextInput
        placeholder="days until due "
        style={styles.input}
        onChangeText={due => setAddBill({...newBill, due})}
        value={newBill.due}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          setAddBill({
            ...newBill,
            created: DateTime.now(),
            dueDate: DateTime.now().plus({days: newBill.due}),
          });
          addBill(newBill);
          setAddBill({name: '', amount: '0', due: 0});
        }}>
        <Text style={styles.btnText}>
          <Icon name="plus" size={20} />
          Add Bill
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    fontSize: 16,
    padding: 8,
  },
  btn: {
    backgroundColor: '#c2bad8',
    padding: 9,
    margin: 5,
  },
  btnText: {
    color: 'darkslateblue',
    fontSize: 20,
    textAlign: 'center',
  },
});
export default AddItem;
