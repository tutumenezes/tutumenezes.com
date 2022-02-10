import ExtLink from '../components/ext-link'
import themelight from '../styles/theme.light'

const Headline = () => (
  <div className="headline">
    <p>
      <span>
        Designer at{' '}
        <ExtLink className="underlined" href="https://futuur.com/">
          Futuur
        </ExtLink>{' '}
        &{' '}
        <ExtLink className="underlined" href="https://mude.fit/">
          Mude
        </ExtLink>
        .
      </span>
      <span>Passionate about the creative process.</span>
    </p>
    <style jsx>{`
      .headline {
        font-family: ${themelight.fontFamily.serif};
        font-size: ${themelight.fontSize.medium};
        font-weight: ${themelight.fontWeight.regular};
        margin: 128px auto;
        color: ${themelight.colors.text};
      }
      span {
        text-align: left;
        margin: 8px auto;
        display: block;
      }
    `}</style>
  </div>
)

export default Headline
