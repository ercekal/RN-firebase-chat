import React, {useEffect, useState}  from 'react';
import { Platform, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { GiftedChat } from "react-native-gifted-chat";
import Fire from '../Fire'

const ChatScreen = ({navigation}) => {
  console.log('navigation: ', navigation);
  const [messages, setMessages] = useState([])

  const user = () => {
    return {
      _id: Fire.uid,
      name: navigation.state.params.name
    }
  }
  useEffect(() => {
    Fire.get(message => setMessages(previous => {
      return ({
        messages: GiftedChat.append(previous.message, message)
      })
    }))
    Fire.checkAuth()
    return () => {
      Fire.off()
    }
  }, [])

  const chat = <GiftedChat messages={messages} onSend={Fire.send} user={user()} />

  if (Platform.OS === 'android') {
    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior='padding' keyboardVerticalOffset={30} enabled>
        {chat}
      </KeyboardAvoidingView>
    )
  }
  return <SafeAreaView style={{flex: 1}}>{chat}</SafeAreaView>
}

export default ChatScreen;
