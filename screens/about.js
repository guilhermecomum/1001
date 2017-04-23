import React, { Component } from 'react'
import Expo from 'expo'
import spotifyWebApi from 'spotify-web-api-node'
import { StatusBar, StyleSheet, Image, Text, View, TouchableOpacity, Linking } from 'react-native'
import { BlurView } from 'expo'

import { Router } from '../main';
import Colors from '../Colors'

export default class About extends Component {

  static route = {
    navigationBar: {
      title: 'About',
      tintColor: Colors.black,
      backgroundColor: 'rgba(0,0,0,0.0)',
    },
  };

  render() {
    const uri = 'https://i.scdn.co/image/f78f586c673218510018f8a883b7a36380e2d420'

    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'stretch',
        paddingTop: Expo.Constants.statusBarHeight,
      }}
      >
        <Image style={StyleSheet.absoluteFill} source={{ uri }} />
        <BlurView tint="dark" intensity={100} style={StyleSheet.absoluteFill}>
          <View style={{
            flex: 1,
            justifyContent: 'flex-start',
            paddingHorizontal: 20,
            paddingTop: 20
          }}>
            <Text style={{
              fontSize: 26,
              color: Colors.yellow,
            }}>
              Want to know why this album is here and the history behide?
            </Text>
          </View>
        </BlurView>
      </View>
    );
  }
}

Expo.registerRootComponent(About);
