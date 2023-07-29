import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();
  const handleNavigate = () => navigate("/home");
  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={handleNavigate}>Go to Home</button>
    </div>
  );
}
