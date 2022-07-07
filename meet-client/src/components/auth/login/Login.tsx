import React, { FunctionComponent } from 'react';
import { LockOutlined, UserOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import './Login.css';
import AuthService from '../../../services/auth.services';
import { useNavigate } from 'react-router-dom';
export interface ILoginProps {}
const Login: FunctionComponent<ILoginProps> = (props) => {
  const navigate = useNavigate();
  const onFinish = ({ username, password }: { username: string; password: string }) => {
    AuthService.login(username, password).then((response) => {
      if (!response.data) return;
      AuthService.setCurrentAccount(response.data);
      navigate('/');
      notification.open({
        message: 'Đăng nhập thành công!',
        icon: <CheckCircleOutlined style={{ color: '#108ee9' }} />
      });
    });
  };

  return (
    <>
      <div className="h-screen flex w-full items-center justify-center login">
        <div className="w-[400px] h-[400px] border bg-white rounded-md p-10">
          <h1 className="text-center text-3xl mb-2">Đăng nhập</h1>
          <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
            <Form.Item name="username" rules={[{ required: true, message: 'Nhập tên đăng nhập!' }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên đăng nhập" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Nhập mật khẩu!' }]}>
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Mật khẩu" />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Nhớ tài khoản</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button bg-blue-500">
                Đăng nhập
              </Button>
              hoặc{' '}
              <a href="javascript:void(0)" onClick={() => navigate('/auth/register')}>
                Đăng ký!
              </a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Login;
