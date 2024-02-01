import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoute, privateRouter } from "./routes/router";
import DefaultLayout from "./components/layout/DefaultLayout";
import AdminLayout from "./components/layout/AdminLayout";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoute.map((route, index) => {
            const Layout = route.layout === null ? Fragment : DefaultLayout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}

          {privateRouter.map((route, index) => {
            const Layout = route.layout === null ? Fragment : AdminLayout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path="/admin"
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              >
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              </Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
