import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeMain.css';
export interface IHomeMainProps {}
const HomeMain: FunctionComponent<IHomeMainProps> = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <div className="grid grid-cols-2 gap-10  mt-20">
          <div>
            <h1 className="text-[48px] leading-[56px] mb-4">Ứng dụng họp trực tuyến cho Vân Hai Ltd</h1>
            <div className="flex items-center gap-2">
              <button
                className="flex items-center justify-center h-[50px] w-[190px] gap-2 bg-[#1a73e8] text-white rounded-[4px] hover:bg-[#185abc] transition-all"
                onClick={() => navigate('auth/login')}
              >
                <i className="far fa-video text-xl text-white"></i>
                <span>Bắt đầu cuộc họp</span>
              </button>
              <span>Hoặc</span>
              <input type="text" className="input-code" placeholder="Nhập mã cuộc họp" />
              <button className="text-[#5f6368] hover:bg-[#f8f9fa] rounded-sm transition-all px-2 py-3" onClick={() => navigate('auth')}>
                Tham gia
              </button>
            </div>
            <hr className="line" />
          </div>
          <div>
            <img src="https://lh3.googleusercontent.com/g6WWfSMs3V0w2hhsaoc9myxQXmfO3IcRPwIsSo7nUJkNDHFb2JT4bffBiNH50_seojxYfC3AfBz8xNHd5k7tqXVsjRVvHGfJfAPx-zz8Lk7EQ0cPuA=rwu-v1-w1400" alt="image" />
          </div>
        </div>
      </div>
    </>
  );
};
export default HomeMain;
