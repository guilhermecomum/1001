import React, { Component } from 'react';
import { StatusBar, AppRegistry, Text, View } from 'react-native';

import Expo from 'expo';
import { NavigationProvider, StackNavigation, SharedElementOverlay } from '@expo/ex-navigation';

import AppRouter from './navigation/AppRouter';
import NavBar from './components/NavBar'

class AppContainer extends Component {
  render() {
    /**
      * NavigationProvider is only needed at the top level of the app,
      * similar to react-redux's Provider component. It passes down
      * navigation objects and functions through context to children.
      *
      * StackNavigation represents a single stack of screens, you can
      * think of a stack like a stack of playing cards, and each time
      * you add a screen it slides in on top. Stacks can contain
      * other stacks, for example if you have a tab bar, each of the
      * tabs has its own individual stack. This is where the playing
      * card analogy falls apart, but it's still useful when thinking
      * of individual stacks.
      */
    return (
      <NavigationProvider router={AppRouter}>
        <StatusBar barStyle='light-content' />
        <StackNavigation initialRoute={AppRouter.getRoute('home')} />
      </NavigationProvider>
    );
  }
}

Expo.registerRootComponent(AppContainer);
