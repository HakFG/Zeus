export { auth as middleware } from '@/lib/auth';

export const config = {
  matcher: ['/dashboard/:path*', '/calendar/:path*', '/add/:path*', '/charts/:path*', '/invest/:path*', '/settings/:path*'],
};
