import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AIPredictor from "./pages/AIPredictor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<AIPredictor />} />
      </Routes>
    </Router>
  );
}

export default App;