'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiFileText } from 'react-icons/fi';

interface Profile {
  githubLink?: string;
  linkedinLink?: string;
  twitterLink?: string;
  resumeLink?: string;
}

export function Navbar({ profile }: { profile?: Profile | null }) {
  const navItems = [
    { href: '#projects', label: 'Projects' },
    { href: '#tech-stack', label: 'Tech Stack' },
    { href: '#qualifications', label: 'Qualifications' },
    { href: '#about', label: 'About' },
  ];

  const socialLinks = [
    { href: profile?.githubLink, icon: <FiGithub className="h-5 w-5" />, label: 'GitHub' },
    { href: profile?.linkedinLink, icon: <FiLinkedin className="h-5 w-5" />, label: 'LinkedIn' },
    { href: profile?.twitterLink, icon: <FiTwitter className="h-5 w-5" />, label: 'Twitter' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            Portfolio
          </motion.div>
          <div className="flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 relative"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {item.label}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
            {profile?.resumeLink && (
              <motion.a
                href={profile.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 relative"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <FiFileText className="mr-1 h-4 w-4" />
                Resume
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            )}
            <div className="flex items-center space-x-4">
              {socialLinks
                .filter(link => link.href)
                .map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  >
                    {link.icon}
                  </motion.a>
                ))
              }
            </div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 }}
            >
              <ThemeToggle />
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
}
