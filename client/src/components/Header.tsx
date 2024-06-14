const RANDOM_TEXTS = [
  "Co Ania ma dla nas dzisiaj?",
  "Sprawdźmy, co Ania przygotowała tym razem!",
  "Co pysznego Ania nam dziś zaproponuje?",
  "Zastanawiam się, co dziś ugotujemy z Anią.",
  "Jaki przepis Ania ma dzisiaj w zanadrzu?",
  "Co tym razem przygotujemy z Anią?",
  "Co Ania ma na dzisiaj w swojej kuchni?",
  "Ciekawe, co dzisiaj ugotujemy z Anią.",
  "Co Ania przygotowała na dzisiejszy obiad?",
  "Zobaczmy, co dziś ugotujemy z Anią.",
]

const Header = () => {
  const randomNumber = Math.floor(Math.random() * RANDOM_TEXTS.length)

  return (
    <header className="flex flex-col items-center text-center">
      <h2 className="text-2xl font-bold tracking-wide">
        Losowy przepis Ani Gotuje
      </h2>
      <p className="text-slate-600">{RANDOM_TEXTS[randomNumber]}</p>
    </header>
  )
}

export default Header
