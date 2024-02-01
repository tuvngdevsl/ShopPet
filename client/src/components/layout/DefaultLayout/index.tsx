import React from "react";
import HeaderComponent from "../Header";
import { Container } from "reactstrap";
import Footer from "../Footer";
import { ToastContainer } from "react-toastify";

type Props = {
  children: React.ReactNode;
};

const DefaultLayout = (props: Props) => {
  return (
    <div className="application">
      <HeaderComponent />
      <main className="main">
        <Container>{props.children}</Container>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="light"
        />
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
