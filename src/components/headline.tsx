import ExtLink from '../components/ext-link'
import themelight from '../styles/theme.light'

const Headline = () => (
  <div className="headline">
    <p>
      Designer at <ExtLink href="https://futuur.com/">Futuur</ExtLink> &{' '}
      <ExtLink href="https://mude.fit/">Mude</ExtLink>.
    </p>
    <p>Passionate about the creative process.</p>
    <style jsx>{`
      .headline {
        font-family: ${themelight.fontFamily.serif};
        font-size: ${themelight.fontSize.small};
        font-weight: ${themelight.fontWeight.bold};
        text-align: center;
        color: ${themelight.colors.text};
      }
      p {
      }
    `}</style>
  </div>
)

export default Headline
