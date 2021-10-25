import Link from 'next/link'
import styles from '../styles/allCategories.module.scss'
import Container from './container'

const AllCategories = ({ categories }) => {
  return (
    <section className={styles.wrapper}>
      <Container>
        <h2>All Categories</h2>
        <div>
          <ul>
            {categories.edges.map(item => {
              return (
                <li key={item.node.id}>
                  <Link href={`${item.node.uri}`}>
                    <a>{item.node.title}</a>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </section>
  )
}

export default AllCategories
