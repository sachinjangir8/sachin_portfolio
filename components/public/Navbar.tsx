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
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            Portfolio
          </motion.div>
          <div className="flex items-center space-x-4">
            <a href="#projects" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
              Projects
            </a>
            <a href="#tech-stack" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
              Tech Stack
            </a>
            <a href="#qualifications" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
              Qualifications
            </a>
            <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
              About
            </a>
            {profile?.resumeLink && (
              <a
                href={profile.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <FiFileText className="mr-1 h-4 w-4" />
                Resume
              </a>
            )}
            <div className="flex items-center space-x-2">
              {profile?.githubLink && (
                <a
                  href={profile.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  <FiGithub className="h-5 w-5" />
                </a>
              )}
              {profile?.linkedinLink && (
                <a
                  href={profile.linkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  <FiLinkedin className="h-5 w-5" />
                </a>
              )}
              {profile?.twitterLink && (
                <a
                  href={profile.twitterLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  <FiTwitter className="h-5 w-5" />
                </a>
              )}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
