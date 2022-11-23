import './App.scss';
import { Page } from './constants';
import { Header, Footer, RequireAuth } from './components';
import { AuthProvider } from './contexts/AuthContext';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <Header />

      <Routes>
        <Route path="/" element={<Page.Home />} />
        <Route
          path="admin"
          element={
            <RequireAuth>
              <Page.Admin />
            </RequireAuth>
          }
        />
        <Route path="login" element={<Page.Login />} />
        <Route path="register" element={<Page.Register />} />
        <Route path="form" element={<Page.Book />} />
        <Route path="profile" element={<Page.Profile />} />
        <Route path="*" element={<Page.NotFound />} />

        {/* <Route path="book/:id" element={<Page.Post />} /> */}
      </Routes>

      <Footer />
    </AuthProvider>
  );
}

export default App;
