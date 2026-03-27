import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Star, Cake, Send, MapPin, Clock, Calendar } from 'lucide-react'
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
      {/* 1. HERO SECTION - Mermaid Theme */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="hero-mermaid"
      >
        <div className="hero-content">
          <motion.span 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="energetic-badge-purple"
          >
            Join Us to Celebrate!
          </motion.span>
          <h1>Anvika <span className="highlight-gauri">(Gauri)</span></h1>
          <h2 className="mermaid-subtitle">
            <span className="purple-gradient-text">1st Birthday</span> Bash
          </h2>
          <p>Her first steps and first laughter have filled our lives with joy. 
             Come, make Gauri's big day even more special!</p>
          
          <div className="cta-group">
            <button className="btn-glow-purple">Send Blessing <Heart size={18}/></button>
          </div>
        </div>
        
        <div className="hero-visual-mermaid">
          <motion.div 
            animate={{ y: [-10, 10, -10] }} 
            transition={{ duration: 6, repeat: Infinity }} 
            className="mermaid-tail-abstract"
          ></motion.div>
          <div className="floating-card c1">30 March</div>
          <div className="floating-card c2">Jaipur</div>
        </div>
      </motion.section>

      {/* 2. EVENT DETAILS - Invitation Info */}
      <section className="event-details-section">
        <div className="section-header-mermaid">
          <h2>The Grand Celebration</h2>
        </div>
        <div className="details-grid-premium">
          <div className="detail-card-glass">
            <Calendar size={36} className="detail-icon" />
            <h3>30 March, 2026</h3>
            <p>Monday</p>
          </div>
          <div className="detail-card-glass">
            <Clock size={36} className="detail-icon" />
            <h3>07:00 PM</h3>
            <p>Celebration Starts</p>
          </div>
          <div className="detail-card-glass">
            <MapPin size={36} className="detail-icon" />
            <h3>Anokhi Veg Restaurant</h3>
            <p>Tonk Road, Jaipur</p>
          </div>
        </div>
      </section>

      {/* 3. WISHES SECTION */}
      <section className="interaction-zone-mermaid">
        <div className="wish-form-card-glass">
          <h3>Blessings for Gauri</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="input-group">
              <textarea placeholder="Write a blessing..." required rows="4"></textarea>
            </div>
            <button type="submit" className="btn-solid-teal">Send Love <Heart size={18} fill="white"/></button>
          </form>
        </div>

        <div className="wishes-wall-mermaid">
          <h2>Wishes Wall</h2>
          {loading ? (
            <p>Loading Blessings...</p>
          ) : (
            <div className="wishes-grid">
              <AnimatePresence>
                {wishes.map((wish) => (
                  <motion.div 
                    key={wish.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="wish-card-mermaid"
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