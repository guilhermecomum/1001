import React, { Component } from 'react'
import { Image, Text, View, TouchableOpacity, Linking } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import AppRouter from '../navigation/AppRouter'
import Colors from '../Colors'

export default class AlbumInfo extends Component {

  handleClick() {
    Linking.canOpenURL(this.state.url).then(supported => {
      if (supported) Linking.openURL(this.state.url)
    });
  };

  goToAbout = () => {
    console.log("About")
  }

  render() {
    const { album: { title, artist, cover, url }, getAlbum } = this.props

    return (
      <View style={{
        flex: 4,
        backgroundColor: Colors.black,
        paddingTop: 50,
        justifyContent: 'space-between'
      }}
      >
      { cover &&
        <TouchableOpacity
          style={{ alignSelf: 'center'}}
          onPress={this.goToAbout()}>
          <View>
            <Image
              source={{uri: cover}}
              style={{
                flex: 0,
                resizeMode: 'contain',
                height: 270,
                width: 270,
                position: 'relative',
              }}
            />
            <View style={{
              position: 'absolute',
              width: 270,
              height: 270,
              alignSelf: 'center',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
              paddingLeft: 10,
              paddingBottom: 10,
              backgroundColor: 'rgba(0,0,0, 0.2)'
            }}>
              <Entypo name="info-with-circle" size={20} color={Colors.yellow} />
            </View>
          </View>
        </TouchableOpacity>
      }
      <View style={{ flex: 0, alignSelf: 'center'}}>
        <Text style={{
          color: Colors.white,
          textAlign: 'center',
          fontSize: 18,
          paddingBottom: 10,
          fontWeight: "bold",
        }}>
          {title}
        </Text>
        <Text style={{
          color: Colors.white,
          textAlign: 'center',
        }}>
          {artist}
        </Text>
      </View>
      <TouchableOpacity
        onPress={this.handleClick.bind(this)}
        style={{ flex: 0, alignSelf: 'center'}}>
        <View style={{ alignSelf: 'center' }}>
          <Entypo name="spotify" size={40} color={Colors.green} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={getAlbum}
        style={{
          flex: 0,
          paddingVertical: 20,
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        <Entypo name="ccw" size={16} color={Colors.yellow} />
        <Text style={{
          color: Colors.white,
          textAlign: 'center',
          marginLeft: 10,
        }}>
          Random
        </Text>
      </TouchableOpacity>
      </View>
    );
  }
}
