import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

import { CssBaseline, ThemeProvider} from '@mui/material';
import { SWRConfig } from 'swr';

import { lightTheme } from '@/themes';
import { CartProvider, UiProvider, AuthProvider } from '@/context'
//Configuracion global de SWR
export default function App({ Component, pageProps }: AppProps) {
  return (
  <SessionProvider>
      <SWRConfig 
        value={{
          refreshInterval: 500,
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <AuthProvider>
            <CartProvider> {/*Se pone a nivel global ya que en todas las paginas necesito el carrito */}
              <UiProvider>
                <ThemeProvider theme={lightTheme}>
                  <CssBaseline>
                    <Component {...pageProps} />
                  </CssBaseline>
                </ThemeProvider>
              </UiProvider>
            </CartProvider>
        </AuthProvider>

      </SWRConfig>
    </SessionProvider>
  )
}
