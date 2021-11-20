import { Flex, Heading } from "@chakra-ui/layout";

const TopLogo = () => {
  return (
    <Flex
      alignItems='center'
      color='whitesmoke'
      pos='absolute'
      top='10'
      left='10'
    >
      <img src='/icons/matter.png' width={40} height={40} alt='logo' />

      <Heading fontWeight='regular' ml='2' fontFamily='Inter' as='h6' size='md'>
        Matter
      </Heading>
    </Flex>
  );
};

export default TopLogo;
