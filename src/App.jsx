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
      fetchWishes();
    }
  }

  return (
    <div className="birthday-container">
      {/* 1. HERO SECTION */}
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
            className="energetic-badge"
          >
            Turning One & Full of Fun!
          </motion.span>
          <h1>Anvika <span className="highlight">Joshi</span></h1>
          <p>Join us in celebrating our little princess. Her laughter and first steps have filled our lives with joy.</p>
          <div className="cta-group">
            <button className="btn-glow-pink">Send Blessing <Heart size={18}/></button>
          </div>
        </div>
        
        <div className="hero-visual-floating">
          <motion.div 
            animate={{ y: [-15, 15, -15] }} 
            transition={{ duration: 6, repeat: Infinity }} 
            className="blob pink-blob"
          ></motion.div>
          <div className="floating-card c1">March 26th</div>
          <div className="floating-card c2">Jaipur</div>
        </div>
      </motion.section>

      {/* 2. INTERACTION ZONE */}
      <section className="interaction-zone">
        <div className="wish-form-card">
          <div className="card-glass-effect">
            <h3>Send a Blessing</h3>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="input-group">
                <textarea placeholder="Your Message..." required rows="4"></textarea>
              </div>
              <button type="submit" className="btn-solid-pink">Send <Send size={18}/></button>
            </form>
          </div>
        </div>

        <div className="wishes-wall">
          <h2>Wishes Wall</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="wishes-grid">
              <AnimatePresence>
                {wishes.map((wish) => (
                  <motion.div 
                    key={wish.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="wish-card-premium"
                  >
                    <p>"{wish.message}"</p>
                    <div className="wish-footer">
                      <strong>- {wish.name}</strong>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default App