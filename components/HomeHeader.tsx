import React, {useContext} from 'react';
import IconRightButton from './IconRightButton';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemsContext from '../contexts/ItemsContext';
import {View, StyleSheet} from 'react-native';

function HomeHeader({goEdit}: any) {
  const {
    items,
    setItems,
    locks,
    setLocks,
    unlocks,
    setUnlocks,
    setDropdowns,
    setDropdownItems,
    setIndex,
    modalValue,
  }: any = useContext(ItemsContext);

  // console.log(locks.map(lock => lock.value));
  // console.log(unlocks.map(lock => lock.value));
  // console.log(modalValue);
  console.log(items);

  const onCopy = () => {
    // let text =
  };
  return (
    <View style={styles.wrap}>
      <IconRightButton name="content-copy" onPress={onCopy} hasMarginRight />
      <IconRightButton name="edit" onPress={goEdit} hasMarginRight />
      <IconRightButton
        name="delete"
        onPress={async () => {
          try {
            await AsyncStorage.clear();
            setItems([]);
            setLocks([]);
            setUnlocks([]);
            setDropdowns([]);
            setDropdownItems([]);
            setIndex([]);
          } catch (e) {}
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
});

export default HomeHeader;
