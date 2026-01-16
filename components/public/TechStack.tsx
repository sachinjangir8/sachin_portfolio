'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiTool } from 'react-icons/fi';
import { apiRequest } from '@/lib/api';

type Category = 'frontend' | 'backend' | 'data-science' | 'devops' | 'mobile' | 'ui-ux' | 'other';
type Level = 'beginner' | 'intermediate' | 'advanced' | 'expert';

interface Skill {
  _id: string;
  name: string;
  category: Category;
  level: Level;
  yearsExperience?: number;
  description?: string;
  icon?: string;
  isFeatured?: boolean;
  order?: number;
}

const CATEGORY_LABELS: Record<Category, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  'data-science': 'Data Science',
  devops: 'DevOps',
  mobile: 'Mobile',
  'ui-ux': 'UI/UX',
  other: 'Other',
};

const LEVEL_COLORS: Record<Level, string> = {
  beginner: 'bg-gray-200 dark:bg-gray-700 w-1/4',
  intermediate: 'bg-blue-300 dark:bg-blue-700 w-2/4',
  advanced: 'bg-blue-500 dark:bg-blue-600 w-3/4',
  expert: 'bg-blue-600 dark:bg-blue-500 w-full',
};

const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const skillItem = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } }
  };

  export function TechStack() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data = await apiRequest<{ skills: Skill[] }>('/api/skills');
      const featured = data.skills.filter((s) => s.isFeatured !== false);
      setSkills(featured);
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const grouped = skills.reduce<Record<Category, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {
    frontend: [],
    backend: [],
    'data-science': [],
    devops: [],
    mobile: [],
    'ui-ux': [],
    other: [],
  });

  if (loading) {
    return (
      <section id="tech-stack" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto flex justify-center items-center h-64">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full"
          />
        </div>
      </section>
    );
  }

  if (skills.length === 0) {
    return null;
  }

  return (
    <section id="tech-stack" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <motion.h2
          variants={item}
          className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4 pb-2 relative"
        >
          Tech Stack
          <motion.div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </motion.h2>
        <motion.p
          variants={item}
          className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          A snapshot of the technologies I work with across the stack.
        </motion.p>

        <motion.div 
          variants={container}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {Object.entries(grouped)
            .filter(([, items]) => items.length > 0)
            .map(([category, items]) => (
              <motion.div
                key={category}
                variants={item}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-center mb-4">
                  <motion.div 
                    className="p-2 rounded-lg bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 mr-3"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiTool className="h-5 w-5 text-primary-600 dark:text-primary-300" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {CATEGORY_LABELS[category as Category]}
                  </h3>
                </div>
                <motion.div variants={container}>
                  {items.map((skill, index) => (
                    <motion.div 
                      key={skill._id} 
                      variants={skillItem}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-1 mb-3 last:mb-0 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                          {skill.icon && <span>{skill.icon}</span>}
                          <span className="font-medium">{skill.name}</span>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
                          {skill.level}
                        </span>
                      </div>
                      {skill.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                          {skill.description}
                        </p>
                      )}
                      <div className="mt-2 h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full">
                          <motion.div 
                            className={`${LEVEL_COLORS[skill.level]}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: LEVEL_COLORS[skill.level].includes('w-1/4') ? '25%' : LEVEL_COLORS[skill.level].includes('w-2/4') ? '50%' : LEVEL_COLORS[skill.level].includes('w-3/4') ? '75%' : '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                          />
                        </div>
                      </div>
                      {skill.yearsExperience != null && (
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                          {skill.yearsExperience} year{skill.yearsExperience === 1 ? '' : 's'} experience
                        </p>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

