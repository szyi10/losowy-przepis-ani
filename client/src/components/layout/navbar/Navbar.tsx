import { Link } from "react-router-dom"
import { navLinks } from "../../../lib/constants"

const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 right-0 h-20 flex items-center justify-center">
      <nav className="flex gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            to={link.url}
            className="text-slate-500 hover:text-green-600 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}

export default Navbar
