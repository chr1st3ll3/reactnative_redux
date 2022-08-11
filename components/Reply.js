import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { MentionInput } from 'react-native-controlled-mentions'
import { post_sub_comment } from '../redux/actions/themes/actions';
import { connect } from 'react-redux'



  const User = ({ userFirstName, syndicate_question_response_id, post_sub_comment}) => {
    //console.log('replies file ', JSON.stringify(data));
    const [isReplying, setIsReplying] = useState(false);
    const [value, setValue] = useState('');
    const [comment_key, setComment_key] = useState(1);
    const [textValue, setTextValue] = useState();
    const refInputs = useRef([textValue]);

  
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

  const handleShowTextInput = () => {
    setIsReplying(true);
  };
  
  const handleSubmitReply = () => {
    setIsReplying(false);
    post_sub_comment(syndicate_question_response_id, value).then(async(postResponse) => {
      if (postResponse && postResponse.status=='ok') {
        setComment_key(value => value + 1);
        setValue(null);
        return
      } else {
          throw new Error('Action not allwed!')
      }
    })
   };


  return (
    <>
      { isReplying ? (<>
        <MentionInput
            key = {comment_key}
            value={value}
            placeholder="Type your reply here"
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
          <TouchableOpacity onPress={handleSubmitReply}>
            <Paragraph style={{ color:'#0288d1', }}>SUBMIT REPLY</Paragraph>
          </TouchableOpacity>
      </>) :
    ( <TouchableOpacity onPress={handleShowTextInput}>
        <Paragraph style={{ color:'#0288d1', textDecorationLine: 'underline' }}>Reply to { userFirstName }</Paragraph>
      </TouchableOpacity>) }
    </>
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
  buttonStyle: {
    //margin: 10,
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems:'flex-start',
    padding: 5,
  },
  userName: {
    marginLeft: 5,
    marginTop: -5
  }
})


const mapDispatchToProps = dispatch => ({ 
  post_sub_comment:(syndicate_question_response_id, content) => dispatch(post_sub_comment(syndicate_question_response_id, content))
})

export default connect(null,
  mapDispatchToProps
)(User) 