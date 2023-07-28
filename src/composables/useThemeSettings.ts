import { useTheme } from 'vuetify/lib/framework.mjs'
import { computed } from 'vue'
export default function useThemeSettings() {
  const theme = useTheme()
  const isDarkMode = computed(() => theme.global.current.value.dark)
  const toggleTheme = () => {
    theme.global.name.value = isDarkMode.value ? 'upsettledLightTheme' : 'upsettledDarkTheme'
  }
  return { isDarkMode, toggleTheme }
}
