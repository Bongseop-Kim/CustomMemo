import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import IconRightButton from './IconRightButton';
import {RootStackNavigationProp} from '../screens/RootStack';
import ItemsContext from '../contexts/ItemsContext';
import {Type} from '../api/types';
import Storage from '../storages/Storages';

function EditHeader({route}: any) {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {
    dropdowns,
    setDropdowns,
    dropdownItems,
    setDropdownItems,
    index,
    setIndex,
  }: any = useContext(ItemsContext);

  useEffect(() => {
    Storage.set('index', index).catch(console.error);
  }, [index]);

  const onGoBack = () => {
    navigation.pop();
  };

  const plus = () => {
    const newDropdownArrayItem: any = {
      key: index.length,
      routeKey: route.key,
      index: dropdownItems.length,
    };
    setDropdowns(
      dropdowns.map((dropdown: Type) =>
        dropdown.key === route.key
          ? {...dropdown, value: dropdown.value.concat(newDropdownArrayItem)}
          : dropdown,
      ),
    );
    const newDropdownItem = {
      key: index.length,
      routeKey: route.key,
      index: dropdownItems.length,
      value: '',
    };
    setDropdownItems([...dropdownItems, newDropdownItem]);
    setIndex(index.concat(1));
  };

  return (
    <View style={styles.block}>
      <View>
        <IconRightButton onPress={onGoBack} name="arrow-back" />
      </View>
      <View style={styles.buttons}>
        <IconRightButton hasMarginRight name="plus-one" onPress={plus} />
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
