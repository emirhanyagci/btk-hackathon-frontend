'use client';
/* eslint-disable */

// chakra imports
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Flex,
  HStack,
  Text,
  List,
  Icon,
  ListItem,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { FaCircle } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import NavLink from '@/components/link/NavLink';
import { IRoute } from '@/types/navigation';
import { PropsWithChildren, useCallback } from 'react';
import { usePathname } from 'next/navigation';

interface SidebarLinksProps extends PropsWithChildren {
  routes: IRoute[];
}

export function SidebarLinks(props: SidebarLinksProps) {
  //   Chakra color mode
  const pathname = usePathname();
  let activeColor = useColorModeValue('navy.700', 'white');
  let inactiveColor = useColorModeValue('gray.500', 'gray.500');
  let borderColor = useColorModeValue('gray.200', 'whiteAlpha.300');
  let activeIcon = useColorModeValue('brand.500', 'white');
  let iconColor = useColorModeValue('navy.700', 'white');
  let gray = useColorModeValue('gray.500', 'gray.500');

  const { routes } = props;

  const activeRoute = useCallback(
    (routeName: string) => {
      return pathname?.includes(routeName);
    },
    [pathname],
  );

  const createLinks = (routes: IRoute[]) => {
    return routes.map((route, key) => {
      return (
        <>
          {route.icon ? (
            <Flex
              align="center"
              justifyContent="space-between"
              w="100%"
              maxW="100%"
              ps="17px"
              mb="0px"
            >
              <HStack
                w="100%"
                mb="14px"
                spacing={
                  activeRoute(route.path.toLowerCase()) ? '22px' : '26px'
                }
              >
                <NavLink
                  href={route.layout ? route.layout + route.path : route.path}
                  key={key}
                  styles={{ width: '100%' }}
                >
                  <Flex w="100%" alignItems="center" justifyContent="center">
                    <Box
                      color={
                        route.disabled
                          ? gray
                          : activeRoute(route.path.toLowerCase())
                          ? activeIcon
                          : inactiveColor
                      }
                      me="12px"
                      mt="6px"
                    >
                      {route.icon}
                    </Box>
                    <Text
                      me="auto"
                      color={route.disabled ? gray : activeColor}
                      fontWeight="500"
                      letterSpacing="0px"
                      fontSize="sm"
                    >
                      {route.name}
                    </Text>
                  </Flex>
                </NavLink>
              </HStack>
            </Flex>
          ) : (
            <ListItem ms={0} cursor="not-allowed" opacity={'0.4'}>
              <Flex ps="32px" alignItems="center" mb="8px">
                <Text
                  color={
                    route.disabled
                      ? gray
                      : activeRoute(route.path.toLowerCase())
                      ? activeColor
                      : inactiveColor
                  }
                  fontWeight="500"
                  fontSize="xs"
                >
                  {route.name}
                </Text>
              </Flex>
            </ListItem>
          )}
        </>
      );
    });
  };

  return <>{createLinks(routes)}</>;
}

export default SidebarLinks;
