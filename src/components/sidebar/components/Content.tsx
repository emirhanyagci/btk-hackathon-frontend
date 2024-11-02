'use client';
// chakra imports
import {
  Badge,
  Box,
  Button,
  Flex,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import NavLink from '@/components/link/NavLink';
//   Custom components
import avatar4 from '/public/img/avatars/avatar4.png';
import { NextAvatar } from '@/components/image/Avatar';
import Brand from '@/components/sidebar/components/Brand';
import Links from '@/components/sidebar/components/Links';
import { RoundedChart } from '@/components/icons/Icons';
import { PropsWithChildren, useEffect, useState } from 'react';
import { IRoute } from '@/types/navigation';
import { IoMdPerson } from 'react-icons/io';
import { FiLogOut } from 'react-icons/fi';
import { LuHistory } from 'react-icons/lu';
import { MdOutlineManageAccounts, MdOutlineSettings } from 'react-icons/md';
import NewChat from '@/components/icons/NewChat';
import { UseAuthContext } from '@/contexts/AuthContext';
import axios from 'axios';
import { RESPONSE_LIMIT_DEFAULT } from 'next/dist/server/api-utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// FUNCTIONS

interface SidebarContent extends PropsWithChildren {
  routes: IRoute[];
  [x: string]: any;
}

function SidebarContent(props: SidebarContent) {
  const { routes, setApiKey } = props;
  const { value, setValue } = UseAuthContext();
  const { isLoggedIn, token } = value;
  const router = useRouter();
  const [chats, setChats] = useState([]);
  const textColor = useColorModeValue('navy.700', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.300');
  const bgColor = useColorModeValue('white', 'navy.700');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(12, 44, 55, 0.18)',
  );
  const iconColor = useColorModeValue('navy.700', 'white');
  const shadowPillBar = useColorModeValue(
    '4px 17px 40px 4px rgba(112, 144, 176, 0.08)',
    'none',
  );
  const gray = useColorModeValue('gray.500', 'white');
  // SIDEBAR
  async function fetchChats() {
    try {
      const res = await axios.get('/api/chats', {
        params: { token },
      });
      console.log(res.data);

      setChats([...res.data]);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    if (!isLoggedIn) return;
    fetchChats();
  }, [isLoggedIn]);
  async function newChatHandler() {
    try {
      const res = await axios.post('/api/chat', {
        token,
      });
      fetchChats();

      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }
  function logoutHandler() {
    router.push('/login');
    setTimeout(() => {
      setValue({ isLoggedIn: false, token: '' });
    }, 500);
  }
  return (
    <Flex
      direction="column"
      height="100%"
      pt="20px"
      pb="26px"
      borderRadius="30px"
      maxW="285px"
      px="20px"
    >
      <Brand />
      <Stack mb="25px">
        <Flex justify="space-between" alignItems="center">
          {isLoggedIn ? 'New Chat' : 'Login for chat'}
          <Button onClick={newChatHandler} disabled={!isLoggedIn}>
            <NewChat />
          </Button>
        </Flex>
      </Stack>
      <Stack>
        <Flex direction="column" justify="space-between" gap={2}>
          {chats.map((chat: any) => (
            <Link key={chat.chat_id} href={`/chat/${chat.chat_id}`}>
              <Box
                py={2}
                px={2}
                _hover={{ bg: 'rgb(237, 235, 230,0.3)' }}
                cursor="pointer"
                transition="background-color 0.3s ease"
                rounded={5}
              >
                {chat.name || 'New Chat'}
              </Box>
            </Link>
          ))}
        </Flex>
      </Stack>
      <Stack direction="column" mb="auto" mt="8px">
        {/* <Box ps="0px" pe={{ md: '0px', '2xl': '0px' }}>
          <Links routes={routes} />
        </Box> */}
      </Stack>

      {value.isLoggedIn && (
        <Flex
          mt="8px"
          justifyContent="center"
          alignItems="center"
          boxShadow={shadowPillBar}
          borderRadius="30px"
          gap={2}
          p="14px"
        >
          <Button
            variant="transparent"
            border="1px solid"
            borderColor={borderColor}
            borderRadius="full"
            w="34px"
            h="34px"
            px="0px"
            minW="34px"
            justifyContent={'center'}
            alignItems="center"
            onClick={logoutHandler}
          >
            <Icon as={FiLogOut} width="16px" height="16px" color="inherit" />
          </Button>
        </Flex>
      )}
    </Flex>
  );
}

export default SidebarContent;
