import type { AppProps } from 'next/app';
import { ConfigProvider, Layout, Space, Spin } from 'antd';
import MainFooter from '@/components/footer/footer';
import MainHeader from '@/components/header/header';
import { AuthProvider } from '@/context/authorization-context';
import { useState, useEffect } from 'react';

const { Content } = Layout;

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(delayTimer);
  }, []);

  return (
    <ConfigProvider>
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Layout style={{ minHeight: '100vh' }}>
          <AuthProvider>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin />
              </div>
            ) : (
              <>
                <MainHeader />
                <Content>
                  <Component {...pageProps} />
                </Content>
                <MainFooter />
              </>
            )}
          </AuthProvider>
        </Layout>
      </Space>
    </ConfigProvider>
  );
}
