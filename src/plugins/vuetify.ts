import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { createVuetify, ThemeDefinition } from 'vuetify'

const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#6200EE',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00'
  }
}

const upsettledLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#45ABB0',
    'primary-darken-1': '#3700B3',
    secondary: '#659596',
    'secondary-darken-1': '#018786',
    error: '#f87266',
    info: '#6a49f6',
    success: '#6fae30',
    warning: '#efa937',
    accent: '#57a2db'
  }
}

const upsettledDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#292929',
    surface: '#292929',
    primary: '#45ABB0',
    'primary-darken-1': '#3700B3',
    secondary: '#659596',
    'secondary-darken-1': '#018786',
    error: '#f87266',
    info: '#6a49f6',
    success: '#6fae30',
    warning: '#efa937',
    accent: '#57a2db'
  }
}

export default createVuetify({
  components,
  directives,
  defaults: {
    VCard: {
      elevation: '6'
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  theme: {
    defaultTheme: 'upsettledDarkTheme',
    themes: {
      upsettledLightTheme,
      upsettledDarkTheme,
      myCustomLightTheme
    }
  }
})
