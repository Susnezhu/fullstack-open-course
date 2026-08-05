import { Route, Routes } from 'react-router-native';

import { View } from 'react-native';

import AppBar from './components/AppBar/AppBar';
import RepositoryList from './components/RepositoryList/RepositoryList';
import SingleRepository from './components/RepositoryList/SingleRepository';
import SignIn from './components/SingIn/SignIn';
import CreateReview from './components/CreateReview/CreateReview';
import Register from './components/Register/Register'
import MyReviews from './components/UserReviews/MyReviews'

const Main = () => {
  return (
    <View>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/repository/:id" element={<SingleRepository />} />
        <Route path="/createReview" element={<CreateReview />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/myReviews" element={<MyReviews />}/>
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </View>
  );
};

export default Main;