import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Exchange from '../pages/exchange';
import Markets from '../pages/markets';
import Profile from './profile';
import Wallet from './wallet';
import Settings from './settings';
import Login from './login';
import Reset from './reset';
import OtpVerify from './otp-verify';
import OtpNumber from './otp-number';
import Lock from './lock';
import TermsAndConditions from './terms-and-conditions';
import NewsDetails from './news-details';
import Signup from './signup';
import Notfound from './notfound';
import AuthWrapper from "../utils/AuthWrapper";
import '../main.css'

export default function Index() {
  const loginPath = '/login';
  return (
      <Router>
        <Layout>
          <Routes>
            {/* Wrap each route with AuthWrapper to add authentication checks */}
            <Route path="/" element={<Exchange />} />
            <Route path="/markets" element={<Markets />} />
            {/* Wrap Profile route with AuthWrapper and pass loginPath */}
            <Route path="/profile" element={<AuthWrapper loginPath={loginPath}><Profile /></AuthWrapper>} />
            {/* Wrap Wallet route with AuthWrapper and pass loginPath */}
            <Route path="/wallet" element={<AuthWrapper loginPath={loginPath}><Wallet /></AuthWrapper>} />
            {/* Wrap Settings route with AuthWrapper and pass loginPath */}
            <Route path="/settings" element={<AuthWrapper loginPath={loginPath}><Settings /></AuthWrapper>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/otp-verify" element={<OtpVerify />} />
            <Route path="/otp-number" element={<OtpNumber />} />
            <Route path="/lock" element={<Lock />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/news-details" element={<NewsDetails />} />
            <Route path="/notfound" element={<Notfound />} />
          </Routes>
        </Layout>
      </Router>
  );
}
