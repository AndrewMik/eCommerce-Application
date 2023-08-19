import type { AppProps } from 'next/app';
import { ConfigProvider, Layout, Space } from 'antd';
import MainFooter from '@/components/footer/footer';
import MainHeader from '@/components/header/header';
import { AuthProvider } from '@/context/authorization-context';

const { Content } = Layout;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider>
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Layout style={{ minHeight: '100vh' }}>
          <AuthProvider>
            <MainHeader />
            <Content>
              <Component {...pageProps} />
            </Content>
            <MainFooter />
          </AuthProvider>
        </Layout>
      </Space>
    </ConfigProvider>
  );
}
