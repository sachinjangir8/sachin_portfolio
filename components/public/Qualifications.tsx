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
      <section id="qualifications" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="qualifications" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4"
        >
          Qualifications & Certificates
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-gray-600 dark:text-gray-400 mb-12"
        >
          My educational background, professional certifications, and achievements
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setSelectedType('all')}
            className={`px-6 py-2 rounded-full transition-colors ${
              selectedType === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            All ({qualifications.length})
          </button>
          <button
            onClick={() => setSelectedType('education')}
            className={`px-6 py-2 rounded-full transition-colors ${
              selectedType === 'education'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Education ({groupedByType.education.length})
          </button>
          <button
            onClick={() => setSelectedType('certification')}
            className={`px-6 py-2 rounded-full transition-colors ${
              selectedType === 'certification'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Certifications ({groupedByType.certification.length})
          </button>
          <button
            onClick={() => setSelectedType('award')}
            className={`px-6 py-2 rounded-full transition-colors ${
              selectedType === 'award'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Awards ({groupedByType.award.length})
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQualifications.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
              No qualifications found in this category.
            </div>
          ) : (
            filteredQualifications.map((qualification, index) => (
              <motion.div
                key={qualification._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${getTypeColor(qualification.type)}`}>
                    {getTypeIcon(qualification.type)}
                  </div>
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
                    <button
                      onClick={() => setSelectedImage({ url: qualification.certificateImage!, title: qualification.title })}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors"
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
                    </button>
                  )}
                  {qualification.credentialUrl && (
                    <a
                      href={qualification.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 border border-primary-600 dark:border-primary-400 rounded-md transition-colors"
                    >
                      <FiExternalLink className="mr-2 h-4 w-4" />
                      Verify
                    </a>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

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
