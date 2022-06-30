import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Pressable, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ItemsContext from '../contexts/ItemsContext';
import {Item} from '../api/types';
import Modal from 'react-native-modal';
import Storage from '../storages/Storages';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import HomeHeader from '../components/HomeHeader';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../screens/RootStack';

function Home() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {
    items,
    setItems,
    locks,
    setLocks,
    unlocks,
    setUnlocks,
    dropdowns,
    setDropdowns,
    dropdownItems,
    setDropdownItems,
    setIndex,
    modalValue,
    setModalValue,
  }: any = useContext(ItemsContext);

  const [isModalVisible, setModalVisible] = useState([]);

  useEffect(() => {
    setModalVisible(dropdowns.map(() => false));
    setModalValue(
      items
        .filter((item: Item) => item.type === 'dropdown')
        .map((arg: any) =>
          arg.name ? arg.name : '빈 제목입니다. 제목을 설정해주세요.',
        ),
    );
  }, [dropdowns, items, setModalValue]);

  useEffect(() => {
    const tdd = (set: any, key: string) => {
      const fetch = (arg: any) => {
        arg ? set(arg) : set([]);
      };
      Storage.get(key)?.then(fetch).catch(console.error);
    };
    tdd(setItems, 'items');
    tdd(setLocks, 'locks');
    tdd(setUnlocks, 'unlocks');
    tdd(setDropdowns, 'dropdowns');
    tdd(setDropdownItems, 'dropdownItems');
    tdd(setIndex, 'index');
  }, [
    setItems,
    setLocks,
    setUnlocks,
    setDropdowns,
    setDropdownItems,
    setIndex,
  ]);
  useEffect(() => {
    Storage.set('unlocks', unlocks).catch(console.error);
    Storage.set('dropdowns', dropdowns).catch(console.error);
  }, [unlocks, dropdowns]);

  const toggleModal = (item: Item) => {
    setModalVisible(
      isModalVisible.reduce(
        (acc, bool, index) =>
          item.index === index ? acc.concat(!bool) : acc.concat(bool),
        [],
      ),
    );
  };

  const changeModalValue = (item: Item, ddItem: any) => {
    setModalValue(
      modalValue.map((arg: string, index: number) =>
        index === item.index ? ddItem.value : arg,
      ),
    );
    toggleModal(item);
  };

  const renderItem: any = ({item}: {item: Item}) => {
    switch (item.type) {
      case 'lock':
        return (
          <Text style={[styles.listItem, styles.otherStyle]}>
            {locks[item.index]?.value.length
              ? locks[item.index].value
              : '빈칸 입니다.'}
          </Text>
        );
      case 'unlock':
        return (
          <TextInput
            multiline
            style={[styles.listItem, styles.touchStyle]}
            placeholder="입력하세요."
            value={unlocks[item.index]?.value}
            onChangeText={txt =>
              setUnlocks(
                unlocks.map((unlock: Item) =>
                  unlock.key === item.key ? {...unlock, value: txt} : unlock,
                ),
              )
            }
          />
        );
      case 'dropdown':
        return (
          <View>
            <Pressable onPress={() => toggleModal(item)}>
              <Text style={[styles.listItem, styles.touchStyle]}>
                {modalValue[item.index]}
              </Text>
            </Pressable>
            <Modal
              isVisible={isModalVisible[item.index]}
              onBackdropPress={() => toggleModal(item)}>
              {dropdowns[item.index]?.value.length ? (
                // ?. 를 사용한 이유는 dropdowns 는 Asycn를 통해 setDropdowns를 거치는 비동기 방식이기 때문에 undefined오류 방지를 위해서이다.
                <View style={[styles.modalwrap]}>
                  {dropdownItems
                    .filter(
                      (dropdownItem: any) => dropdownItem.routeKey === item.key,
                    )
                    .map((ddItem: any) => (
                      <Pressable
                        key={ddItem.key}
                        onPress={() => changeModalValue(item, ddItem)}>
                        <View
                          style={[
                            styles.modalItem,
                            ddItem.key % 2 ? styles.odd : null,
                          ]}>
                          <Text>
                            {ddItem.value ? ddItem.value : '빈 값 입니다.'}
                          </Text>
                        </View>
                      </Pressable>
                    ))}
                </View>
              ) : (
                <View style={styles.empty}>
                  <Text>리스트가 비어있습니다.</Text>
                  <Pressable onPress={() => goEdit()}>
                    <Text style={styles.editText}>바로 수정하기</Text>
                  </Pressable>
                </View>
              )}
            </Modal>
          </View>
        );
    }
  };

  const goEdit = () => {
    setModalVisible(dropdowns.map(() => false));
    navigation.navigate('Edit');
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <HomeHeader goEdit={goEdit} />
      <KeyboardAwareFlatList
        enableOnAndroid={true}
        extraScrollHeight={10}
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#F0F5F5',
    paddingHorizontal: 12,
  },
  listItem: {
    overflow: 'hidden',
    marginVertical: 4,
    borderRadius: 4,
  },
  touchStyle: {
    backgroundColor: '#A6CFE2',
    padding: 8,
    paddingTop: 8,
  },
  inputStyle: {
    borderBottomWidth: 1,
  },
  otherStyle: {
    padding: 8,
  },
  dropdownWrap: {
    zIndex: 10,
  },
  dropdown: {
    marginVertical: 4,
    borderWidth: 0,
    backgroundColor: '#BAD9D6',
    zIndex: -1,
    elevation: -1,
  },
  containerStyle: {
    borderWidth: 0,
    backgroundColor: '#BAD9D6',
  },
  modalwrap: {
    fle: 1,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  modalItem: {
    padding: 10,
    margin: 8,
  },
  odd: {
    backgroundColor: '#F0F5F5',
    borderRadius: 4,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 4,
  },
  editText: {
    color: 'red',
    paddingTop: 20,
  },
});

export default Home;
