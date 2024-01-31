import React from "react";
import ReactDOM from "react-dom/client";
import AppLayout from "./router/index.jsx";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { compose, createStore } from "redux";

import { PersistGate } from "redux-persist/integration/react";
import allReducers from "../src/redux/reducer/index.jsx";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const theme = createTheme({
  typography: {
    fontFamily: "real",
  },
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  storage,
};

const store = createStore(allReducers, composeEnhancers());

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Router>
          <AppLayout />
        </Router>
      </ThemeProvider>
    </CacheProvider>
    {/* </PersistGate> */}
  </Provider>
);
