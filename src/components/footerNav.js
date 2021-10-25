import NavLink from './navLink'

const FooterNav = ({ nav }) => {
  const menuItems = nav
  return (
    <div>
      <ul>
        {menuItems.map(item => {
          return (
            <li key={item.node.id}>
              <NavLink link={item.node} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default FooterNav
