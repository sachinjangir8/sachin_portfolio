'use client';

import { motion } from 'framer-motion';

interface Profile {
  name?: string;
  bio?: string;
}

export function About({ profile }: { profile?: Profile | null }) {
  return (
    <section id="about" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8"
        >
          About Me
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg dark:prose-invert max-w-none text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            {profile?.bio || 'Passionate full-stack developer with expertise in modern web technologies, data science, and user experience design. I build scalable applications and turn complex problems into elegant solutions.'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
