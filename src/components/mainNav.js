import NavLink from './navLink'

const MainNav = ({ nav }) => {
  const menuItems = nav

  return (
    <nav>
      <ul>
        {menuItems.map(item => {
          return (
            <li key={item.node.id}>
              <NavLink link={item.node} />
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default MainNav
