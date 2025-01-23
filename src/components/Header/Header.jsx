import React, { useContext } from 'react'
import { StoreContextUsePopcorn } from '../../App'

const Header = () => {

  const { stateMovie, dispatchMovie } = useContext(StoreContextUsePopcorn);

  return (
    <nav className="nav-bar">
        <div className="logo">
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
        </div>
        <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={stateMovie.query}
          onChange={(e) => dispatchMovie({ type: "change", propertId: "query", value: e.target.value })}
        />
        <p className="num-results">
          Found <strong>{stateMovie.movies.length}</strong> results
        </p>
      </nav>
  )
}

export default Header
