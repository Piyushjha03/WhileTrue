import { Outlet, ScrollRestoration } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Header from "./components/header";

function App() {
  return (
    <>
      <div className="w-screen h-full">
        <Header />
        <Outlet />
        <ScrollRestoration />
      </div>
      {/* <Header /> */}
    </>
  );
}

export default App;
