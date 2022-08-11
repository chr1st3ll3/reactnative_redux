import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { useSelector, useDispatch, connect } from 'react-redux'
import {  Paragraph, Card } from 'react-native-paper';
import User from '../components/User';
import Reply from '../components/Reply';
import { MentionInput} from 'react-native-controlled-mentions'
import { get_map } from '../redux/actions/map/actions';

const Map = ({ get_map, syndicate_id }) => {
  const [isLoggedIn, setLogin] = useState(false);
  const selectedData = useSelector(state => state.panels);
  const [map, setMap] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const user_name = useSelector(state => `${state.login.userData.user.first_name} ${state.login.userData.user.last_name}` );
  const dispatch = useDispatch();
  const [responses, setResponses] = useState([]);
  const [isBottomReached, setIsBottomReached] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [value, setValue] = useState('');
 
  useEffect(() => {
    setIsLoading(true);
    get_map(syndicate_id, responses).then(async(mapResponse) => {
      if (mapResponse && mapResponse.status === 'ok') {
        setMap(mapResponse.map);
        let _responses = responses;
        mapResponse.map.forEach(map => {
          _responses.push(map.syndicate_question_response_id);
        });
        setResponses(_responses);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        throw new Error('Action not allwed!')
      }
    })
  }, []); 

  const users = [
    {id: '1', name: 'David Tabaka'},
    {id: '2', name: 'Mary'},
    {id: '3', name: 'Tony'},
    {id: '4', name: 'Mike'},
    {id: '5', name: 'Grey'},
  ];

  const renderSuggestions = ({keyword, onSuggestionPress}) => {
    if (keyword == null) {
      return null;
    }

    return (
      <View>
        {users
          .filter(one => one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))
          .map(one => (
            <Pressable
              key={one.id}
              onPress={() => onSuggestionPress(one)}
              style={{padding: 12}} >
              <Text>{one.name}</Text>
            </Pressable>
          ))
        }
      </View>
    );
  };

  const navigation = useNavigation();
  const [count, setCount] = useState(0);

  const renderSubcomment = ({ item }) => {
    return (
      <View style={styles.subcomments}>
        <Paragraph>
          <Paragraph style={{ fontWeight:'bold' }}>{item.user.first_name} {item.user.first_name}: </Paragraph>
          {item.content_links}
        </Paragraph>
      </View>
    );
  };

  const renderComment = ({ item }) => {
    return (
      <View style={styles.content}>
        <User user={item.user} />
        <Paragraph style={styles.content}>{item.content_links}</Paragraph>
        <Reply userFirstName={item.user.first_name} />
        <FlatList
          style={styles.content}
          data={ item.comments }
          keyExtractor={(item) => item.syndicate_question_response_id.toString()}
          renderItem={renderSubcomment} />
      </View>
    );
  };

  const handleSubmitComment = () => {

  };

  const renderPost = ({ item }) => {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <User user={item.user} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.content}>{item.content_links}</Text>

          <Text>LABEL 1</Text>
          <Slider
            style={{width: '100%', height: 40}}
            value={5}
            minimumValue={0}
            maximumValue={10}
            minimumTrackTintColor="#000000"
            maximumTrackTintColor="#000000"
            thumbTintColor="#ff0000"
          />

          <Text>LABEL 2</Text>
          <Slider
            style={{width: '100%', height: 40}}
            value={5}
            minimumValue={0}
            maximumValue={10}
            minimumTrackTintColor="#000000"
            maximumTrackTintColor="#000000"
          />

          <Paragraph style={{ fontWeight: 'bold', fontSize: 18 }}>
            <MaterialCommunityIcons name="comment" size={18} color="black" /> Commet:
          </Paragraph>
          <MentionInput
            value={value}
            placeholder="Comment on this post"
            onChange={setValue}
            style={{padding: 7, borderBottomWidth: 1}}
            partTypes={[
              {
                trigger: '@',
                renderSuggestions,
                textStyle: {fontWeight: 'bold', color: 'blue'},
              },
            ]}
          />
          <TouchableOpacity onPress={handleSubmitComment}>
            <Paragraph style={{ color:'#0288d1', }}>SUBMIT COMMENT</Paragraph>
          </TouchableOpacity>

          <FlatList
            style={styles.comments}
            data={ item.comments }
            keyExtractor={(item) => item.syndicate_question_response_id.toString()}
            renderItem={renderComment} />
        </Card.Content>
      </Card>
    );
  };

  const renderFooter = () => {
    if (isLoadingMore) {
      return <Text>hi</Text>;
    } else {
      return null;
    }
  };

  
  const fetchMore = async () => {
    if (isLoadingMore || isBottomReached){
      return null;
    }
    setIsLoadingMore(true);
    
    get_map(syndicate_id, responses).then(async(mapResponse) => {
      if (mapResponse && mapResponse.status === 'ok') {
        let _map = map;
        let _responses = responses;
        setIsBottomReached(mapResponse.bottom_reached);
        mapResponse.map.forEach(map => {
          _map.push(map);
          _responses.push(map.syndicate_question_response_id);
        });
        setResponses(_responses);
        setMap(_map);

        setIsLoadingMore(false);
      } else {
        setIsLoadingMore(false);
        throw new Error('Action not allwed!')
      }
   })
  };


  return (
    <View style={styles.container}>
    <View>
      <FlatList
        data={map}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderPost}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.2}
        ListFooterComponent={renderFooter}
        refreshing={setIsLoadingMore}
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
  get_map:(syndicate_id, responses) => dispatch(get_map(syndicate_id, responses)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map) 