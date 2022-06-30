import AsyncStorage from '@react-native-async-storage/async-storage';
import {Type} from '../api/types';

const storage = {
  async get(key: any) {
    try {
      const raw: any = await AsyncStorage.getItem(key);
      if (!raw) {
        console.log('No saved todos');
      }
      const parsed = JSON.parse(raw);
      return parsed;
    } catch (e) {
      throw new Error('Failed to load sotrage');
    }
  },
  async set(key: any, data: Type) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      throw new Error('Failed to save todos');
    }
  },
};

export default storage;
