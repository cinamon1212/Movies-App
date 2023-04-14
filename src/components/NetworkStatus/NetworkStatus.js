import { Alert, Space } from 'antd';

const NetworkStatus = () => (
  <Space
    direction="vertical"
    style={{
      bottom: '10px',
      position: 'fixed',
      right: '10px',
      width: '250px',
      fontWeight: '600',
      zIndex: 1,
    }}
  >
    <Alert message="Connection Error" description="no Internet connection" type="error" />
  </Space>
);
export default NetworkStatus;
