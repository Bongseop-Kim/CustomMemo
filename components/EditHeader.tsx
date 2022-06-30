import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import IconRightButton from './IconRightButton';
import {RootStackNavigationProp} from '../screens/RootStack';
import ItemsContext from '../contexts/ItemsContext';
import {Type} from '../api/types';
import Storage from '../storages/Storages';

function EditHeader() {
  const {
    items,
    setItems,
    locks,
    setLocks,
    unlocks,
    setUnlocks,
    dropdowns,
    setDropdowns,
  }: any = useContext(ItemsContext);
  const navigation = useNavigation<RootStackNavigationProp>();

  const onGoBack: () => void = async () => {
    navigation.pop();
  };

  useEffect(() => {
    Storage.set('items', items).catch(console.error);
    Storage.set('locks', locks).catch(console.error);
    Storage.set('unlocks', unlocks).catch(console.error);
    Storage.set('dropdowns', dropdowns).catch(console.error);
  }, [items, locks, unlocks, dropdowns]);

  const createItems = (typeName: string, type: Array<Type>, setType: any) => {
    const newItem = {
      key: `${typeName}${items.length}`,
      index: type.length,
      type: typeName,
      name: '',
      count: items.length,
    };
    setItems([...items, newItem]);
    const newData = {
      key: `${typeName}${items.length}`,
      value: [],
    };
    setType([...type, newData]);
  };
  const deleteItem = () => {
    switch (items[items.length - 1]?.type) {
      case 'lock':
        setLocks(locks.slice(0, items.length - 1));
        break;
      case 'unlock':
        setUnlocks(unlocks.slice(0, items.length - 1));
        break;
      case 'dropdown':
        setDropdowns(dropdowns.slice(0, items.length - 1));
        break;
    }
    setItems(items.slice(0, items.length - 1));
  };

  return (
    <View style={styles.block}>
      <View>
        <IconRightButton onPress={onGoBack} name="arrow-back" />
      </View>
      <View style={styles.buttons}>
        <IconRightButton
          hasMarginRight
          name="lock"
          onPress={() => createItems('lock', locks, setLocks)}
        />
        <IconRightButton
          hasMarginRight
          name="lock-open"
          onPress={() => createItems('unlock', unlocks, setUnlocks)}
        />
        <IconRightButton
          hasMarginRight
          name="arrow-drop-down"
          onPress={() => createItems('dropdown', dropdowns, setDropdowns)}
        />
        <IconRightButton name="exposure-minus-1" onPress={() => deleteItem()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    height: 48,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default EditHeader;
