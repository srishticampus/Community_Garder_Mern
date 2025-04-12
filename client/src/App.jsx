import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landing/LandingPage'
import AboutPage from './pages/landing/AboutPage'
import ContactPage from './pages/landing/ContactPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'
import GardenerHome from './components/GardenerHomePage'
import GardenerViewGarden from './components/GardenerViewGarden'
import GardenerViewTask from './components/GardenerViewTask'
import Gardnerchat from "./pages/chat/Gardnerchat"
import GardenerProfile from './components/GardenerProfile'
import EventView from './pages/Event/EventView'
import ViewResource from './pages/Resources/ViewResource'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/gardener/home" element={<GardenerHome />} />
      <Route path="/gardener/viewgarden" element={<GardenerViewGarden />} />
      <Route path="/gardener/viewtask" element={<GardenerViewTask />} />
      <Route path="/gardener/chat" element={<Gardnerchat/>} />
      <Route path="/gardener/profile" element={<GardenerProfile/>} />
      <Route path="/gardener/viewevent" element={<EventView/>} />
      <Route path="/gardener/viewresource" element={<ViewResource/>} />
    </Routes>
  )
}
export default App