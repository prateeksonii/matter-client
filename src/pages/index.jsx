import { Button } from "@chakra-ui/button";
import { Grid } from "@chakra-ui/layout";
import { Link } from "react-router-dom";

const IndexPage = () => {
  return (
    <Grid placeItems='center' height='100vh'>
      <Link to='/signin'>
        <Button>Go to App</Button>
      </Link>
    </Grid>
  );
};

export default IndexPage;
