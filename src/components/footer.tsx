import Linkedin from './svgs/linkedin'
import Github from './svgs/github'
import { FiTwitter } from 'react-icons/fi'

const twitter = 'tutumenezes'
const github = 'tutumenezes'
const linkedin = 'tutumenezes'

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="copyright">
            Built in TypeScript, NextJs and Notion by tutumenezes in 2022
          </div>
          <div className="settings">
            <a className="toggleDarkMode" title="Toggle dark mode"></a>
          </div>
          <div className="social">
            {twitter && (
              <a
                className="twitter"
                href={`https://twitter.com/${twitter}`}
                title={`Twitter @${twitter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiTwitter className="social-icon" />
              </a>
            )}

            {github && (
              <a
                className="github"
                href={`https://github.com/${github}`}
                title={`GitHub @${github}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="social-icon" />
              </a>
            )}

            {linkedin && (
              <a
                className="linkedin"
                href={`https://www.linkedin.com/in/${linkedin}`}
                title={`LinkedIn ${linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="social-icon" />
              </a>
            )}
          </div>
        </div>
      </footer>
    </>
  )
}
