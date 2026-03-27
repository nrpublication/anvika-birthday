import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Star, Cake, Send, Gift } from 'lucide-react'
import { supabase } from './lib/supabaseClient'
import './App.css'

function App() {
  const [wishes, setWishes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWishes()
  }, [])

  const fetchWishes = async () => {
    const { data, error } = await supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setWishes(data);
    setLoading(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const message = e.target[1].value;
    const { error } = await supabase.from('wishes').insert([{ name, message }]);
    if (!error) {
      e.target.reset();
      fetchWishes(); // Refresh the list
    }
  }

  return (
    <div className="birthday-container">
      {/* 1. HERO SECTION (Princess Entrance) */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="hero-premium"
      >
        <div className="bg-grid-blurry"></div>
        <div className="hero-content">
          <motion.span 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="energetic-badge"
          >
            Turning One & Full of Fun!
          </motion.span>
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Anvika <span className="gradient-text-gold">Joshi</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Join us in celebrating our little princess. Her laughter, her first steps, 
            and the countless ways she’s filled our lives with joy.
          </motion.p>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="cta-group"
          >
            <button className="btn-glow-pink">Send Blessing <Heart size={18}/></button>
            <button className="btn-outline-gold">View Gallery <Star size={18}/></button>
          </div>
        </div>
        <div className="hero-visual-floating">
          <motion.div animate={{ y: [-15, 15, -15] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="blob pink-blob"></motion.div>
          <motion.div animate={{ y: [10, -10, 10] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="blob gold-blob"></motion.div>
          <div className="floating-card c1">March 26th</div>
          <div className="floating-card c2">Jaipur</div>
        </div>
      </motion.section>

      {/* 2. WISH FORM & WALL (Glassmorphism & Grids) */}
      <section className="interaction-zone">
        <div className="wish-form-card">
          <div className="card-glass-effect">
            <h3>Send Anvika a Blessing</h3>
            <p>Your love is her best gift! The messages will be shared on her special day.</p>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input type="text" placeholder="Your Name (e.g., Papa, Chachi)" required />
              </div>
              <div className="input-group">
                <textarea placeholder="Write your heartfelt message..." required rows="4"></textarea>
              </div>
              <button type="submit" className="btn-solid-pink">
                Send <Send size={18}/>
              </button>
            </form>
          </div>
        </div>

        <div className="wishes-wall">
          <div className="section-header">
            <h2>Wishes Wall</h2>
            <p>Hear what our loved ones are saying about our princess.</p>
          </div>
          {loading ? (
            <div className="loading-wishes">Loading Blessings...</div>
          ) : (
            <motion.div 
              layout 
              className="wishes-grid"
            >
              <AnimatePresence>
                {wishes.map((wish) => (
                  <motion.div 
                    key={wish.id} 
                    layout 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ var(--transition) }}
                    className="wish-card-premium"
                  >
                    <div className="wish-icon"><Gift size={24}/></div>
                    <p>"{wish.message}"</p>
                    <div className="wish-footer">
                      <span className="wisher-name">- {wish.name}</span>
                      <span className="wish-date">{new Date(wish.created_at).toLocaleDateString()}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

export default App