'use client';

import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';

interface Profile {
  name?: string;
  bio?: string;
  contactEmail?: string;
}

export function Hero({ profile }: { profile?: Profile | null }) {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
        >
          {profile?.name || 'Full Stack Developer'}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8"
        >
          {profile?.bio || 'Building modern web applications and data-driven solutions'}
        </motion.p>
        {profile?.contactEmail && (
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            href={`mailto:${profile.contactEmail}`}
            className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Get In Touch
          </motion.a>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <a href="#projects" className="inline-block animate-bounce">
            <FiArrowDown className="h-8 w-8 text-gray-400" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
