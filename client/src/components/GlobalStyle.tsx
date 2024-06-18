import { Footer, Navbar } from "./layout"

const GlobalStyle = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default GlobalStyle
