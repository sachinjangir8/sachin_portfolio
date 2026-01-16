'use client';

import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';

interface Profile {
  name?: string;
  bio?: string;
  contactEmail?: string;
}

export function Hero({ profile }: { profile?: Profile | null }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary-500/10 dark:bg-primary-500/5"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <motion.h1
          variants={item}
          className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent"
        >
          {profile?.name || 'Full Stack Developer'}
        </motion.h1>
        <motion.p
          variants={item}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto"
        >
          {profile?.bio || 'Building modern web applications and data-driven solutions'}
        </motion.p>
        {profile?.contactEmail && (
          <motion.a
            variants={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={`mailto:${profile.contactEmail}`}
            className="inline-block px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get In Touch
          </motion.a>
        )}
        <motion.div
          variants={item}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-12"
        >
          <a href="#projects" className="inline-flex flex-col items-center group">
            <span className="text-gray-500 dark:text-gray-400 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Scroll down</span>
            <FiArrowDown className="h-8 w-8 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
