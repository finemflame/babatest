import { useContext } from 'react'
import { OffCanvasContext } from './../store/offCanvasProvider'
// import styles from '../styles/hamburgerMenuButton.module.scss'

const HamburgerMenuButton = () => {
  const { handleBurgerMenuClick, isOpen } = useContext(OffCanvasContext)
  const genericHamburgerLine = `h-1 w-10 my-1 rounded-full bg-black transition ease transform duration-300`
  return (
    <button
      className='z-50 flex flex-col items-center justify-center w-16 h-14 group lg:hidden'
      onClick={() => handleBurgerMenuClick(!isOpen)}
    >
      <div
        className={`${genericHamburgerLine} ${
          isOpen
            ? 'rotate-45 translate-y-3 opacity-100 group-hover:opacity-70'
            : 'opacity-1 group-hover:opacity-70'
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          isOpen ? 'opacity-0' : 'opacity-100 group-hover:opacity-70'
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          isOpen
            ? '-rotate-45 -translate-y-3 opacity-100 group-hover:opacity-70'
            : 'opacity-100 group-hover:opacity-70'
        }`}
      />
    </button>
  )
}

export default HamburgerMenuButton
