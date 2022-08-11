import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import { useSelector, connect } from 'react-redux'
import { get_kts } from '../redux/actions/themes/actions';
import { Title, Paragraph, Card } from 'react-native-paper';
import { FontAwesome as Icon } from '@expo/vector-icons';

const Kts = ({  get_kts, route }) => {
  const user_name = useSelector(state => `${state.login.userData.user.first_name} ${state.login.userData.user.last_name}` );
  const { syndicate_id, syndicate_question_id } = route.params;
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [kts, setKts] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isBottomReached, setIsBottomReached] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    get_kts(syndicate_id, syndicate_question_id, kts).then(async(ktsResponse) => {
        if (ktsResponse && ktsResponse.kts) {
          setKts(ktsResponse.kts);
          setIsLoading(false);
        } else {
        setIsLoading(false);
        throw new Error('Action not allwed!')
        }
    })
  }, []);

  const renderQuote = ({ item }) => {
    return (
      <>
      <Card>
        <Card.Title
          title={item.text}
          
        />
        <Card.Content>
          <Paragraph>By {item.user.full_name}</Paragraph>
          <Paragraph > <Icon name="heart" size={12} color="black" /> {item.votes_count} </Paragraph>
        </Card.Content>
      </Card>
      </>
    );
  };

  const renderKt = ({ item }) => {
    return (
      <>
      <Card style={styles.card}>
        <Card.Title
          title={item.name}
          left={(props) => <Icon name="tasks" size={24} color="black" />}
        />
        <Card.Content>
          <Paragraph>{item.content_links}</Paragraph>
          <FlatList
            data={ item.quotes }
            keyExtractor={(item) => item.syndicate_quote_id.toString()}
            renderItem={renderQuote} />
        </Card.Content>
      </Card>
      </>
    );
  };


  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={kts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderKt}
          /* onEndReached={fetchMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={renderFooter}
          refreshing={setIsLoadingMore} */
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EFF0F2',
    },
    card: {
      marginTop: 10
    },
    LoginText: {
      marginTop:100,
      fontSize:30,
      fontWeight:'bold',
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
    user: state.login.userData
  }
}

const mapDispatchToProps = dispatch => ({ 
  get_kts:(syndicate_id, syndicate_question_id, kts) => dispatch(get_kts(syndicate_id, syndicate_question_id, kts)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Kts) 