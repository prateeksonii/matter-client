import { Button } from "@chakra-ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  console.log(navigate);

  return (
    <div>
      <Button onClick={() => navigate("roles")}>Edit roles</Button>
    </div>
  );
};

export default Dashboard;
