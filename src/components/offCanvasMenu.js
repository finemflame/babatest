import { useContext } from 'react'
import { OffCanvasContext } from '../store/offCanvasProvider'
import MainNav from './mainNav'
import styles from '../styles/offCanvasMenu.module.scss'

const OffCanvasMenu = ({ nav }) => {
  const { isOpen, handleBurgerMenuClick } = useContext(OffCanvasContext)
  return (
    <>
      {isOpen && (
        <div
          className={styles.wrapper}
          onClick={() => {
            handleBurgerMenuClick()
          }}
        >
          <MainNav nav={nav} />
        </div>
      )}
    </>
  )
}

export default OffCanvasMenu
