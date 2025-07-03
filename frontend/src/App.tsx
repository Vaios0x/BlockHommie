import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Marketplace from './pages/Marketplace'
import CreateProperty from './pages/CreateProperty'
import UserProfile from './pages/UserProfile'
import PropertyDetail from './pages/PropertyDetail'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/create-property" element={<CreateProperty />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/marketplace/:idPropiedad" element={<PropertyDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
