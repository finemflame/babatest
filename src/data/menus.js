// Menus fragment
export const MenuFragment = `
  fragment MenuFragment on MenuItem {
      id
      label
      url
      path
  }
`

// get all menus menu items
export const MenuItems = `
    primaryMenu: menuItems(where: {location: PRIMARY}) {
        edges {
            node {
                ...MenuFragment
            }
        }
    }
    secondaryMenu: menuItems(where: {location: FOOTER}) {
        edges {
            node {
                ...MenuFragment
            }
        }
    }
`
//all menus
export const AllMenus = `
    query AllMenusQuery {
        primaryMenu: menuItems(where: {location: PRIMARY}) {
            edges {
                node {
                    ...MenuFragment
                }
            }
        }
        secondaryMenu: menuItems(where: {location: FOOTER}) {
            edges {
                node {
                    ...MenuFragment
                }
            }
        }
    }
    ${MenuFragment}
`
