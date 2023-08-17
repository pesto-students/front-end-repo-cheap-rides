import './App.css';
import Login from './components/Login';
// import ForgotPassword from './components/ForgotPassword';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import FindRidePage from './components/FindRidePage';
import OfferRidePage from './components/OfferRidePage';
import ListOfRidesPage from './components/ListOfRidesPage';
import Footer from './components/Footer';
import NotFoundPage from './components/NotFoundPage';
import RidesOfferedByYou from './components/RidesOfferedByYou';
import UpdateRidePage from './components/UpdateRidePage';
import BookedRidesPage from './components/BookedRidesPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
    <div>
      <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/find-rides" element={<FindRidePage />} />
            <Route path="/listofrides" element={<ListOfRidesPage />} />
            <Route path="/offers" element={<OfferRidePage />} />
            <Route path="/ridesOfferedByYou" element={<RidesOfferedByYou />} />
            <Route path="/booked-ride" element={<BookedRidesPage />} />
            <Route path="/update-ride/:rideId" element={<UpdateRidePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;