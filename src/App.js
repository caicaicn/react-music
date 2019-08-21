import React from 'react';
import './assets/reset.css';
import './assets/common.css';
import Routers from "./router/index";
import { Provider } from "react-redux";
import store from "./store";
import Player from "./components/player";
function App() {
    return (
        <Provider store = {store}>
            <Routers />
            <Player></Player>
        </Provider>
    );
}

export default App;
