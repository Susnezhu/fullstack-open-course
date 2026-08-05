export const theme = {
  colors: {
    background: '#F9ECE5',
    button: '#9C2113',
    text: '#635358',
    link: {
      light: '#f0f0f0',
      dark: '#3c3c3c'
    },
    bar: '#9C2113',
    basicColor: '#f4f4f4'
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  fontSize: {
    big: 25,
    normal: 18
  },
  fontFamily: {
    basic: 'System',
    android: 'Roboto',
    ios: 'Arial'
  },
};

export const defaultElements = {
  text: {
    default: {
      color: theme.colors.text,
      fontWeight: theme.fontWeights.normal,
      margin: 5,
      fontSize: theme.fontSize.normal
    },
    header: {
      fontSize: theme.fontSize.big,
      fontWeight: theme.fontWeights.bold
    }
  },

  button: {
    default: {
      backgroundColor: theme.colors.button,
      alignSelf: 'flex-start',
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 10,
      color: '#E5F9E0',
      fontWeight: 'bold',
      fontSize: theme.fontSize.normal,
    },
    wide: {
      width: '80%',
      alignSelf: 'center',
      marginTop: 20,
      marginBottom: 20,
      textAlign: 'center',
      paddingVertical: 8,
    }
  },

  link: {
    default: {
      color: theme.colors.link.light,
      fontWeight: theme.fontWeights.normal,
      margin: 5,
      fontSize: theme.fontSize.normal
    },
    withBackground: {
      backgroundColor: theme.colors.button,
      alignSelf: 'flex-start',
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 10,
      color: '#E5F9E0',
      fontWeight: 'bold',
      fontSize: theme.fontSize.normal,
    }
  },

  input: {
    default: {
      backgroundColor: theme.colors.basicColor,
      padding: 12,
      fontSize: theme.fontSize.normal,
      margin: 10,
      borderColor: theme.colors.button,
      borderWidth: 2,
      borderRadius: 10,
    }
  },

  browserLink: {
    default: {
      color: theme.colors.link.light,
      fontWeight: theme.fontWeights.normal,
      margin: 5,
      fontSize: theme.fontSize.normal
    },

  },

  contentContainer: {
    margin: 10,
    backgroundColor: theme.colors.basicColor, 
    padding: 5,
    borderRadius: 5,
    boxShadow: '2px 5px 10px #a1a1a1'
  },

  avatar: {
    default: {
      width: 80,
      height: 80,
      borderRadius: 5,
      marginRight: 20
    }
  },

  singleRepository: {

  }
}