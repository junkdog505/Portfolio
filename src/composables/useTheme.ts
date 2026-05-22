import { ref, watch } from 'vue'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'app_theme'
const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
const theme = ref<Theme>(saved === 'dark' ? 'dark' : 'light')

function apply(t: Theme) {
  document.documentElement.classList.toggle('dark', t === 'dark')
}

apply(theme.value)

export function useTheme() {
  watch(theme, (val) => {
    localStorage.setItem(STORAGE_KEY, val)
    apply(val)
  })

  const toggle = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  return { theme, toggle }
}
