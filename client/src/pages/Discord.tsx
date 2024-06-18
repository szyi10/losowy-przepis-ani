import { Link } from "react-router-dom"
import GlobalStyle from "../components/GlobalStyle"

const Discord = () => {
  return (
    <GlobalStyle>
      <div className="max-container flex items-center justify-center flex-col h-screen">
        <h3 className="text-xl font-semibold">Prace trwają... 🏗️</h3>
        <Link to="/" className="text-slate-500 underline">
          Powrót na stronę główną
        </Link>
      </div>
    </GlobalStyle>
  )
}

export default Discord
