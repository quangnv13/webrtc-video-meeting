import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
const playVideoFromCamera = async () => {
  try {
    const constraints = { video: true };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    const videoElement = document.querySelector('video#localVideo') as HTMLVideoElement;
    if (!videoElement) return;
    videoElement.srcObject = stream;
  } catch (error) {
    console.error('Error opening video camera.', error);
  }
};
const JoinRoom = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playVideoFromCamera();
  }, []);
  const joinRoom = () => {
    window.open(`https://meet.quangnguyen.info/?roomId=${searchParams.get('roomId')}`);
    navigate('/room');
  };
  return (
    <div className="grid grid-cols-2 gap-10 mt-10">
      <div>
        <video id="localVideo" autoPlay className="w-full" />
      </div>
      <div className="flex items-center justify-center gap-5 flex-col">
        <h1 className="text-[36px]">Sẵn sàng tham gia?</h1>
        <div className="flex items-center gap-3">
          <button className="h-[50px] w-[180px] gap-2 bg-[#1a73e8] text-white rounded-[30px] hover:bg-[#185abc] transition-all mt-2" onClick={() => joinRoom()}>
            <span>Tham gia ngay</span>
          </button>
          <button className="flex items-center justify-center h-[50px] w-[180px] gap-2 text-[#1a73e8] rounded-[30px] border border-[#185abc]" onClick={() => navigate('/room')}>
            <i className="fal fa-undo text-xl text-[#1a73e8]"></i>
            <span>Quay lại</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default JoinRoom;
