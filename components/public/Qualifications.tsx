'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiExternalLink, FiCalendar, FiImage, FiFile } from 'react-icons/fi';
import { apiRequest } from '@/lib/api';
import { ImageModal } from '@/components/shared/ImageModal';

interface Qualification {
  _id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  certificateImage?: string;
  description?: string;
  type: 'education' | 'certification' | 'award';
  isPublished: boolean;
}

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

  export function Qualifications() {
  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    fetchQualifications();
  }, []);

  const fetchQualifications = async () => {
    try {
      const data = await apiRequest<{ qualifications: Qualification[] }>('/api/qualifications?published=true');
      setQualifications(data.qualifications);
    } catch (error) {
      console.error('Failed to fetch qualifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredQualifications = selectedType === 'all'
    ? qualifications
    : qualifications.filter(q => q.type === selectedType);

  const groupedByType = {
    education: qualifications.filter(q => q.type === 'education'),
    certification: qualifications.filter(q => q.type === 'certification'),
    award: qualifications.filter(q => q.type === 'award'),
  };

  const getTypeIcon = (type: string) => {
    return <FiAward className="h-6 w-6" />;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'education':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'certification':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'award':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <section id="qualifications" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="qualifications" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
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
          Qualifications & Certificates
          <motion.div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </motion.h2>
        <motion.p
          variants={item}
          className="text-center text-gray-600 dark:text-gray-400 mb-12"
        >
          My educational background, professional certifications, and achievements
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <motion.button
            onClick={() => setSelectedType('all')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full transition-colors ${
              selectedType === 'all'
                ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            All ({qualifications.length})
          </motion.button>
          <motion.button
            onClick={() => setSelectedType('education')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full transition-colors ${
              selectedType === 'education'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Education ({groupedByType.education.length})
          </motion.button>
          <motion.button
            onClick={() => setSelectedType('certification')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full transition-colors ${
              selectedType === 'certification'
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Certifications ({groupedByType.certification.length})
          </motion.button>
          <motion.button
            onClick={() => setSelectedType('award')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full transition-colors ${
              selectedType === 'award'
                ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Awards ({groupedByType.award.length})
          </motion.button>
        </motion.div>

        <motion.div 
          variants={container}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredQualifications.length === 0 ? (
            <motion.div 
              variants={item}
              className="col-span-full text-center text-gray-500 dark:text-gray-400 py-12"
            >
              No qualifications found in this category.
            </motion.div>
          ) : (
            filteredQualifications.map((qualification, index) => (
              <motion.div
                key={qualification._id}
                variants={item}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-start justify-between mb-4">
                  <motion.div 
                    className={`p-3 rounded-lg ${getTypeColor(qualification.type)}`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {getTypeIcon(qualification.type)}
                  </motion.div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getTypeColor(qualification.type)}`}>
                    {qualification.type.charAt(0).toUpperCase() + qualification.type.slice(1)}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {qualification.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {qualification.issuer}
                </p>

                {qualification.description && (
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-2">
                    {qualification.description}
                  </p>
                )}

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <FiCalendar className="mr-2 h-4 w-4" />
                    <span>Issued: {formatDate(qualification.issueDate)}</span>
                  </div>
                  {qualification.expiryDate && (
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <FiCalendar className="mr-2 h-4 w-4" />
                      <span>Expires: {formatDate(qualification.expiryDate)}</span>
                    </div>
                  )}
                  {qualification.credentialId && (
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      ID: {qualification.credentialId}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {qualification.certificateImage && (
                    <motion.button
                      onClick={() => setSelectedImage({ url: qualification.certificateImage!, title: qualification.title })}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-md transition-colors"
                    >
                      {qualification.certificateImage.toLowerCase().includes('.pdf') ? (
                        <>
                          <FiFile className="mr-2 h-4 w-4" />
                          View PDF
                        </>
                      ) : (
                        <>
                          <FiImage className="mr-2 h-4 w-4" />
                          View Certificate
                        </>
                      )}
                    </motion.button>
                  )}
                  {qualification.credentialUrl && (
                    <motion.a
                      href={qualification.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 border border-primary-600 dark:border-primary-400 rounded-md transition-colors"
                    >
                      <FiExternalLink className="mr-2 h-4 w-4" />
                      Verify
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </motion.div>

      {/* Image Modal */}
      <ImageModal
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        imageUrl={selectedImage?.url || ''}
        title={selectedImage?.title}
      />
    </section>
  );
}
