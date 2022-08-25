import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const ListItem = ({bill, deleteBill}) => {
  return (
    <TouchableOpacity style={styles.listitem}>
      <View style={styles.listItemView}>
        <Text style={styles.listItemText}>
          {bill.name},{bill.amount},due in {bill.due} days
        </Text>
        <Icon
          name="remove"
          size={35}
          color="firebrick"
          onPress={() => deleteBill(bill.id)}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listitem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 18,
  },
});
export default ListItem;
