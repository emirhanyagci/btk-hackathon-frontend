'use client';
/*eslint-disable*/

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Flex,
  Icon,
  Img,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import Bg from '../public/img/chat/bg-image.png';
import { UseAuthContext } from '@/contexts/AuthContext';

export default function Chat() {
  const { value } = UseAuthContext();
  const { isLoggedIn } = value;
  return (
    <Flex
      w="100%"
      pt={{ base: '70px', md: '0px' }}
      direction="column"
      position="relative"
    >
      <Img
        src={Bg.src}
        position={'absolute'}
        w="350px"
        left="50%"
        top="50%"
        opacity={0.4}
        transform={'translate(-50%, -50%)'}
      />
      <Flex
        direction="column"
        mx="auto"
        w={{ base: '100%', md: '100%', xl: '100%' }}
        alignItems="center"
        justifyContent="center"
        minH={{ base: '75vh', '2xl': '85vh' }}
        maxW="1000px"
      >
        <Badge
          textAlign="center"
          display="inline-block"
          width={150}
          colorScheme="green"
        >
          {!isLoggedIn ? 'Start Chat' : 'Login to start chat'}
        </Badge>
      </Flex>
    </Flex>
  );
}
