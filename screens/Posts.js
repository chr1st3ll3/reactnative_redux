import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Button, Text, TouchableOpacity, View, FlatList, TextInput, RefreshControl } from 'react-native';
import { useSelector, connect } from 'react-redux'
import { get_posts, post_comment, post_response } from '../redux/actions/themes/actions';
import { Paragraph, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import User from '../components/User';
import Reply from '../components/Reply';
import { useNavigation } from '@react-navigation/native';
import { MentionInput, MentionSuggestionsProps, Suggestion } from 'react-native-controlled-mentions';
import Opinion from '../components/Opinion';

const Posts = ({ syndicate, get_posts, route, post_comment, subcomment, post_response, comment, user_id, vote }) => {
  const navigation = useNavigation();
  const user_name = useSelector(state => `${state.login.userData.user.first_name} ${state.login.userData.user.last_name}` );
  const { syndicate_id, syndicate_question_id, theme_title, theme_index, question_html, active } = route.params;
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [refreshing, setIsRefreshing] = useState(false);
  const [isBottomReached, setIsBottomReached] = useState(false);
  const [postKey, setPostKey] = useState(1);
  const [sbcommentKey, setsbcommentKey] = useState(1);
  const [responseKey, setresponseKey] = useState(1);
  const [textValue, setTextValue] = useState();
  const [numInputs, setNumInputs] = useState(0);
  const refInputs = useRef([textValue]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [comments, setComments] = useState([]);
  const [commentsid, setCommentsid] = useState([]);
  const [replies, setReplies] = useState([]);
  const [repliesid, setRepliesid] = useState([]);
  const [postresponse, setPostresponse] = useState([]);
  const [postresponseid, setPostresponseid] = useState([]);
  var parent_id= 0;
  var comment_parent_id= 0;
  var show_opinion = true;
  


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

  useEffect(() => {
    setIsLoading(true);
    get_posts(syndicate_id, syndicate_question_id, posts).then(async(postResponse) => {
        if (postResponse && postResponse.posts) {
        setPosts(postResponse.posts);
        let _responses = posts;
        postResponse.posts.forEach(post => {
            _responses.push(post.syndicate_question_response_id);
        });
        setResponses(_responses);
        setIsLoading(false);
        } else {
        setIsLoading(false);
        throw new Error('Action not allwed!')
        }
    })
  }, []);

  useEffect(() => {
    if(subcomment){
      if(repliesid.indexOf(subcomment.parent_syndicate_question_response_id) == -1){
        setsbcommentKey(value => value +1);
        replies.unshift([subcomment, subcomment.parent_syndicate_question_response_id]);
        repliesid.unshift(subcomment.syndicate_question_response_id);
      }
    }
  }, [subcomment]);

  useEffect(() => {
    if(comment){
      if(commentsid.indexOf(comment.parent_syndicate_question_response_id) == -1){
        setPostKey(value => value +1)
        setresponseKey(value => value +1)
        comments.unshift([comment, comment.parent_syndicate_question_response_id]);
        commentsid.unshift(comment.syndicate_question_response_id);
      }
      console.log('After', comments.length);
    }
  }, [comment]);


  const renderSubcomment = ({ item }) => {
    if(repliesid.indexOf(item.syndicate_question_response_id) == -1){
      replies.push( [item, parent_id]);
      repliesid.push(item.syndicate_question_response_id);
    } 
    return (
      <View style={styles.subcomments}>
        <Paragraph>
          <Paragraph style={{ fontWeight:'bold' }}>{item.user.first_name} {item.user.first_name}: {item.content_text}</Paragraph>
        </Paragraph>
      </View>
    );
  };

  const replygroup = (parent_id) => {
    var renderreplies = [];
    replies.forEach(element => {
      if(element[1] === parent_id)
        renderreplies.push(element[0]);
    });
    return renderreplies
  }

  const replygroupcomments = (parent_id) => {
    var renderreplies = [];
    //console.log('coments in rgc ', comments.length, ' parent_id - ', parent_id)
    
    comments.forEach(element => {
      if(element[1] === parent_id){
        renderreplies.push(element[0]);
      }
    });
    return renderreplies
  }

  // const replygroupcomments = (parent_id) => {
  //   var rendercomments = [];
  //   console.log('coments in rgc ', comments.length) 
  //   comments.forEach(element => {
  //     console.log('>>', element.content, '<<<<<');
  //     if(element.parent_syndicate_question_response_id && parent_id == element.parent_syndicate_question_response_id)
  //       {console.log('parent_id-->', parent_id);
  //       rendercomments.push(element);
  //       console.log('   comment_id-->', element.syndicate_question_response_id);}
  //   });
    
  //   return rendercomments
  // }

  const renderComment = ({ item }) => {
    //console.log('renderComment')
    if(commentsid.indexOf(item.syndicate_question_response_id) == -1){
      comments.push([item, comment_parent_id]);
      commentsid.push(item.syndicate_question_response_id);
    }
    parent_id = item.syndicate_question_response_id;
    
    return (
      <View style={styles.content} key={ postKey } >
        <User user={item.user} />
        <Paragraph >
          <Paragraph>{item.content_text}</Paragraph>
        </Paragraph>
        <Reply userFirstName={item.user.first_name} syndicate_question_response_id={item.syndicate_question_response_id} 
          /* data={ replygroup(item.syndicate_question_response_id).length == 0 ?  item.comments : replygroup(item.syndicate_question_response_id)} */ />
        <FlatList 
          style={styles.content}
          data={ replygroup(item.syndicate_question_response_id).length == 0 ?  item.comments : replygroup(item.syndicate_question_response_id)}
          //data={ item.comments}
          //keyExtractor={(item) => item.syndicate_question_response_id.toString()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderSubcomment} />
      </View>
    );
  };

  const handleSubmitPost = () => {
    setIsLoading(true);
    post_response(syndicate_id, description, title).then(async(postResponse) => {
    
      if (postResponse && postResponse.status=='ok') {
        setIsLoading(false);
        setresponseKey(value => value +1)
        setDescription('');
        setTitle('');
        postresponse.unshift(postResponse.response);
        postresponseid.unshift(postResponse.response.syndicate_question_response_id);
      } else {
          setIsLoading(false);
          throw new Error('Action not allowed!')
      }
    })
  }

  const handleSubmitComment = (i, syndicate_question_response_id) => {
    setIsLoading(true);
    post_comment(syndicate_question_response_id, refInputs.current[i]).then(async(postResponse) => {
   
      if (postResponse && postResponse.status=='ok') {
        setIsLoading(false);
        setPostKey(value => value +1)
        comments.unshift([postResponse.comment, postResponse.comment.parent_syndicate_question_response_id]);
        commentsid.unshift(postResponse.comment.syndicate_question_response_id);
      } else {
          setIsLoading(false);
          throw new Error('Action not allwed!')
      }
    })
  };

  const setInputValue = (index, value) => {
    const inputs = refInputs.current;
    inputs[index] = value;
    setTextValue(value);

  }

  const renderPost = ({ item, index }) => {
    if(postresponseid.indexOf(item.syndicate_question_response_id) == -1){
      postresponse.push(item);
      postresponseid.push(item.syndicate_question_response_id);
    }
    comment_parent_id = item.syndicate_question_response_id;
    
    if(item.user_id === user_id) show_opinion = false 
    else show_opinion = true;

    if (item.vote){
      if (user_id===item.vote.user_id) show_opinion = true 
      else show_opinion = false;
    }
    //console.log('post--(' , item.user_id === user_id , ')', item.user_id, ' - ', item.title, '//', show_opinion);
    
    const inputs = [];
    inputs.push (
      <Card style={styles.card} key={`post_comment_${index + postKey}`}>
        <Card.Content>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <User user={item.user} />
            </View>
            <View style={{flex: 1}}>
            </View>
          </View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.title}>{item.content}</Text>
            
            <>
            { show_opinion ? (<>
            <Opinion vote_type={item.vote?.vote_type} syndicate_id={item.question.syndicate_id} ref_id={item.syndicate_question_response_id} ref_type_id={item.vote?.ref_type_id} is_favorite={item.is_favorite}/>
            </>) :
            ( 
              <></>
            ) }</>
          <Paragraph style={{ fontWeight: 'bold', fontSize: 18, color:'#726F6E' }}>
            <MaterialCommunityIcons name="comment" size={18} color="#726F6E" /> Comment: 

          </Paragraph>

          <MentionInput
            value={null}
            placeholder="Comment on this post"
            onChange = {value  => setInputValue(index, value)}
            style={{padding: 7, borderBottomWidth: 1}}
            partTypes={[
              {
                trigger: '@',
                renderSuggestions,
                textStyle: {fontWeight: 'bold', color: 'blue'},
              },
            ]}
          />
          <TouchableOpacity onPress={() => handleSubmitComment(index, item.syndicate_question_response_id)}>
            <Paragraph style={{ color:'#0288d1', }}>SUBMIT COMMENT</Paragraph>
          </TouchableOpacity> 
          <FlatList 
            style={styles.comments}
            //data={ comments.length == 0 ?  item.comments : comments}
            data={ replygroupcomments(item.syndicate_question_response_id).length == 0 ?  item.comments : replygroupcomments(item.syndicate_question_response_id)}
            //data = {item.comments}
            //keyExtractor={(item) => item.syndicate_question_response_id.toString()}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderComment}
            />
        </Card.Content>
      </Card>
    );
    return inputs
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
    get_posts(syndicate_id, syndicate_question_id, responses).then(async(postResponse) => {
        if (postResponse && postResponse.posts) {
            let _posts = posts;
            let _responses = responses;
            setIsBottomReached(postResponse.bottom_reached);
            postResponse.posts.forEach(post => {
                _posts.push(post);
                _responses.push(post.syndicate_question_response_id);
                if(postresponseid.indexOf(post.syndicate_question_response_id) == -1){
                  postresponse.push(post);
                  postresponseid.push(post.syndicate_question_response_id);
                }
            });
            setResponses(_responses);
            setPosts(_posts);
            setIsLoadingMore(false);
        } else {
            setIsLoadingMore(false);
            throw new Error('Action not allwed!')
        }
    })
  };


  return (
    <View  style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
           <View>
            <User user={syndicate.facilitator} isFac="1" />
          </View> 
          <Text style={styles.title}>Theme #{theme_index}:{theme_title}</Text>
          <Text style={styles.content}>{question_html}</Text>
          <>
          { active ? (<>
            <Text style={styles.content}>Title:</Text>
              <MentionInput
                  key = 'response_title'
                  value={title}
                  placeholder="Title your post"
                  onChange={setTitle}
                  style={{padding: 7, borderBottomWidth: 1}}
                  partTypes={[
                    {
                      trigger: '@',
                      renderSuggestions,
                      textStyle: {fontWeight: 'bold', color: 'blue'},
                    },
                  ]}
                />
                <Text style={styles.content}>Description:</Text>
                  <MentionInput
                      key = 'response_description'
                      value={description}
                      placeholder=""
                      onChange={setDescription}
                      style={{padding: 7, borderBottomWidth: 1}}
                      partTypes={[
                        {
                          trigger: '@',
                          renderSuggestions,
                          textStyle: {fontWeight: 'bold', color: 'blue'},
                        },
                      ]}
                    />
                <TouchableOpacity onPress={handleSubmitPost}>
                  <Paragraph style={{ color:'#0288d1', }}>POST</Paragraph>
                </TouchableOpacity>
            </>) :
              ( <></>) }
          </>
        </Card.Content>
      </Card>
     
      <View >
        <FlatList key={responseKey}
          //data={posts}
          data={ postresponse.length == 0 ? posts : postresponse}
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
    title: {
      fontSize:14,
      fontWeight:'bold',
      color: '#5B5B5B'
    },
    content: {
      fontSize:14,
      color: '#726F6E'
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
    user: state.login.userData,
    syndicate: state.panels.panel,
    subcomment : state.themes.subcomment,
    comment : state.themes.comment,
    user_id : state.login.userData.user.user_id,
    vote: state.themes.vote
  }
}

const mapDispatchToProps = dispatch => ({ 
  get_posts:(syndicate_id, syndicate_question_id, posts) => dispatch(get_posts(syndicate_id, syndicate_question_id, posts)),
  post_comment:(syndicate_question_response_id, content) => dispatch(post_comment(syndicate_question_response_id, content)),
  post_response:(syndicate_id, content, title) => dispatch(post_response(syndicate_id, content, title)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts) 