import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch, connect } from 'react-redux'
import { Paragraph, Card } from 'react-native-paper';
import Spacer from '../components/Spacer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DELETE_TODO } from '../redux/actions/todoapp/actionTypes';
import { LOGOUT } from '../redux/actions/login/actionTypes';
import { get_panels, add_panel } from '../redux/actions/panels/actions';

const Panels = ({ panels, get_panels, add_panel, panel, syndicate_id }) => {
  const [isLoggedIn, setLogin] = useState(false);
  const selectedData = useSelector(state => state.panels);
  const user_name = useSelector(state => `${state.login.userData.user.first_name} ${state.login.userData.user.last_name}` );
  const dispatch = useDispatch();

  useEffect(() => {
    get_panels().then(async(res) => {
      if (res.status === 'error') {
        alert(res.payload.message)
      }
    }) 
  }, []); 

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@user_info')
      dispatch({
        type: LOGOUT,
        payload: { 
          user_info: {
            user: {
              user_id: '',
              first_name: '',
              last_name: '',
              email: '',
              phone: ''
            }
          }
        }
      });
      return navigation.navigate('Logout')
      return null
    } catch(e) {
      console.log('error on logout()', e)
    }
  
    console.log('Done.')
  }
  const handle_open_panel = async (syndicte_id) => {

    add_panel(syndicte_id).then(async(res) => {
      if (res && res.status === 'ok') {
        navigation.navigate("PanelDetail")
        //console.log(res);
      } else {
        throw new Error('Action not allwed in add_panel!')
      }
    }) 
   
  }

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.Middle}>
        {user_name.trim().length>0 ? (<Text style={styles.LoginText}>Panels for {user_name}</Text>): (<></>)}
      </View>
    
      <View style={styles.text2}>
        {user_name.trim().length>0 ? 
          (
            <TouchableOpacity onPress={async() => {
              await logout()
            } } ><Text style={styles.signupText}> Logout {user_name}</Text></TouchableOpacity>
          ):
          (
            <>
              <Text>Already have account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")} ><Text style={styles.signupText}> Login </Text></TouchableOpacity>
              <Spacer />
              <TouchableOpacity onPress={() => navigation.navigate("PanelDetail")} ><Text style={styles.signupText}> Go to THEMES </Text></TouchableOpacity>
            </>
          )
        }
      </View>
     
      <View>
      <FlatList
          data={ panels }
          keyExtractor={(item) => item.project_id.toString()}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => handle_open_panel(item.syndicate_id)} >
                <Card style={styles.card}>
                  <Card.Content>
                    <Image style={styles.banner}
                      source={{ uri: item.banner }}/>
                    <Paragraph style={styles.title}>{item.title}</Paragraph>
                    <Paragraph style={styles.description}>{item.description}</Paragraph>
                  </Card.Content>
                </Card>
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
  LoginText: {
    marginTop:100,
    fontSize:30,
    fontWeight:'bold',
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
    panel: state.panels.panel,
    panels: state.panels.panels,
    user: state.login.userData
  }
}

const mapDispatchToProps = dispatch => ({ 
  get_panels:() => dispatch(get_panels()),
  add_panel:(syndicate_id) => dispatch(add_panel(syndicate_id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Panels) 