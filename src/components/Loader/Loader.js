import React from 'react';
import { Space, Spin } from 'antd';

const Loader = () => {
  return (
    <React.Fragment>
      <Space
        direction="vertical"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Space>
          <Spin tip="Loading" size="large">
            <div
              className="content"
              style={{
                padding: '50px',
                borderRadius: '4px',
              }}
            />
          </Spin>
        </Space>
      </Space>
    </React.Fragment>
  );
};
export default Loader;
