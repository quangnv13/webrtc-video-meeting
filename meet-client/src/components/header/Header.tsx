import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import authService from '../../services/auth.services';
import LogoImg from '../../../src/logo.jpg';
export interface IHeader {}
const Header: FunctionComponent<IHeader> = (props) => {
  const navigate = useNavigate();
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
        <div className="flex items-center gap-2">
          <button className="text-[#5f6368] hover:bg-[#f8f9fa] rounded-sm transition-all px-2 py-3" hidden={authService.isLogged()} onClick={() => navigate('auth/login')}>
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
          </button>
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
export default Header;
