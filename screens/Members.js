import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useSelector, connect } from 'react-redux'
import Spacer from '../components/Spacer';
import { get_members } from '../redux/actions/members/actions';
import User from '../components/User';

const Members = ({ get_members, syndicate_id }) => {
  const selectedData = useSelector(state => state.panels);
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const user_name = useSelector(state => `${state.login.userData.user.first_name} ${state.login.userData.user.last_name}` )
  const baseurl = 'https://storage.googleapis.com/convetit-dev';
  const noimage =  baseurl + '/statpipe/evmfuserimages/default.jpg';
 
  useEffect(() => {
    setIsLoading(true);
    get_members(syndicate_id, members).then(async(membersResponse) => {
      if (membersResponse && membersResponse.status === 'ok') {
        setMembers(membersResponse.members);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        throw new Error('Action not allwed!')
      }
    })
  }, []); 

  return (
    <View style={styles.container}>

      <View>
      <FlatList
          data={ members }
          keyExtractor={(item) => item.syndicate_user_id.toString()}
          renderItem={({item, index}) => {
            return (
              <>
              <User user={item.user} />
              <Spacer />
              </>
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
    syndicate_id: state.panels.panels[0].syndicate_id,
    user: state.login.userData
  }
}

const mapDispatchToProps = dispatch => ({ 
  get_members:(syndicate_id, members) => dispatch(get_members(syndicate_id, members)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Members) 