import Link from 'next/link'
import ExtLink from './ext-link'
import { FiArrowUpRight } from 'react-icons/fi'

const uber = 'uber'
const linkedin = 'linkedin'

const Headline = () => (
  <div className="headline">
    <div className="container">
      <p>
        <span>Product designer at</span>

        {uber && (
          <a
            className="uber"
            href={`https://www.linkedin.com/in/tutumenezes`}
            title={`${uber}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            Uber <FiArrowUpRight />
          </a>
        )}
      </p>
    </div>
  </div>
)

export default Headline
