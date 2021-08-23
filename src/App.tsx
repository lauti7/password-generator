import React from "react";
import { hot } from "react-hot-loader/root";
import Layout from "./components/Layout";
import PasswordGenerator from "./components/PasswordGenerator";

const App = () => (
  <Layout>
    <PasswordGenerator />
  </Layout>
);

export default hot(App);