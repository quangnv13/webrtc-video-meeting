import React, { FunctionComponent, useEffect, useState } from 'react';
import RoomService, { IRoom } from '../../services/room.services';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;
export interface IRoomProps {}
const ListRoom: FunctionComponent<IRoomProps> = (props) => {
  const navigate = useNavigate();
  const [listRoom, setListRoom] = useState<IRoom[]>();
  const joinRoom = (roomId: string) => {
    // window.open(`https://meet.quangnguyen.info/?roomId=${roomId}`);
    navigate(`/room/join-room/?roomId=${roomId}`);
  };
  useEffect(() => {
    RoomService.getListRoom().then((response) => {
      if (!response.data) return;
      setListRoom(response.data);
    });
  }, []);
  const listRoomD = listRoom?.map((room, index) => {
    return (
      <div key={index}>
        <Card hoverable style={{ width: 300 }} cover={<img alt="example" src="https://cdn.vietnambiz.vn/171464876016439296/2020/6/3/gettyimages-1215704164-1591179886209722498072.jpg" />}>
          <Meta title={room.username} description={room.meetName} />
          <button className="h-[40px] w-[100px] gap-2 bg-[#1a73e8] text-white rounded-[4px] hover:bg-[#185abc] transition-all mt-2" onClick={() => joinRoom(room.path)}>
            <span>Tham gia</span>
          </button>
        </Card>
      </div>
    );
  });
  return (
    <>
      <h1 className="text-center mb-5 text-[36px] text-blue-500">Danh sách phòng họp</h1>
      <div className="flex flex-wrap justify-center gap-10">{listRoomD}</div>;
    </>
  );
};
export default ListRoom;
