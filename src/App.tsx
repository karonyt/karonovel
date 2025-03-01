import React, { useState, useEffect } from 'react';
import { Book, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import NovelList from './components/NovelList';
import NovelReader from './components/NovelReader';
import { Novel } from './types';
import './App.css';

function App() {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [selectedNovel, setSelectedNovel] = useState<Novel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    // Load novel metadata from a JSON file
    fetch('/novels/index.json')
      .then(response => response.json())
      .then(data => {
        setNovels(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading novels:', error);
        setLoading(false);
      });
  }, []);

  const handleNovelSelect = (novel: Novel) => {
    setSelectedNovel(novel);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-indigo-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-full hover:bg-indigo-600 transition-colors"
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center space-x-2" onClick={() => setSelectedNovel(null)} style={{cursor: 'pointer'}}>
              <Book size={24} />
              <h1 className="text-xl font-bold">Novel Reader</h1>
            </div>
          </div>
          {selectedNovel && (
            <div className="hidden md:block text-lg font-medium truncate max-w-md">
              {selectedNovel.title}
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for novel list - hidden on mobile unless menu is open */}
        <aside 
          className={`${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 fixed md:relative z-10 w-64 h-[calc(100vh-64px)] bg-white shadow-lg transition-transform duration-300 ease-in-out overflow-y-auto`}
        >
          <NovelList 
            novels={novels} 
            onSelectNovel={handleNovelSelect} 
            selectedNovelId={selectedNovel?.id} 
            loading={loading}
          />
        </aside>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4">
          {selectedNovel ? (
            <NovelReader novel={selectedNovel} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <Book size={64} className="text-indigo-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">KaroNovelへようこそ！</h2>
              <p className="text-gray-600 max-w-md">
                読みたいサイトを選ぼう。読書履歴は自動で保存されるよ。
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Overlay to close menu when clicking outside on mobile */}
      {menuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-0"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
}

export default App;