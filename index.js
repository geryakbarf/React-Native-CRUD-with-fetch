/**
 * @format
 */

import React from 'react';
import {Navigation} from 'react-native-navigation';
import {CRUD, Home} from './src/App';

Navigation.registerComponent('HomeScreen', () => Home);
Navigation.registerComponent('CRUDScreen', () => CRUD);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              id: 'CRUDScreen',
              name: 'CRUDScreen',
              options: {
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  });
});
