import { createContext, useReducer, useState } from "react";
import Header from "./components/Header/Header";
import { mainReducer } from "./state/Reducer/Main";
import { mainState } from "./state/State/Main";
import Movies from "./components/Movies/Movies";
import Summary from "./components/Watched/Summary";
import WatchedList from "./components/Watched/WatchedList";
import Details from "./components/Watched/Details";


  export const StoreContextUsePopcorn = createContext({});

  export default function App() {
  
  const [stateMovie, dispatchMovie] = useReducer(mainReducer, mainState);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <>
      <StoreContextUsePopcorn.Provider value={{ stateMovie, dispatchMovie }}>
        <Header />
        <main className="main">
          <Movies />
          <div className="box">
            <button
              className="btn-toggle"
              onClick={() => setIsOpen2((open) => !open)}
            >
              {isOpen2 ? "–" : "+"}
            </button>
            {isOpen2 && (
              <>
                <Summary />
                <WatchedList />
                <Details />
              </>
            )}
          </div>
        </main>
      </StoreContextUsePopcorn.Provider>
    </>
  );
}