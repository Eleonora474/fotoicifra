import Layout from '../components/Layout'
import 'semantic-ui-css/semantic.min.css'

import '../styles/globals.css'
import NextNprogress from 'nextjs-progressbar'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNprogress
        color='#29D'
        startPosition={0.3}
        stopDelayMs={200}
        height='3'
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
export default MyApp
