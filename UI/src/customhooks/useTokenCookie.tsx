import { useCookies } from 'next-client-cookies';

const useTokenCookie = (): string => {
    const cookies = useCookies();
    const token = cookies.get("token");
    return token ?? '';
  };
  export default useTokenCookie;  