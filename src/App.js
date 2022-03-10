import React from 'react';
import {Navigation} from 'react-native-navigation';
import {Text, View} from 'react-native';
import utils from '../tailwind.json';
import {TailwindProvider} from 'tailwind-rn';
import HomeScreen from './pages/HomeScreen';
import CRUDScreen from './pages/CRUDScreen';

export const Home = () => {
  return (
    <TailwindProvider utilities={utils}>
      <HomeScreen />
    </TailwindProvider>
  );
};

export const CRUD = () => {
  return (
    <TailwindProvider utilities={utils}>
      <CRUDScreen />
    </TailwindProvider>
  );
};
