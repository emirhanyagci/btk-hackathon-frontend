'use client';
/*eslint-disable*/

import Link from '@/components/link/Link';
import MessageBoxChat from '@/components/MessageBox';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Icon,
  Img,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { MdAutoAwesome, MdBolt, MdEdit, MdPerson } from 'react-icons/md';
import Bg from '../../../public/img/chat/bg-image.png';
import axios from 'axios';
import { redirect, useParams } from 'next/navigation';
import { UseAuthContext } from '@/contexts/AuthContext';
export default function Chat() {
  const [inputOnSubmit, setInputOnSubmit] = useState<string>('');
  const [inputCode, setInputCode] = useState<string>('');
  const [outputCode, setOutputCode] = useState<string>('');
  const [messages, setMessages] = useState<any>([]);
  const [model, setModel] = useState('gpt-4o');
  const [loading, setLoading] = useState<boolean>(false);
  const { value } = UseAuthContext();
  const { isLoggedIn, token } = value;
  const scrollRef = useRef<any>(null);
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');
  const inputColor = useColorModeValue('navy.700', 'white');
  const iconColor = useColorModeValue('brand.500', 'white');
  const bgIcon = useColorModeValue(
    'linear-gradient(180deg, #FBFBFF 0%, #CACAFF 100%)',
    'whiteAlpha.200',
  );
  const brandColor = useColorModeValue('brand.500', 'white');
  const buttonBg = useColorModeValue('white', 'whiteAlpha.100');
  const gray = useColorModeValue('gray.500', 'white');
  const buttonShadow = useColorModeValue(
    '14px 27px 45px rgba(112, 144, 176, 0.2)',
    'none',
  );
  const params = useParams<{ chatId: string }>();

  const textColor = useColorModeValue('navy.700', 'white');
  const placeholderColor = useColorModeValue(
    { color: 'gray.500' },
    { color: 'whiteAlpha.600' },
  );
  if (!isLoggedIn) return redirect('/login');
  async function fetchHistory() {
    const chatId = params.chatId;
    const messageHistory = await axios.get('/api/message', {
      params: { chatId, token },
    });
    console.log(messageHistory.data);
    if (!messageHistory.data) return;
    setMessages([...messageHistory.data]);
    setTimeout(() => {
      if (scrollRef.current)
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, 500);
  }
  useEffect(() => {
    fetchHistory();
  }, []);
  const handleTranslate = async () => {
    const chatId = params.chatId;

    setInputOnSubmit(inputCode);

    if (!inputCode) {
      alert('Please enter your message.');
      return;
    }

    setOutputCode('');
    setLoading(true);
    const body = {
      chat_id: chatId,
      message: inputCode,
      category: 'general',
      token,
    };

    const res = await axios.post('/api/message', body);
    console.log(res);

    // console.log(11, response);

    if (res.status !== 200) {
      setLoading(false);
      if (res) {
        alert(
          'Something went wrong went fetching from the API. Make sure to use a valid API key.11',
        );
      }
      return;
    }

    const data = res.data;

    if (!data) {
      setLoading(false);
      alert('Something went wrong');
      return;
    }
    const ai_response = res.data.Candidates[0].Content.Parts[0];
    setMessages([...messages, { prompt: inputCode, answer: ai_response }]);
    setTimeout(() => {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, 500);
    setOutputCode(ai_response);

    setLoading(false);
  };
  // -------------- Copy Response --------------

  // *** Initializing apiKey with .env.local value
  // useEffect(() => {
  // ENV file verison
  // const apiKeyENV = process.env.NEXT_PUBLIC_OPENAI_API_KEY
  // if (apiKey === undefined || null) {
  //   setApiKey(apiKeyENV)
  // }
  // }, [])

  const handleChange = (Event: any) => {
    setInputCode(Event.target.value);
  };

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
        transform={'translate(-50%, -50%)'}
      />
      <Flex
        direction="column"
        mx="auto"
        w={{ base: '100%', md: '100%', xl: '100%' }}
        minH={{ base: '75vh', '2xl': '85vh' }}
        maxW="1000px"
      >
        {/* Main Box DIREK BURASI MAPLENECEK */}
        <Flex
          flexDirection="column"
          gap={10}
          h="70vh"
          maxH="70vh"
          overflowY="auto"
          ref={scrollRef}
          scrollBehavior={'smooth'}
        >
          {messages.map((message, index) => (
            <Flex key={index} direction="column" w="100%" mx="auto" mb={'auto'}>
              <Flex w="100%" align={'center'} mb="10px">
                <Flex
                  borderRadius="full"
                  justify="center"
                  align="center"
                  bg={'transparent'}
                  border="1px solid"
                  borderColor={borderColor}
                  me="20px"
                  h="40px"
                  minH="40px"
                  minW="40px"
                >
                  <Icon
                    as={MdPerson}
                    width="20px"
                    height="20px"
                    color={brandColor}
                  />
                </Flex>
                <Flex
                  p="22px"
                  border="1px solid"
                  borderColor={borderColor}
                  borderRadius="14px"
                  w="100%"
                  zIndex={'2'}
                >
                  <Text
                    color={textColor}
                    fontWeight="600"
                    fontSize={{ base: 'sm', md: 'md' }}
                    lineHeight={{ base: '24px', md: '26px' }}
                  >
                    {message.prompt}
                  </Text>
                </Flex>
              </Flex>
              <Flex w="100%">
                <Flex
                  borderRadius="full"
                  justify="center"
                  align="center"
                  bg={'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)'}
                  me="20px"
                  h="40px"
                  minH="40px"
                  minW="40px"
                >
                  <Icon
                    as={MdAutoAwesome}
                    width="20px"
                    height="20px"
                    color="white"
                  />
                </Flex>
                <MessageBoxChat output={message.answer} />
              </Flex>
            </Flex>
          ))}
        </Flex>
        {/* Chat Input */}
        <Flex
          ms={{ base: '0px', xl: '60px' }}
          mt="20px"
          justifySelf={'flex-end'}
        >
          <Input
            disabled={!isLoggedIn}
            minH="54px"
            h="100%"
            border="1px solid"
            borderColor={borderColor}
            borderRadius="45px"
            p="15px 20px"
            me="10px"
            fontSize="sm"
            fontWeight="500"
            _focus={{ borderColor: 'none' }}
            color={inputColor}
            _placeholder={placeholderColor}
            placeholder="Type your message here..."
            onChange={handleChange}
          />
          <Button
            disabled={!isLoggedIn}
            variant="primary"
            py="20px"
            px="16px"
            fontSize="sm"
            borderRadius="45px"
            ms="auto"
            w={{ base: '160px', md: '210px' }}
            h="54px"
            _hover={{
              boxShadow:
                '0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important',
              bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important',
              _disabled: {
                bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
              },
            }}
            onClick={handleTranslate}
            isLoading={loading ? true : false}
          >
            {isLoggedIn ? 'Submit' : 'Login to Submit'}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
