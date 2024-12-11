import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Gossip from "./pages/Gossip";
import Stats from "./pages/Stats";
import "./index.css";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import TableScreen from "./pages/TableScreen";
import PredictionScreen from "./pages/PredictionScreen";
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import LayoutPrediction from "./LayoutPrediction";
import UpdatePayment from "./pages/UpdatePayment";
import News from "./pages/News";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import MyPredictionsScreen from "./pages/MyPredictions";
import GamesRules from "./pages/GameRules";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Layout><LoginPage /></Layout>} />
        <Route path="/signup" element={<Layout><SignupPage /></Layout>} />
        <Route path="/gameRules" element={<Layout><GamesRules /></Layout>} />


        

        {/* Protected routes */}
        <Route path="/update-payment" element={
          <ProtectedRoute>
            <Layout><UpdatePayment /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/news" element={
          <ProtectedRoute>
            <Layout><News /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/games" element={
          <ProtectedRoute>
            <Layout><Games /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/stats" element={
          <ProtectedRoute>
            <Layout><Stats /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/gossip" element={
          <ProtectedRoute>
            <Layout><Gossip /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/table" element={
          <ProtectedRoute>
            <Layout><TableScreen /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/prediction" element={
          <ProtectedRoute>
            <LayoutPrediction><PredictionScreen /></LayoutPrediction>
          </ProtectedRoute>
        } />
        <Route path="/mypredictions" element={
          <ProtectedRoute>
            <LayoutPrediction><MyPredictionsScreen /></LayoutPrediction>
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  );
};

export default App;
