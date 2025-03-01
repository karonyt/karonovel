import React from 'react';
import { Novel } from '../types';
import { BookOpen } from 'lucide-react';

interface NovelListProps {
  novels: Novel[];
  onSelectNovel: (novel: Novel) => void;
  selectedNovelId: string | undefined;
  loading: boolean;
}

const NovelList: React.FC<NovelListProps> = ({ 
  novels, 
  onSelectNovel, 
  selectedNovelId,
  loading
}) => {
  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="bg-gray-200 h-16 w-12 rounded"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (novels.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <BookOpen className="mx-auto mb-2" size={24} />
        <p>No novels available</p>
      </div>
    );
  }

  return (
    <div className="py-2">
      <h2 className="px-4 text-lg font-semibold text-gray-800 mb-2">小説リスト</h2>
      <ul>
        {novels.map(novel => (
          <li key={novel.id}>
            <button
              onClick={() => onSelectNovel(novel)}
              className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-indigo-50 transition-colors ${
                selectedNovelId === novel.id ? 'bg-indigo-100' : ''
              }`}
            >
              <img 
                src={novel.cover} 
                alt={`${novel.title} cover`} 
                className="h-16 w-12 object-cover rounded shadow"
              />
              <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-900 line-clamp-1">{novel.title}</h3>
                <p className="text-sm text-gray-500">{novel.author}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NovelList;