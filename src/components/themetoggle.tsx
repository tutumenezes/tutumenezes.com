import { useTheme } from 'next-themes'
import { FiSun } from 'react-icons/fi'
import { FiMoon } from 'react-icons/fi'
import ReactTooltip from 'react-tooltip'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <>
      {/* The current theme is: {theme} */}
      {theme == 'dark' ? (
        <>
          <button data-tip="Toggle Dark Mode" onClick={() => setTheme('light')}>
            <FiSun />
          </button>
          <ReactTooltip place="bottom" type="light" effect="solid" />
        </>
      ) : (
        <>
          <button data-tip="Toggle Dark Mode" onClick={() => setTheme('dark')}>
            <FiMoon />
          </button>
          <ReactTooltip place="bottom" type="dark" effect="solid" />
        </>
      )}
    </>
  )
}

export default ThemeToggle
