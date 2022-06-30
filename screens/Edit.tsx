import React, {useContext} from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import EditHeader from '../components/EditHeader';
import ItemsContext from '../contexts/ItemsContext';
import {Item} from '../api/types';
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from './RootStack';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';

function Edit() {
  const {items, locks, setLocks}: any = useContext(ItemsContext);
  const navigation = useNavigation<RootStackNavigationProp>();

  const goEditDropdown = (item: any) => {
    navigation.navigate('EditDropdown', item);
  };

  const renderItem: any = ({item}: {item: Item}) => {
    switch (item.type) {
      case 'lock':
        return (
          <TextInput
            multiline
            style={[styles.listItem, styles.touchStyle]}
            placeholder="입력하세요."
            value={locks[item.index].value}
            onChangeText={txt =>
              setLocks(
                locks.map((lock: Item) =>
                  lock.key === item.key ? {...lock, value: txt} : lock,
                ),
              )
            }
          />
        );
      case 'unlock':
        return (
          <Text style={[styles.listItem, styles.untouchStyle]}>
            Text 홈에서 입력하세요.
          </Text>
        );
      case 'dropdown':
        return (
          <Pressable
            style={[styles.listItem, styles.touchStyle]}
            onPress={() => goEditDropdown(item)}>
            <Text>눌러서 문장을 커스텀 하세요.</Text>
          </Pressable>
        );
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <EditHeader />
      <KeyboardAwareFlatList
        enableOnAndroid={true}
        extraScrollHeight={25}
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
  },
  listItem: {
    overflow: 'hidden',
    marginVertical: 4,
    marginHorizontal: 12,
    borderRadius: 4,
  },
  untouchStyle: {
    backgroundColor: '#F0F5F5',
    padding: 8,
    paddingTop: 8,
  },
  touchStyle: {
    backgroundColor: '#A6CFE2',
    padding: 8,
    paddingTop: 8,
  },
});
export default Edit;
