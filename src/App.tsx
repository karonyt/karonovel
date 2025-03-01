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
    <head>
    <link rel="apple-touch-icon" sizes="57x57" href="https://karonyt.github.io/karonovel/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="https://karonyt.github.io/karonovel/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="https://karonyt.github.io/karonovel/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="https://karonyt.github.io/karonovel/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="https://karonyt.github.io/karonovel/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="https://karonyt.github.io/karonovel/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="https://karonyt.github.io/karonovel/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="https://karonyt.github.io/karonovel/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="https://karonyt.github.io/karonovel/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="https://karonyt.github.io/karonovel/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="https://karonyt.github.io/karonovel/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="https://karonyt.github.io/karonovel/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="https://karonyt.github.io/karonovel/favicon-16x16.png">
    <link rel="manifest" href="https://karonyt.github.io/karonovel/manifest.json">
    </head>
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