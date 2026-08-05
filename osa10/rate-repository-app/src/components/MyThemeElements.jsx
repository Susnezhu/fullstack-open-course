import { Text as NativeText, StyleSheet, Pressable, TextInput, Platform, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link as NativeLink } from 'react-router-native';
import { openURL } from 'expo-linking';
import { useState } from 'react';

import {theme, defaultElements} from '../theme';

const UserDeviceSettings = () => {
  if (Platform.OS === 'android') {
    return theme.fontFamily.android
  }

  if (Platform.OS === 'ios') {
    return theme.fontFamily.ios
  }

  return theme.fontFamily.basic
}

const styles = StyleSheet.create({
  text: defaultElements.text.default,
  button: defaultElements.button.default,
  link: defaultElements.link.default,
  input:defaultElements.input.default,

  fontFamily: {
    fontFamily: UserDeviceSettings(),
  }
});


// Elements
export const Text = ({ type='default', testID, style, ...props }) => {
  const textStyle = [
    styles.text,
    styles.fontFamily,
    type === 'header' && defaultElements.text.header,
    style,
  ];

  return <NativeText style={textStyle} {...props} testID={testID}/>;
};

export const Button = ({ testID, onClick, type, style, ...props }) => {
  const buttonStyle = [
    styles.button,
    styles.fontFamily,
    type === 'wide' && defaultElements.button.wide,
    style,
  ];

  return (
    <Pressable onPress={onClick} testID={testID}>
      <NativeText style={buttonStyle} {...props} />
    </Pressable>
  )
  
};

export const Link = ({ type='default', darkColor=false, testID, to='/', style, ...props }) => {
  const linkStyle = [
    styles.link,
    styles.fontFamily,
    darkColor && {color: theme.colors.link.dark},
    type === 'withBackground' && defaultElements.link.withBackground,
    style,
  ];


  return (
    <NativeLink to={to} testID={testID}>
      <NativeText style={linkStyle} {...props} />
    </NativeLink>
  )
};


export const Input = (
  {
    keyboardType='default', 
    testID, 
    style,
    name,
    onChangeText, 
    value, 
    secret=false, 
    onBlur=false, 
    ...props
  }) => {

  const inputStyle = [
    styles.input,
    styles.fontFamily,
    {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    style,
  ]

  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={inputStyle}>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secret && !showPassword}
        placeholder={name}
        onBlur={onBlur}
        keyboardType={keyboardType}
        testID={testID}
        {...props}
      />

      {secret && (
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeButton}
        >
          <MaterialCommunityIcons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={24}
          />
        </Pressable>
      )}
    </View>
  )
}

export const BrowserLink = ({ testID, url='', style, ...props }) => {
  const linkStyle = [
    styles.link,
    styles.fontFamily,
    style,
  ];

  const openBrowserLink = (url) => {
    openURL(url)
  }

  return (
    <Pressable onPress={() => openBrowserLink(url)} testID={testID}>
      <NativeText style={linkStyle} {...props} />
    </Pressable>
  )
};
