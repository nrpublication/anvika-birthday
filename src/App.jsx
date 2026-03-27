import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Star, Cake, Send, MapPin, Clock, Calendar } from 'lucide-react'
import { supabase } from './lib/supabaseClient'
import './App.css'

// Aapki photo yahan import ho rahi hai
import anvikaImg from './assets/anvika.jpg'

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
      alert("Blessing Sent to Gauri! ❤️");
      e.target.reset();
      fetchWishes();
    }
  }

  return (
    <div className="birthday-container">
      {/* HERO SECTION */}
      <section className="hero-mermaid">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <span className="energetic-badge">Our Princess is Turning One!</span>
          <h1 className="main-title">Anvika <br/><span className="gradient-text">(Gauri)</span></h1>
          
          <div className="event-info-box">
            <p><Calendar size={20} /> 30th March, 2026 (Monday)</p>
            <p><Clock size={20} /> 07:00 PM Onwards</p>
            <p><MapPin size={20} /> Anokhi Veg Restaurant, Jaipur</p>
          </div>

          <button className="btn-premium" onClick={() => document.getElementById('wish-form').scrollIntoView({behavior: 'smooth'})}>
            Send a Blessing ❤️
          </button>
        </motion.div>

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="photo-frame-container"
        >
          <div className="glowing-circle">
            {/* Ab yahan anvika.jpg dikhegi */}
            <img src={anvikaImg} alt="Anvika Gauri" />
          </div>
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="floating-badge b1">🎂 30 March</motion.div>
          <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="floating-badge b2">📍 Jaipur</motion.div>
        </motion.div>
      </section>

      {/* INTERACTION ZONE */}
      <section id="wish-form" className="interaction-zone">
        <div className="wish-form-card">
          <h3>Blessings for Gauri</h3>
          <p>Your love is her best gift! Write a message for her special day.</p>
          <form onSubmit={handleSubmit} className="form-layout">
            <input type="text" placeholder="Your Name" required className="input-field" />
            <textarea placeholder="Write your heartfelt blessing..." required rows="4" className="input-field"></textarea>
            <button type="submit" className="btn-solid">
              Send Love <Heart size={18} fill="white"/>
            </button>
          </form>
        </div>

        <div className="wishes-wall">
          <h2 className="section-title">Wishes Wall</h2>
          {loading ? (
            <div className="loading">Gathering blessings...</div>
          ) : (
            <div className="wishes-grid">
              <AnimatePresence>
                {wishes.map((wish) => (
                  <motion.div 
                    key={wish.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="wish-card"
                  >
                    <Star size={16} className="star-icon" fill="#8A4FFF" stroke="none" />
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

      <footer className="footer">
        <p>Created with ❤️ by Papa | anvikajoshi.com</p>
      </footer>
    </div>
  )
}

export default App