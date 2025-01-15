import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import SearchPage from './pages/SearchPage'
import MarketplacePage from './pages/MarketplacePage'
import ProfilePage from './pages/ProfilePage'
import PlayerPage from './pages/PlayerPage'
import RadioPage from './pages/RadioPage'
import ProductPage from './pages/ProductPage'
import UploadPage from './pages/UploadPage'
import MessagesPage from './pages/MessagesPage'
import ProfileDashboardPage from './pages/ProfileDashboardPage'
import AddProductPage from './pages/AddProductPage'
import CreatorProfilePage from './pages/CreatorProfilePage'
import PlaylistsPage from './pages/PlaylistsPage'
import PlaylistPage from './pages/PlaylistPage'
import { Layout } from './components/Layout'

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected Routes */}
      <Route element={<Layout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/player/:id" element={<PlayerPage />} />
        <Route path="/radio" element={<RadioPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/profile/dashboard" element={<ProfileDashboardPage />} />
        <Route path="/profile/dashboard/add-product" element={<AddProductPage />} />
        <Route path="/creator/:id" element={<CreatorProfilePage />} />
        <Route path="/playlists" element={<PlaylistsPage />} />
        <Route path="/playlist/:id" element={<PlaylistPage />} />
      </Route>
    </Routes>
  )
}