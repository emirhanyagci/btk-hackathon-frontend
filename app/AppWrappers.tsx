'use client';
import React, { ReactNode } from 'react';
import '@/styles/App.css';
import '@/styles/Contact.css';
import '@/styles/Plugins.css';
import '@/styles/MiniCalendar.css';
import { ChakraProvider } from '@chakra-ui/react';

import theme from '@/theme/theme';
import { UseAuthContext } from '@/contexts/AuthContext';
import { redirect } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function AppWrappers({ children }: { children: ReactNode }) {
  const { value } = UseAuthContext();
  const pathname = usePathname();
  console.log(pathname);

  const { isLoggedIn } = value;
  if (!isLoggedIn && pathname !== '/login' && pathname !== '/signup')
    return redirect('/login');
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
