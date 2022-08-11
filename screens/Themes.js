import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, connect } from 'react-redux'
import { get_themes } from '../redux/actions/themes/actions';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';

const Themes = ({  themes, get_themes, syndicate_id }) => {
  const user_name = useSelector(state => `${state.login.userData.user.first_name} ${state.login.userData.user.last_name}` );
  const navigation = useNavigation();

  useEffect(() => {
    get_themes(syndicate_id).then(async(res) => {
      if (res.status === 'error') {
        alert(res.payload.message)
      }
    }) 
  }, []); 


  return (
    <View style={styles.container}>
      <View style={styles.Middle}>
        {user_name.trim().length>0 ? (<Text style={styles.TitleText}><MaterialCommunityIcons align="center" name="view-quilt" size={35}/>Themes</Text>): (<></>)}
      </View>
      <View>
      <FlatList
          data={ themes }
          keyExtractor={(item) => item.syndicate_question_id.toString()}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate("ThemesTabs", { syndicate_id: syndicate_id, syndicate_question_id: item.syndicate_question_id, theme_index:item.theme_index, theme_title:item.title, question_html: item.question, active:item.active } )} >
                <Text style={styles.menuItem} > {item.active == 1 ? 'CURRENT THEME' : `# ${item.theme_index}`} - {item.title} </Text>
          
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  TitleText: {
    marginTop:10,
    fontSize:30,
    color: '#726F6E',
  },
  menuItem: {
    fontSize:14,
    color: '#726F6E',
  },
  banner: {
    width: '100%',
    height: 160
  },
  description: {
    fontSize: 12
  },
  Middle:{
    alignItems:'center',
    justifyContent:'center',
  },
  text2:{
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:5
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupText:{
    fontWeight:'bold'
  },

  lineStyle:{
    flexDirection:'row',
    marginTop:30,
    marginLeft:15,
    marginRight:15,
    alignItems:'center'
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    syndicate_id: state.panels.panels[0].syndicate_id,
    themes: state.themes.themes,
    user: state.login.userData
  }
}

const mapDispatchToProps = dispatch => ({ 
  get_themes:(syndicate_id) => dispatch(get_themes(syndicate_id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Themes) 