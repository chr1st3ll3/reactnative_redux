import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { 
    StyleSheet, Text, View, TouchableOpacity, TextInput, Keyboard, 
    KeyboardAvoidingView, TouchableWithoutFeedback, ActivityIndicator,
    Alert
  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { login, clearError} from '../redux/actions/login/actions';


const Login = ({ error, clearError, login, isLoading }) => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('rogelio.sevilla+444@gmail.com');
    const [password, setPassword] = useState('12345678');
    
    const handleLogin = () => {
      login(email, password).then(async(res) => {
        if (res.status === 'error') {
          alert(res.payload.message)
        }
        else {
          return navigation.navigate("MainDrawer", { from: 'Login', data: res.payload})
        }
      })
    }

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboard_container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.Middle}>
                <Text style={styles.LoginTextLabel}>Login</Text>
            </View>

            <StatusBar style="auto" />
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Email address"
                placeholderTextColor="#003f5c"
                value={email}
                onKeyPress={(val)=>{
                  clearError()
                }}
                onChangeText={(email) => setEmail(email)}
              />
            </View>
            
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Password"
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                value={password}
                onChangeText={(password) => setPassword(password)}
              />
            </View>
            <TouchableOpacity>
              <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <TouchableOpacity style={styles.loginBtn} 
                    onPress={handleLogin}
                    >
                    <Text style={styles.LoginText}>LOGIN </Text>
                </TouchableOpacity>
            )}
          </View>

        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
}
 
const styles = StyleSheet.create({
  keyboard_container: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image :{
    marginBottom: 40
 
  },
  inputView: {
    backgroundColor: "#FFFF4F",
    borderColor: "#336688",
    borderWidth:1,
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 0,
  },
  loginBtn:
  {
    width:"80%",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    backgroundColor:"#336699",
    tintColor: "#fff",
    overlayColor: '#fff',
    color: '#fff',
  },
  LoginText: {
    marginTop:0,
    fontSize:20,
    fontWeight:'bold',
    color: '#fff',
  },
  LoginTextLabel: {
    marginTop:0,
    fontSize:30,
    fontWeight:'bold',
    color: '#000'
  },
  Middle:{
    alignItems:'center',
    justifyContent:'center',
  },
});

 const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.login.isLoggedIn,
    isLoading: state.login.isLoading,
    userData: state.login.userData,
    error: state.login.error,
  }
}

const mapDispatchToProps = dispatch => ({ 
  login:(email, password) => dispatch(login({email, password})),
  clearError: () => dispatch(clearError()),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login) 
