'use client';

import { useState, useRef, useCallback } from 'react';
import { FiUpload, FiX, FiImage, FiFile, FiLink, FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  accept?: string;
  maxSize?: number; // in MB
}

export function ImageUpload({ 
  value, 
  onChange, 
  label = 'Upload Image or PDF',
  accept = 'image/*,.pdf',
  maxSize = 10 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url' | 'paste'>('file');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pasteAreaRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = async (file: File) => {
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File size must be less than ${maxSize}MB`);
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', file.type.includes('pdf') ? 'pdf' : 'image');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      onChange(data.url);
      setPreview(data.url);
      toast.success('File uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handlePaste = useCallback(async (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        if (file) {
          e.preventDefault();
          await handleFileUpload(file);
        }
      }
    }
  }, []);

  const handleUrlSubmit = (url: string) => {
    if (url.trim()) {
      onChange(url.trim());
      setPreview(url.trim());
      toast.success('URL saved!');
    }
  };

  const handleRemove = () => {
    onChange('');
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const copyImageUrl = () => {
    if (value) {
      navigator.clipboard.writeText(value);
      toast.success('URL copied to clipboard!');
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>

      {/* Method Selector */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={() => setUploadMethod('file')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            uploadMethod === 'file'
              ? 'border-primary-600 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <FiUpload className="inline mr-2 h-4 w-4" />
          Upload
        </button>
        <button
          type="button"
          onClick={() => setUploadMethod('paste')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            uploadMethod === 'paste'
              ? 'border-primary-600 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <FiCopy className="inline mr-2 h-4 w-4" />
          Paste
        </button>
        <button
          type="button"
          onClick={() => setUploadMethod('url')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            uploadMethod === 'url'
              ? 'border-primary-600 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <FiLink className="inline mr-2 h-4 w-4" />
          URL
        </button>
      </div>

      {/* File Upload Method */}
      {uploadMethod === 'file' && (
        <div
          ref={pasteAreaRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onPaste={handlePaste}
          tabIndex={0}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary-500 dark:hover:border-primary-400 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500"
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            className="hidden"
          />
          <FiUpload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            PNG, JPG, GIF, PDF up to {maxSize}MB
          </p>
          {uploading && (
            <div className="mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">Uploading...</p>
            </div>
          )}
        </div>
      )}

      {/* Paste Method */}
      {uploadMethod === 'paste' && (
        <div
          ref={pasteAreaRef}
          onPaste={handlePaste}
          tabIndex={0}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary-500 dark:hover:border-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <FiCopy className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Copy an image and paste here (Ctrl+V / Cmd+V)
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Works with images copied from browser, screenshots, etc.
          </p>
          {uploading && (
            <div className="mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">Uploading...</p>
            </div>
          )}
        </div>
      )}

      {/* URL Method */}
      {uploadMethod === 'url' && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="url"
              key={`url-input-${value}`}
              placeholder="https://example.com/image.jpg"
              defaultValue={value}
              onBlur={(e) => {
                if (e.target.value.trim()) {
                  handleUrlSubmit(e.target.value);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleUrlSubmit(e.currentTarget.value);
                }
              }}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="button"
              onClick={(e) => {
                const input = (e.currentTarget.previousElementSibling as HTMLInputElement);
                if (input) handleUrlSubmit(input.value);
              }}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Set URL
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Enter a direct URL to an image or PDF
          </p>
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="relative border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              {preview.endsWith('.pdf') || preview.includes('application/pdf') ? (
                <FiFile className="h-5 w-5 text-red-600" />
              ) : (
                <FiImage className="h-5 w-5 text-blue-600" />
              )}
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {preview.endsWith('.pdf') ? 'PDF Document' : 'Image'}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={copyImageUrl}
                className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                title="Copy URL"
              >
                <FiCopy className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="p-1 text-red-500 hover:text-red-700"
                title="Remove"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {!preview.endsWith('.pdf') && !preview.includes('application/pdf') && (
            <div className="mt-2">
              <img
                src={preview}
                alt="Preview"
                className="max-w-full h-auto max-h-48 rounded border border-gray-200 dark:border-gray-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}
          
          {preview.endsWith('.pdf') || preview.includes('application/pdf') ? (
            <div className="mt-2">
              <a
                href={preview}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
              >
                View PDF
              </a>
            </div>
          ) : (
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 break-all">
              {preview}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
