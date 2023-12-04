import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './js/layout/Header';
import Footer from './js/layout/Footer';
import Main from './js/page/Main';
import PageTest from './js/page/PageTest';
import PerformanceList from './js/component/performance/PerformanceList';
import NewPerform from './js/component/performance/NewPerform';
import CenterInfo from './js/page/CenterInfo';
import CenterNews from './js/page/CenterNews';
import EventPage from './js/page/EventPage';
import NewPost from './js/component/NewPost';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />{/* 여기에 있어야 헤더에서 다른 페이지로 이동기능 사용이 가능함 */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/pageTest" element={<PageTest />} />
          <Route path="/performList" element={<PerformanceList />} />
          <Route path="/performList/newPerform" element={<NewPerform />} />
          <Route path='/센터소개' element={<CenterInfo />} />
          <Route path='/센터소식' element={<CenterNews/>}/>
          <Route path='/Event' element={<EventPage/>}/>
          <Route path='/NewPost/:BoardType' element={<NewPost/>}/>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
