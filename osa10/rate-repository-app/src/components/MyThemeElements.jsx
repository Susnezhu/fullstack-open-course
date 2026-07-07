import { Text as NativeText, StyleSheet, Pressable, TextInput, Platform } from 'react-native';
import { Link as NativeLink } from 'react-router-native';

import theme from '../theme';

const UserDeviceSettings = () => {
  if (Platform.OS === 'android') {
    return theme.fontFamily.android
  }

  if (Platform.OS === 'android') {
    return theme.fontFamily.ios
  }

  return theme.fontFamily.basic
}

const styles = StyleSheet.create({
  text: {
    color: theme.colors.text,
    fontWeight: theme.fontWeights.normal,
    margin: 5,
    fontSize: theme.fontSize.normal
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  button: {
    backgroundColor: theme.colors.button,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    color: '#E5F9E0',
    fontWeight: 'bold',
    fontSize: theme.fontSize.normal,
  },
  link: {
    color: theme.colors.link,
    fontWeight: theme.fontWeights.normal,
    margin: 5,
    fontSize: theme.fontSize.normal
  },
  input: {
    backgroundColor: theme.colors.basicColor,
    padding: 12,
    fontSize: theme.fontSize.normal,
    margin: 10,
    borderColor: theme.colors.button,
    borderWidth: 2,
    borderRadius: 10,
  },
  wideElement: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    paddingVertical: 8,
  },
  fontFamily: {
    fontFamily: UserDeviceSettings(),
  }
});


// Elements
export const Text = ({ fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    styles.fontFamily,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export const Button = ({ onClick, width, style, ...props }) => {
  const buttonStyle = [
    styles.button,
    styles.fontFamily,
    width === 'wide' && styles.wideElement,
    style,
  ];

  return (
    <Pressable onPress={onClick}>
      <NativeText style={buttonStyle} {...props} />
    </Pressable>
  )
  
};

export const Link = ({ to='/', style, ...props }) => {
  const linkStyle = [
    styles.link,
    styles.fontFamily,
    style,
  ];


  return (
    <NativeLink to={to}>
      <NativeText style={linkStyle} {...props} />
    </NativeLink>
  )
};


export const Input = ({style, id, name, type, onChangeText, value, secret=false, onBlur=false, ...props}) => {
  const inputStyle = [
    styles.input,
    styles.fontFamily,
    style,
  ]

  return (
    <TextInput style={inputStyle}
      id={id}
      name={name}
      type={type}
      onChangeText={onChangeText}
      value={value}
      secureTextEntry={secret}
      placeholder={name}
      onBlur={onBlur}
      {...props}
    />
  )
}