import GlobalStyle from "../components/GlobalStyle"
import { DailyRecipe } from "../components/feature"

const Home = () => {
  return (
    <GlobalStyle>
      <div className="max-container h-screen flex items-center justify-center flex-col">
        <div>
          <h2 className="text-lg font-bold">Losowy przepis na dziś:</h2>
          <DailyRecipe />
          <div className="text-slate-500 text-xs mt-4">
            <h5>Dodatkowe informacje:</h5>
            <ul className="list-disc list-inside">
              <li>
                Wszystkie przepisy pochodzą ze strony{" "}
                <a href="https://aniagotuje.pl/" className="underline">
                  aniagotuje.pl
                </a>
              </li>
              <li>Nowy przepis jest losowany codziennie o godzinie 6:30</li>
              {/* <li>Discord bot wysyła wiadomość o godzinie 12:00</li> */}
            </ul>
          </div>
        </div>
      </div>
    </GlobalStyle>
  )
}

export default Home
