import React from 'react'
import Expo from 'expo'
import { Ionicons } from '@expo/vector-icons'
import { View, Text } from 'react-native'
import Colors from '../Colors'
export default class NavBar extends React.Component {

  render() {
    const { index } = this.props
    return (
      <View>
        <View style={{
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 10,
          backgroundColor: Colors.black,
          paddingTop: Expo.Constants.statusBarHeight,
        }}>

          <View style={{ width: 20, marginRight: 20 }}>
            <Ionicons name="ios-menu" size={32} color={Colors.yellow} />
          </View>

          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
            <Text style={{
              color: Colors.white,
              fontWeight: 'bold',
              textAlign: 'center',
              paddingRight: 40,
            }}>
              { index }
            </Text>
          </View>
        </View>
      </View>
    )
  }
}
