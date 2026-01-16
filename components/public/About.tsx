'use client';

import { motion } from 'framer-motion';

interface Profile {
  name?: string;
  bio?: string;
}

export function About({ profile }: { profile?: Profile | null }) {
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
    <section id="about" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <motion.h2
          variants={item}
          className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4 pb-2 relative"
        >
          About Me
          <motion.div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </motion.h2>
        <motion.div
          variants={item}
          className="prose prose-lg dark:prose-invert max-w-none text-center mt-8"
        >
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed bg-white/50 dark:bg-gray-700/30 p-6 rounded-xl backdrop-blur-sm shadow-sm">
            {profile?.bio || 'Passionate full-stack developer with expertise in modern web technologies, data science, and user experience design. I build scalable applications and turn complex problems into elegant solutions.'}
          </p>
        </motion.div>
        
        {/* Additional animated elements */}
        <motion.div 
          className="flex justify-center space-x-4 mt-10"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {[1, 2, 3].map((index) => (
            <motion.div
              key={index}
              variants={item}
              className="w-3 h-3 rounded-full bg-primary-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
