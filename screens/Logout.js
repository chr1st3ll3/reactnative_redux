import React, { useEffect} from 'react';
import { Pressable, Text, View, ActivityIndicator } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { logout, clearError } from '../redux/actions/logout/actions';

const Logout = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {            
            return navigation.navigate('Login')
        }, 1000);
    }, [])

    const userData = useSelector(state => state.login.userData );
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{fontSize: 20}}>Our Story</Text>
        <Text>Dear {userData.user.first_name}, You are logged out. Redirecting...</Text>
        <ActivityIndicator size="large" color="darkred"/>
         <Pressable
          onPress={() => navigation.navigate('MainTabs')}
          style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
        >
        <Text>Tap here if you are not redirected.</Text>
        </Pressable>
      </View>
    );
  }

 const mapStateToProps = (state, ownProps) => {
 return {
   isLoggedIn: state.logout.isLoggedIn,
   isLoading: state.logout.isLoading,
   userData: state.logout.userData,
   error: state.logout.error,
 }
}

const mapDispatchToProps = dispatch => ({ 
  logout:(email, password) => dispatch(logout({email, password})),
 clearError: () => dispatch(clearError()),
})


export default connect(
 mapStateToProps,
 mapDispatchToProps
)(Logout) 
