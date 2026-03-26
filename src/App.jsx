import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Star, Cake } from 'lucide-react'
import { supabase } from './lib/supabaseClient'
import './App.css'

function App() {
  const [wishes, setWishes] = useState([])

  return (
    <div className="birthday-container">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hero"
      >
        <div className="badge">1st Birthday Celebration</div>
        <h1>Anvika <span className="highlight">Joshi</span></h1>
        <p>Turning One & Full of Fun! Join us in celebrating our little princess.</p>
        <div className="stats">
          <span><Cake size={20}/> 26th March</span>
          <span><Star size={20}/> Jaipur</span>
        </div>
      </motion.section>

      {/* Wish Form Section */}
      <section className="wish-form-box">
        <h3>Send Your Blessings</h3>
        <form className="glass-form">
          <input type="text" placeholder="Your Name" required />
          <textarea placeholder="Write a blessing for Anvika..." required></textarea>
          <button className="btn-glow">Send Love <Heart size={18} fill="white"/></button>
        </form>
      </section>
    </div>
  )
}

export default App