import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import { Novel, Chapter } from '../types';

interface NovelReaderProps {
  novel: Novel;
}

const NovelReader: React.FC<NovelReaderProps> = ({ novel }) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [currentChapter, setCurrentChapter] = useState<number>(0);
  const [chapters, setChapters] = useState<Chapter[]>([]);

  // Load novel content
  useEffect(() => {
    setLoading(true);
    
    // If the novel has chapters, load the chapter structure first
    if (novel.chapters) {
      setChapters(novel.chapters);
      loadChapterContent(novel.chapters[currentChapter].filePath);
    } else {
      // Otherwise load the entire novel from a single file
      fetch(novel.filePath)
        .then(response => response.text())
        .then(text => {
          setContent(text);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error loading novel content:', error);
          setContent('Error loading novel content. Please try again later.');
          setLoading(false);
        });
    }

    // Save reading progress
    localStorage.setItem(`novel_${novel.id}_progress`, currentChapter.toString());
  }, [novel, currentChapter]);

  // Load chapter content
  const loadChapterContent = (filePath: string) => {
    fetch(filePath)
      .then(response => response.text())
      .then(text => {
        setContent(text);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading chapter content:', error);
        setContent('Error loading chapter content. Please try again later.');
        setLoading(false);
      });
  };

  // Navigate to previous chapter
  const prevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  // Navigate to next chapter
  const nextChapter = () => {
    if (novel.chapters && currentChapter < novel.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  // Format text content with proper paragraphs
  const formatContent = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Novel info */}
      <div className="mb-6 md:flex items-start space-x-4 hidden">
        <img 
          src={novel.cover} 
          alt={`${novel.title} cover`} 
          className="w-24 h-36 object-cover rounded shadow-md"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{novel.title}</h1>
          <p className="text-gray-600 mb-2">by {novel.author}</p>
          <p className="text-sm text-gray-500">{novel.description}</p>
        </div>
      </div>

      {/* Chapter navigation if there are chapters */}
      {novel.chapters && novel.chapters.length > 0 && (
        <div className="flex justify-between items-center mb-4 bg-white p-3 rounded-lg shadow-sm">
          <button 
            onClick={prevChapter}
            disabled={currentChapter === 0}
            className={`flex items-center space-x-1 px-3 py-1 rounded ${
              currentChapter === 0 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            <ChevronLeft size={16} />
            <span>前話</span>
          </button>
          
          <div className="text-sm font-medium text-gray-700">
            第 {currentChapter + 1} 話
          </div>
          
          <button 
            onClick={nextChapter}
            disabled={currentChapter === novel.chapters.length - 1}
            className={`flex items-center space-x-1 px-3 py-1 rounded ${
              currentChapter === novel.chapters.length - 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            <span>次話</span>
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Chapter title if available */}
      {novel.chapters && novel.chapters[currentChapter] && (
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {novel.chapters[currentChapter].title}
        </h2>
      )}

      {/* Novel content */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        {loading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        ) : (
          <div className="novel-content">
            {formatContent(content)}
          </div>
        )}
      </div>

            {/* Chapter navigation if there are chapters */}
            {novel.chapters && novel.chapters.length > 0 && (
        <div className="flex justify-between items-center mb-4 bg-white p-3 rounded-lg shadow-sm">
          <button 
            onClick={prevChapter}
            disabled={currentChapter === 0}
            className={`flex items-center space-x-1 px-3 py-1 rounded ${
              currentChapter === 0 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            <ChevronLeft size={16} />
            <span>前話</span>
          </button>
          
          <div className="text-sm font-medium text-gray-700">
            第 {currentChapter + 1} 話
          </div>
          
          <button 
            onClick={nextChapter}
            disabled={currentChapter === novel.chapters.length - 1}
            className={`flex items-center space-x-1 px-3 py-1 rounded ${
              currentChapter === novel.chapters.length - 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            <span>次話</span>
            <ChevronRight size={16} />
          </button>
        </div>
      )}

    </div>
  );
};

export default NovelReader;