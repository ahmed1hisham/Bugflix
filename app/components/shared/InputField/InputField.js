import React from 'react';
import {TextInput} from 'react-native';
import {styles} from './styles';

export default InputField = (props) => {
  return (
    <TextInput
      {...props}
      style={[
        styles.inputStyle,
        props.style ? props.style : {},
        props.description === true ? {height: 100} : {},
      ]}
      placeholderTextColor={lightGrey}
      selectionColor={red}
      autoCapitalize={'none'}
      autoCorrect={false}
      autoCompleteType="off"
    />
  );
};
