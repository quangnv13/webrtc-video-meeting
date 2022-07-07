import { Avatar, Button, Form, Input, Modal, notification, Tooltip } from 'antd';
import { FunctionComponent, useState } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import roomServices from '../../../services/room.services';
import LogoImg from '../../../logo.jpg';
// import { UserOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
import './Head.css';
import { useNavigate } from 'react-router-dom';
// import authService from '../../../services/auth.services';
export interface IHeader {}
const Head: FunctionComponent<IHeader> = (props) => {
  // const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (payload: { name: string; password: string }) => {
    roomServices.createRoom(payload).then((response) => {
      if (!response.data) return;
      notification.open({
        message: 'Tạo phòng họp thành công!',
        icon: <CheckCircleOutlined style={{ color: '#108ee9' }} />
      });
      window.open(`https://meet.quangnguyen.info/?roomId${response.data.path}`);
      setIsModalVisible(false);
      window.location.reload();
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const detailInfo = () => {
    return (
      <div>
        <h1 className="text-white">Quangnv</h1>
        <h2 className="text-white">quangnv@gmail.com</h2>
      </div>
    );
  };
  return (
    <>
      <div className="flex justify-between p-3">
        <div className="flex items-center gap-10">
          <a href="javascript:void(0)" className="flex items-center gap-2" onClick={() => navigate('/')}>
            <img src={LogoImg} alt="logo" className="w-[124px] h-[40px]" />
            <a href="#" className="opacity-50 text-xl">
              Meet
            </a>
          </a>
          {/* <ul>
            <li className="inline-block hover:bg-[#f8f9fa] rounded-sm transition-all relative">
              <a href="#" className="block px-2 py-3 active">
                Tổng quan
              </a>
            </li>
            <li className="inline-block hover:bg-[#f8f9fa] rounded-sm transition-all relative">
              <a href="#" className="block px-2 py-3 text-[#5f6368]">
                Cách hoạt động
              </a>
            </li>
            <li className="inline-block hover:bg-[#f8f9fa] rounded-sm transition-all relative">
              <a href="#" className="block px-2 py-3 text-[#5f6368]">
                Gói sản phẩm và giá cả
              </a>
            </li>
          </ul> */}
        </div>
        <div className="flex items-center gap-3">
          <button className="h-[40px] w-[150px] gap-1 bg-[#1a73e8] text-white rounded-[4px] hover:bg-[#185abc] transition-all mt-2 flex items-center justify-center" onClick={() => showModal()}>
            <i className="fal fa-plus text-white text-lg"></i>
            <span>Tạo phòng họp</span>
          </button>
          <Tooltip placement="topLeft" title={detailInfo} className="cursor-pointer">
            <Avatar style={{ backgroundColor: '#f56a00', width: 40, height: 40 }} className="flex items-center text-lg">
              Q
            </Avatar>
          </Tooltip>
          {isModalVisible && (
            <Modal title="Tạo phòng họp" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
              <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                <Form.Item label="Tên phòng" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên phòng!' }]}>
                  <Input />
                </Form.Item>

                <Form.Item label="Mật khẩu" name="password">
                  <Input.Password />
                </Form.Item>

                <Form.Item className="submit">
                  <Button type="primary" htmlType="submit" className="bg-[#40a9ff]">
                    Tạo phòng
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          )}
          {/* <button className="text-[#5f6368] hover:bg-[#f8f9fa] rounded-sm transition-all px-2 py-3" hidden={authService.isLogged()} onClick={() => navigate('auth/login')}>
            Đăng nhập
          </button>
          <button
            className="text-[#1a73e8] h-[50px] w-[190px] border border-[#dadce0] rounded-[4px] flex items-center justify-center gap-2 hover:bg-[#f4f8fe] hover:border-[#1a73e8] transition-all"
            onClick={() => navigate('room')}
          >
            <i className="far fa-sign-in text-xl"></i>
            <span>Tham gia cuộc họp</span>
          </button>
          <button className="flex items-center justify-center h-[50px] w-[190px] gap-2 bg-[#1a73e8] text-white rounded-[4px] hover:bg-[#185abc] transition-all" onClick={() => navigate('auth/login')}>
            <i className="far fa-video text-xl text-white"></i>
            <span>Bắt đầu cuộc họp</span>
          </button> */}
          {/* <div>
            <span className="opacity-50 text-lg">8:30 - Th3, 5 thg 7</span>
          </div>
          <div className="flex items-center gap-3">
            <span>
              <i className="fal fa-question-circle text-2xl opacity-60"></i>
            </span>
            <span>
              <i className="far fa-cog text-2xl opacity-60"></i>
            </span>
            <span>
              <i className="fal fa-comment-alt-plus text-2xl opacity-60"></i>
            </span>
          </div>
          <div></div> */}
        </div>
      </div>
    </>
  );
};
export default Head;
