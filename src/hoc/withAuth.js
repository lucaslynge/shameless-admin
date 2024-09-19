import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner'

export default function withAuth(WrappedComponent) {
  return function ProtectedRoute(props) {
    const { authToken, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !authToken) {
        router.push('/');
      }
    }, [authToken, loading, router]);

    if (loading || !authToken) {
      return <div className='flex h-screen justify-center items-center'>

     <ThreeDots
      visible={true}
      height="80"
      width="80"
      color="#4f46e5"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
      />
        </div>
    }

    return <WrappedComponent {...props} />;
  };
}
