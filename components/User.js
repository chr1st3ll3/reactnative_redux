import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Paragraph } from 'react-native-paper';

const User = (props) => {
  const { user, isFac } = props; 

  // if (!isFac)  console.log('User user', user);

  const showUser = () => {

  };

  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={showUser}>
      <View style={styles['ring_' + user.ring]}>
        <Image style={styles.userPicture}
          source={{ uri: user.profile_image_thumb }}/>
      </View>
      <Text style={styles.user_name}>
        <Paragraph style={{ fontWeight:'bold', }}> {user.first_name} {user.last_name}{isFac ? <Paragraph  style={{ color:'#726F6E', }}> (Facilitator)</Paragraph> : ''}{'\n'}</Paragraph>
        <Paragraph style={{ color:'#726F6E', }}>{user.headline}</Paragraph>
      </Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  userPicture: {
    borderRadius: 50,
    width: 30,
    height: 30
  },
  ring_00: {
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#dd1c44',
    position: 'relative',
  },
  ring_01: {
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#d8a131',
    position: 'relative',
  },
  ring_02: {
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#ca802a',
    position: 'relative',
  },
  ring_03: {
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#cb412c',
    position: 'relative',
  },
  ring_04: {
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#c53643',
    position: 'relative',
  },
  ring_05: {
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#862c6d',
    position: 'relative',
  },
  ring_06: {
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#432a82',
    position: 'relative',
  },
  ring_07: {
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#111250',
    position: 'relative',
  },
  buttonStyle: {
    //margin: 10,
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems:'flex-start',
    padding: 5,
  },
  user_name: {
    marginLeft: 5,
    marginTop: -5
  }
})

export default User;
