import React from 'react';
import { StatusBar } from 'react-native';
import AppNav from "./Src/Navigation/Navigation";


const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <AppNav />
    </>
  );
};

export default App;
