import { NextResponse, NextFetchEvent, NextRequest} from 'next/server';
import {getToken} from 'next-auth/jwt';
 
export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  // const previousPage = req.nextUrl.pathname;
 
  // if (previousPage.startsWith('/checkout')) {
  //   const token = req.cookies.get('token')?.value || '';
 
  //   try {
  //     await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_SEED));
  //     return NextResponse.next();
  //   } catch (error) {
  //     return NextResponse.redirect(
  //       new URL(`/auth/login?p=${previousPage}`, req.url)
  //     );
  //   }
  // }
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }); //Obtenemos la sesion

  console.log({ session });

  if ( !session ) { //Si notenemos ninguna sesion redireccionamos a login
      const requestedPage = req.page.name;
      return NextResponse.redirect(`/auth/login?p=${ requestedPage }`);
  }

  return NextResponse.next();


}
 
// export const config = {
//   matcher: [
//     '/checkout/:path*'
//   ],
// };