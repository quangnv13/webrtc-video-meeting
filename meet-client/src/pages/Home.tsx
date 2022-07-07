import React, { FunctionComponent } from 'react';
import Header from '../components/header/Header';
import HomeMain from '../components/home/main/HomeMain';
export interface IHomePageProps {}
const Home: FunctionComponent<IHomePageProps> = (props) => {
  return (
    <div>
      <Header />
      <HomeMain />
    </div>
  );
};
export default Home;
