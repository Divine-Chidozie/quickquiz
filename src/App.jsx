import { Routes, Route, Link } from "react-router-dom";
import InstructorPage from "./pages/InstructorPage";
import StudentPage from "./pages/StudentPage";

function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Quick Links</h1>

      <nav style={{ marginbottom: "20pc" }}>
        <Link to="/instructor" style={{ marginRight: "20px" }}>
          Instuctor
        </Link>
        <Link to="/student">Student</Link>
      </nav>

      <Routes>
        <Route path="/instructor" element={<InstructorPage />} />
        <Route path="/student" element={<StudentPage />} />
      </Routes>
    </div>
  );
}

export default App;
