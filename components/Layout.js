import Navbar from './Navbar'
import Footer from './Footer'
import { Container } from 'semantic-ui-react'

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <Container>{children}</Container>
      <Footer />
    </div>
  )
}

export default Layout
