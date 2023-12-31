import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './js/layout/Header';
import Footer from './js/layout/Footer';
import Main from './js/page/Main';
import AdminPage from './js/page/AdminPage';
import PerformanceDetail from './js/component/performance/PerformanceDetail';
import PerformanceList from './js/component/performance/PerformanceList';
import NewPerform from './js/component/performance/NewPerform';
import TimeList from './js/component/performTime/TimeList';
import Board from './js/component/Board/Board';
import CenterInfo from './js/page/CenterInfo';
import NewPost from './js/component/Board/NewPost';
import NewEventPost from './js/component/Board/NewEventPost';
import NewCenterInfo from './js/component/Board/NewCenterInfo';
import EditPost from './js/component/Board/EditPost';
import EditEventPost from './js/component/Board/EditEventPost';
import PostDetail from './js/component/Board/PostDetail';
import Ticket from './js/component/Ticket/Ticket';
import RentalApps from './js/component/rental/rental';
import RentalList from './js/component/rental/RentalList';
import RentalComplete from './js/component/rental/RentalComplete';
import Newplant from './js/component/plant/NewPlant';
import PerformCalendar from './js/component/calendar/PerformCalendar';
import ErrorPage from './js/page/ErrorPage';
import LoginPage from './js/component/Login/LoginPage';
import SignUp from './js/component/Login/SignUp';
import AddCorp from './js/component/UserPage/AddCorp'
import Redirect from './Redirect';
import Mypage from './js/component/UserPage/Mypage';
import UserList from './js/component/UserPage/UserList'
import PlantList from './js/component/plant/PlantList';
import PlantDetail from './js/component/plant/plantDetail';
import RentalListad from './js/component/rental/RentalListad';
import TicketCheck from './js/component/Ticket/TicketCheck';
import SearchPerformList from './js/component/performance/SearchPerformList';
import AllTimeList from './js/component/performTime/AllTimeList';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />{/* 여기에 있어야 헤더에서 다른 페이지로 이동기능 사용이 가능함 */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Board/:BrdType" element={<Board/>}/>
          <Route path="/adminPage/:props" element={<Redirect component={<AdminPage/>} auth="ADMIN"/>}/>
          <Route path="/performList" element={<PerformanceList/>}/>
          <Route path="/performanceDetail/:pfCode" element={<PerformanceDetail />} />
          <Route path="/performList/newPerform" element={<Redirect component={<NewPerform/>}  auth="ADMIN"/>}/>
          <Route path="/timeList/:pfCode" element={<Redirect component={<TimeList/>}  auth="ADMIN"/>} />
          <Route path="/performCalendar" element={<PerformCalendar />} />
           <Route path='/센터소개' element={<CenterInfo />} />
          <Route path='/NewCenterInfo/:BoardType' element={<Redirect component={<NewCenterInfo/>} auth="ADMIN"/>}/>
          <Route path='/NewPost/:BoardType' element={<Redirect component={<NewPost/>} auth="USER"/>}/>
          <Route path='/NewEventPost/:BoardType' element={<Redirect component={<NewEventPost/>} auth="ADMIN"/>}/>
          <Route path='/EditPost/:BoardType/:postNo' element={<Redirect component={<EditPost/>} auth="USER"/> }/>
          <Route path="/EditEventPost/:BoardType/:postNo" element={<Redirect component={<EditEventPost/>} auth="ADMIN"/>}/>
          <Route path='/postDetail/:BoardType/:postNo' element={<PostDetail/>}/>
          <Route path='/ticket' element={<Redirect component={<Ticket/>} auth="USER"/>}/>
          <Route path='/RentApp' element={<Redirect component={<RentalApps/>}auth="USER"/>}/>
          <Route path='/RentList' element={<RentalList/>}/>
          <Route path='/Rentcom' element={<RentalComplete/>}/>
          <Route path='/Newplant' element={<Redirect component={<Newplant/>} auth="ADMIN"/>}/>
          <Route path='/PlantList' element={<PlantList/>}/>
          <Route path='/PlantDetail/:plantNo' element={<PlantDetail/>}/>
          <Route path='/RentalListad' element={<RentalListad/>}/>
          <Route path='/errorPage' element={<ErrorPage/>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mypage" element={<Redirect component={<Mypage />} auth="USER"/>} />
          <Route path="/addcorp" element={<Redirect component={<AddCorp />} auth="USER"/>}/>
          <Route path="/admin" element={<Redirect component={<AdminPage />} auth="ADMIN"/>} />
          <Route path="/ticketcheck/:check" element={<Redirect component={<TicketCheck />} auth="ADMIN"/>} />
          <Route path="/SearchPerformList/:keyword" element={<SearchPerformList />} />
          <Route path="/UserList" element={<Redirect component={<UserList />} auth="ADMIN"/>} />
          <Route path="/AllTimeList" element={<Redirect component={<AllTimeList />} auth="ADMIN"/>} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}
export default App;
