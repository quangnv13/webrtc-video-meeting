import React, { FunctionComponent, useEffect } from 'react';
// import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';
import './Register.css';
import AuthService from '../../../services/auth.services';
export interface IRegisterProps {}
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};
const Register: FunctionComponent<IRegisterProps> = (props) => {
  const [form] = Form.useForm();
  const onFinish = ({ username, password }: { username: string; password: string }) => {
    AuthService.login(username, password).then((response) => {
      console.log(response);
    });
  };
  useEffect(() => {
    console.log(AuthService);
  }, []);
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <div className="h-screen flex w-full items-center justify-center login">
        <div className="w-[500px]  border bg-white rounded-md p-10">
          <h1 className="text-center text-3xl mb-2">Đăng ký</h1>
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              residence: ['zhejiang', 'hangzhou', 'xihu'],
              prefix: '86'
            }}
            scrollToFirstError
          >
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'Email không hợp lệ'
                },
                {
                  required: true,
                  message: 'Please input your E-mail!'
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="nickname" label="Username" tooltip="What do you want others to call you?" rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!', whitespace: true }]}>
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu!'
                }
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Xác nhận mật khẩu"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Xác nhận mật khẩu!'
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  }
                })
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
            <Input />
            </Form.Item>
            <Form.Item name="position" label="Chức vụ" rules={[{ required: true, message: 'Vui lòng nhập chức vụ!' }]}>
            <Input />            </Form.Item>
            <Form.Item name="department" label="Bộ phận" rules={[{ required: true, message: 'Vui lòng nhập bộ phận!' }]}>
            <Input />            </Form.Item>
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')))
                }
              ]}
              {...tailFormItemLayout}
            ></Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" className="bg-[#1890ff]">
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Register;
