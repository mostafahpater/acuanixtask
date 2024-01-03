/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import HomeScreen from './src/screens/homeScreen/HomeScreen';
import { UseContext } from './src/components/UseContext';
function App() {
  const [userData, setUserData] = useState([]);
  return (
    <UseContext.Provider
    value={{
      userData,
      setUserData,
    }}>
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <HomeScreen />
    </SafeAreaView>
    </UseContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: 50,
  },
});

export default App;
