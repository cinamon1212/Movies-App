import { Alert, Space } from 'antd';

const ErrorMessage = () => (
  <Space
    direction="vertical"
    style={{
      position: 'fixed',
      left: '35%',
      width: '30%',
      zIndex: 1,
      fontWeight: '600',
      top: '10px',
    }}
  >
    <Alert message="Error" description="something was wrong, we are trying to fix it..." type="error" />
  </Space>
);
export default ErrorMessage;
