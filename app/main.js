import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,  } from 'react-native';
import { Components } from 'expo';
import list from './db/db.json';
const { BlurView } = Components;

class App extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      title: '',
      artist: '',
    }
  }

  getRandom() {
    const r = Math.floor(Math.random()  * (list.items.length) + 1)
    return list.items[r]
  }

  async getAlbum() {
    const album = this.getRandom()

    try {
      let response = await fetch(album.resource_url);
      let responseJson = await response.json();
      this.setState({
        title: responseJson.title,
        artist: responseJson.artists[0].name,
      })
      return console.log("#ACK Response: ", responseJson)
    } catch(error) {
      console.error(error);
    }
  }

  render() {

    return (
      <View style={{
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center'
        }}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center'
        }}
        >
          <Text style={{
            color: '#fff',
            textAlign: 'center',
          }}>
            {this.state.title} - {this.state.artist}
          </Text>
        </View>
        <TouchableOpacity
          onPress={this.getAlbum.bind(this)}
          style={{
            paddingVertical: 20,
            backgroundColor: '#2980b9'
          }}
        >
          <Text style={{
            color: '#fff',
            textAlign: 'center',
          }}>
            Random
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Expo.registerRootComponent(App);
