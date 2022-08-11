import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { MentionInput } from 'react-native-controlled-mentions'
import { post_vote } from '../redux/actions/themes/actions';
import { mark_favorite } from '../redux/actions/themes/actions';
import { connect } from 'react-redux'
import { MaterialCommunityIcons } from '@expo/vector-icons';



  const Opinion = ({ post_vote,vote_type, syndicate_id, ref_id, ref_type_id, vote, is_favorite, mark_favorite}) => {
    //console.log('*Vote_type ', vote_type);
    const [isOpinion, setIsOpinion] = useState(false);
    const [value, setValue] = useState(1);
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

    useEffect(() => {
        //console.log('#1',vote_type);
        if(vote){
            vote_type = vote;
            showVote();
        }
      }, [vote]);
      
  const handleShowOpinion = () => {
    setIsOpinion(true);
  };
  
  const handleSubmitSad = () => {
    //ref_type_id = 4 from constants.mastervote.ref_type_id.syndicatequestionresponses
    setIsOpinion(false);
    vote_type = 1;
    post_vote(syndicate_id, ref_id, 4, vote_type).then(async(postResponse) => {
      if (postResponse && postResponse.status=='ok') {
        setValue(value => value +1);
        showVote();
        return
      } else {
          throw new Error('Action not allwed!')
      }
    })
   };

   const handleSubmitConfused = () => {
    //ref_type_id = 4 from constants.mastervote.ref_type_id.syndicatequestionresponses
    setIsOpinion(false);
    vote_type = 2;
    post_vote(syndicate_id, ref_id, 4, vote_type).then(async(postResponse) => {
      if (postResponse && postResponse.status=='ok') {
        setValue(value => value +1);
        return
      } else {
          throw new Error('Action not allwed!')
      }
    })
   };

   const handleSubmitNeutral = () => {
    //ref_type_id = 4 from constants.mastervote.ref_type_id.syndicatequestionresponses
    setIsOpinion(false);
    vote_type = 3;
    post_vote(syndicate_id, ref_id, 4, vote_type).then(async(postResponse) => {
      if (postResponse && postResponse.status=='ok') {
        setValue(value => value +1);
        return
      } else {
          throw new Error('Action not allwed!')
      }
    })
   };

   const handleSubmitHappy = () => {
   //ref_type_id = 4 from constants.mastervote.ref_type_id.syndicatequestionresponses
   setIsOpinion(false);
   vote_type = 4;
   post_vote(syndicate_id, ref_id, 4, vote_type).then(async(postResponse) => {
     if (postResponse && postResponse.status=='ok') {
      setValue(value => value +1);
       return
     } else {
         throw new Error('Action not allwed!')
     }
   })
   };

   const handleSubmit = () => {
    //ref_type_id = 4 from constants.mastervote.ref_type_id.syndicatequestionresponses
    setIsOpinion(false);
    vote_type = 5;
    post_vote(syndicate_id, ref_id, 4, vote_type).then(async(postResponse) => {
      if (postResponse && postResponse.status=='ok') {
        setValue(value => value +1);
        return
      } else {
          throw new Error('Action not allwed!')
      }
    })
   };

   

   const handleFavorite = () => {
    //ref_type_id = 4 from constants.mastervote.ref_type_id.syndicatequestionresponses
    setIsOpinion(false);
    console.log('is_favorite ', is_favorite);
    mark_favorite(syndicate_id, ref_id, 4, is_favorite).then(async(postResponse) => {
      if (postResponse && postResponse.status=='ok') {
        console.log('mark_favorite SUCCESS')
        setValue(value => value +1);
        return
      } else {
          throw new Error('Action not allowed!')
      }
    })
   };

   const showVote = () => {
    //console.log('showVote',vote_type);
    if(vote){
      vote_type = vote;
    }
    switch (vote_type) {
        case  1: {
          //console.log('vote 1');
          return (
            <TouchableOpacity onPress={handleShowOpinion}>
            <MaterialCommunityIcons name="emoticon-sad-outline" size={30} color="#726F6E" /> 
          </TouchableOpacity>
          );
        }
        case  2: {
          //console.log('vote 2');
          return (
            <TouchableOpacity onPress={handleShowOpinion}>
            <MaterialCommunityIcons name="emoticon-confused-outline" size={30} color="#726F6E" /> 
          </TouchableOpacity>
          );
        }
        case  3: {
          //console.log('vote 3');
          return (
            <TouchableOpacity onPress={handleShowOpinion}>
            <MaterialCommunityIcons name="emoticon-neutral-outline" size={30} color="#726F6E" /> 
          </TouchableOpacity>
          );
        }
        case  4: {
          //console.log('vote 4');
            return (
            <TouchableOpacity onPress={handleShowOpinion}>
                <MaterialCommunityIcons name="emoticon-happy-outline" size={30} color="#726F6E" /> 
              </TouchableOpacity>
            );
          }
          case  5: {
            //console.log('vote 5');
            return (
            <TouchableOpacity onPress={handleShowOpinion}>
                <MaterialCommunityIcons name="emoticon-outline" size={30} color="#726F6E" /> 
              </TouchableOpacity>
            );
          }
        default:
          return (
            <Text>
            <TouchableOpacity onPress={handleShowOpinion}>
                <Paragraph style={{ fontWeight: 'bold', fontSize: 30, color:'#726F6E' }}>
                    <MaterialCommunityIcons name="thumbs-up-down-outline" size={23} color="#726F6E" /> 
                </Paragraph>
            </TouchableOpacity>
           
            </Text>
          );
      }
   };


  return (
    <>
      { isOpinion ? (<>
        <Text>
          <TouchableOpacity onPress={handleSubmitSad}>
            <MaterialCommunityIcons name="emoticon-sad-outline" size={30} color="#726F6E" /> 
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmitConfused}>
            <MaterialCommunityIcons name="emoticon-confused-outline" size={30} color="#726F6E" /> 
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmitNeutral}>
            <MaterialCommunityIcons name="emoticon-neutral-outline" size={30} color="#726F6E" /> 
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmitHappy}>
            <MaterialCommunityIcons name="emoticon-happy-outline" size={30} color="#726F6E" /> 
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit}>
            <MaterialCommunityIcons name="emoticon-outline" size={30} color="#726F6E" /> 
          </TouchableOpacity>
        </Text>
      </>) :
    ( 
      <Text id={value}>
        {showVote()}
      </Text>
     ) }
     
     <Text>
       <TouchableOpacity onPress={handleFavorite}>
          <MaterialCommunityIcons name="cards-heart" size={20} color={is_favorite?'#E32C05':'#726F6E'} /> 
        </TouchableOpacity>
    </Text>
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

const mapStateToProps = (state, ownProps) => {
    return {
      vote: state.themes.vote
    }
  }

const mapDispatchToProps = dispatch => ({ 
  post_vote:(syndicate_id, ref_id, ref_type_id, vote_type) => dispatch(post_vote(syndicate_id, ref_id, ref_type_id, vote_type)),
  mark_favorite:(syndicate_id, ref_id, ref_type_id, is_favorite) => dispatch(mark_favorite(syndicate_id, ref_id, ref_type_id, is_favorite))
})

export default connect(mapStateToProps,
  mapDispatchToProps
)(Opinion) 