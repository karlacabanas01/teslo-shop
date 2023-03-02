import { CartProvider, UiProvider, AuthProvider } from '@/context'
import '@/styles/globals.css'
import { lightTheme } from '@/themes'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/system'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
//Configuracion global de SWR
export default function App({ Component, pageProps }: AppProps) {
  return (
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

  )
}
