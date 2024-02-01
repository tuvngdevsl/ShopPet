import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyles from "./components/GlobalStyle";
import "./components/GlobalStyle/GlobalStyles.scss";
import store from "./app/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <GlobalStyles>
      <App />
    </GlobalStyles>
  </Provider>
);
