import OffCanvasProvider from '../src/store/offCanvasProvider'
import '../src/styles/global.scss'

function WPApp({ Component, pageProps }) {
  return (
    <OffCanvasProvider>
      <Component {...pageProps} />
    </OffCanvasProvider>
  )
}

export default WPApp
