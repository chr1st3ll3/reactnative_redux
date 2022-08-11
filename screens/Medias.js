import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch, connect } from 'react-redux'
import { Paragraph, Card } from 'react-native-paper';
import Spacer from '../components/Spacer';
import { get_medias } from '../redux/actions/medias/actions';

const Medias = ({ get_medias, syndicate_id }) => {
  const [isLoggedIn, setLogin] = useState(false);
  const selectedData = useSelector(state => state.panels);
  const [medias, setMedias] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const user_name = useSelector(state => `${state.login.userData.user.first_name} ${state.login.userData.user.last_name}` );
  const dispatch = useDispatch();
  const [responses, setResponses] = useState([]);
  const [isBottomReached, setIsBottomReached] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const baseurl = 'https://storage.googleapis.com/convetit-dev';
  const noimage =  baseurl + '/statpipe/evmfuserimages/default.jpg';
  const navigation = useNavigation();

  useEffect(() => {
    setIsLoading(true);
    get_medias(syndicate_id, responses).then(async(mediasResponse) => {
      if (mediasResponse && mediasResponse.status === 'ok') {
        setMedias(mediasResponse.medias);
        let _responses = responses;
        mediasResponse.medias.forEach(media => {
          _responses.push(media.syndicate_media_id);
        });
        setResponses(_responses);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        throw new Error('Action not allwed!')
      }
    })
  }, []); 

 

  const OpenURLButton = ({ url, title }) => {
    const handlePress = useCallback(async () => {

      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
    return <TouchableOpacity onPress={handlePress}><Paragraph style={styles.title}>{title? title : url}</Paragraph></TouchableOpacity >
  };

  const ShowComments =  (comments) => {
    var commenttext='';
    comments.forEach(comment => {
      if (comment.content)
        commenttext = comment.content + '\nby ' + comment.user.full_name;
    })
    return commenttext;
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
    
    get_medias(syndicate_id, responses).then(async(mediasResponse) => {
      if (mediasResponse && mediasResponse.status === 'ok') {
        let _medias = medias;
        let _responses = responses;
        setIsBottomReached(mediasResponse.bottom_reached);
        mediasResponse.medias.forEach(media => {
          _medias.push(media);
          _responses.push(media.syndicate_media_id);
        });
        setResponses(_responses);
        setMedias(_medias);

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
          data={ medias }
          keyExtractor={(item) => item.syndicate_media_id.toString()}
          renderItem={({item, index}) => {
            return (
              <>
              <Card>
                <Card.Content>
                     <Image style={styles.banner}
                      source={{ uri: item.media_image ? ( baseurl + item.media_image ) : noimage}}/>
                      <OpenURLButton url={item.url} title = {item.title}><Paragraph style={styles.title}>{item.title ? item.title : item.url}</Paragraph></OpenURLButton>
                    <Paragraph style={styles.comment}>{ShowComments(item.comments)}</Paragraph>
                  </Card.Content>
              </Card>
              <Spacer />
              </>
            );
          }}
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
  get_medias:(syndicate_id, responses) => dispatch(get_medias(syndicate_id, responses)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Medias) 