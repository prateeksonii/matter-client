import { Box, Container } from "@chakra-ui/layout";
import TopLogo from "./TopLogo";

const Layout = ({ children, maxW }) => {
  return (
    <Box h='100vh' bg='linear-gradient(90deg, #4776E6 0%, #8E54E9 100%);'>
      <TopLogo />
      <Container
        h='full'
        maxW={maxW ?? "60%"}
        centerContent
        display='flex'
        flexDir='column'
        alignItems='center'
        justifyContent='center'
      >
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
