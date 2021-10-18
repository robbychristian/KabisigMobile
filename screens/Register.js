import React from 'react';
import {KeyboardAvoidingView, View, Text} from 'react-native';

function RegisterScreen() {
  return (
    <KeyboardAvoidingView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View>
        <Text>Register Screen</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

export default RegisterScreen;
