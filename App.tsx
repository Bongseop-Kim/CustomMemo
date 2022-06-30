import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './screens/RootStack';
import {ItemsContextProvider} from './contexts/ItemsContext';

function App() {
  return (
    <NavigationContainer>
      <ItemsContextProvider>
        <RootStack />
      </ItemsContextProvider>
    </NavigationContainer>
  );
}

export default App;
