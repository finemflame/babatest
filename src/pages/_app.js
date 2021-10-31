import OffCanvasProvider from '../store/offCanvasProvider'
import '../styles/global.scss'

function WPApp({ Component, pageProps }) {
  return (
    <OffCanvasProvider>
      <Component {...pageProps} />
    </OffCanvasProvider>
  )
}

export default WPApp
