import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Pressable, Text} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import DropdownEditHeader from '../components/DropdownEditHeader';
import ItemsContext from '../contexts/ItemsContext';
import Storage from '../storages/Storages';
import {Item} from '../api/types';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';

function EditDropdown({route}: any) {
  const {
    dropdownItems,
    setDropdownItems,
    dropdowns,
    setDropdowns,
    items,
    setItems,
  }: any = useContext(ItemsContext);

  useEffect(() => {
    Storage.set('dropdownItems', dropdownItems).catch(console.error);
  }, [dropdownItems]);

  const renderItem: any = (renderArg: any) => {
    const minus = () => {
      setDropdowns(
        dropdowns.map((dropdown: any) =>
          dropdown.key === renderArg.item.routeKey
            ? {
                ...dropdown,
                value: dropdown.value.filter(
                  (a1: any) => a1.key !== renderArg.item.key,
                ),
              }
            : dropdown,
        ),
      );
      setDropdownItems(
        dropdownItems.filter(
          (dropdownItem: any) => dropdownItem.key !== renderArg.item.key,
        ),
      );
    };
    if (renderArg.item.routeKey === route.params.key) {
      return (
        <View style={styles.wrap}>
          <TextInput
            multiline
            style={styles.dropdownList}
            placeholder="입력하세요."
            value={renderArg.item.value}
            onChangeText={txt =>
              setDropdownItems(
                dropdownItems.map((dropdownItem: any) =>
                  dropdownItem.key === renderArg.item.key
                    ? {...dropdownItem, value: txt}
                    : dropdownItem,
                ),
              )
            }
          />
          <Pressable
            style={styles.delete}
            onPress={() => {
              minus();
            }}>
            <Text style={styles.font}>삭제</Text>
          </Pressable>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <DropdownEditHeader route={route.params} />
      <TextInput
        style={styles.name}
        value={items[route.params.count].name}
        onChangeText={text =>
          setItems(
            items.map((item: Item) =>
              item.key === route.params.key
                ? {
                    ...item,
                    name: text,
                  }
                : item,
            ),
          )
        }
        placeholder="제목을 입력하세요"
      />
      <KeyboardAwareFlatList
        enableOnAndroid={true}
        extraScrollHeight={75}
        data={dropdownItems}
        renderItem={renderItem}
        keyExtractor={(dropdownItem, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#F0F5F5',
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  name: {
    borderBottomWidth: 1,
    padding: 8,
    margin: 8,
  },
  dropdownList: {
    flex: 1,
    backgroundColor: '#A6CFE2',
    padding: 8,
    paddingTop: 8,
    margin: 8,
    borderRadius: 4,
    paddingRight: 36,
  },
  delete: {
    position: 'absolute',
    right: 18,
    bottom: 18,
  },
  font: {
    color: 'red',
  },
});

export default EditDropdown;
