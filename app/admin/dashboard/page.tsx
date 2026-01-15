'use client';

import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { apiRequest } from '@/lib/api';
import { FiFolder, FiEye, FiEyeOff, FiTag } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface Stats {
  projects: {
    total: number;
    published: number;
    unpublished: number;
    byCategory: Array<{ _id: string; count: number }>;
  };
  categories: {
    total: number;
    list: any[];
  };
  recentProjects: any[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await apiRequest<Stats>('/api/admin/stats');
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!stats) {
    return (
      <AdminLayout>
        <div className="text-center text-gray-500">Failed to load statistics</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900 rounded-md p-3">
                <FiFolder className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Projects</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.projects.total}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 dark:bg-green-900 rounded-md p-3">
                <FiEye className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Published</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.projects.published}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 dark:bg-yellow-900 rounded-md p-3">
                <FiEyeOff className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Unpublished</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.projects.unpublished}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FiTag className="mr-2" />
              Categories
            </h2>
            <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {stats.categories.total}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total categories</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Projects</h2>
            <div className="space-y-3">
              {stats.recentProjects.length > 0 ? (
                stats.recentProjects.map((project) => (
                  <div
                    key={project._id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded"
                  >
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{project.title}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        project.isPublished
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}
                    >
                      {project.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No projects yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
