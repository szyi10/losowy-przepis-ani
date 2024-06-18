import { Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import { Discord, Home, Random } from "./pages"

const App = () => {
  return (
    <>
      <Suspense fallback={<p>Gotowanie...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/losuj-przepis" element={<Random />} />
          <Route path="/bot-discord" element={<Discord />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
