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
      <section id="tech-stack" className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" />
        </div>
      </section>
    );
  }

  if (skills.length === 0) {
    return null;
  }

  return (
    <section id="tech-stack" className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4"
        >
          Tech Stack
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          A snapshot of the technologies I work with across the stack.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(grouped)
            .filter(([, items]) => items.length > 0)
            .map(([category, items]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900 mr-3">
                    <FiTool className="h-5 w-5 text-primary-600 dark:text-primary-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {CATEGORY_LABELS[category as Category]}
                  </h3>
                </div>
                <div className="space-y-4">
                  {items.map((skill) => (
                    <div key={skill._id} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                          {skill.icon && <span>{skill.icon}</span>}
                          <span className="font-medium">{skill.name}</span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          {skill.level}
                        </span>
                      </div>
                      {skill.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                          {skill.description}
                        </p>
                      )}
                      <div className="mt-1 h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className={`h-full ${LEVEL_COLORS[skill.level]}`} />
                      </div>
                      {skill.yearsExperience != null && (
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                          {skill.yearsExperience} year{skill.yearsExperience === 1 ? '' : 's'} experience
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}

