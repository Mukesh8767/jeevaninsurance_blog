'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heading1, Heading2, Type, Image as ImageIcon, Video as VideoIcon, Search } from 'lucide-react';

interface SlashMenuProps {
  onSelect: (type: string) => void;
  onClose: () => void;
  position: { top: number; left: number };
}

const MENU_ITEMS = [
  { id: 'heading-1', label: 'Heading 1', icon: Heading1, description: 'Large section heading' },
  { id: 'heading-2', label: 'Heading 2', icon: Heading2, description: 'Medium section heading' },
  { id: 'paragraph', label: 'Text', icon: Type, description: 'Just start writing with plain text' },
  { id: 'image', label: 'Image', icon: ImageIcon, description: 'Upload or embed from URL' },
  { id: 'video', label: 'Video', icon: VideoIcon, description: 'Upload a video file' },
];

export function SlashMenu({ onSelect, onClose, position }: SlashMenuProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [search, setSearch] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  const filteredItems = MENU_ITEMS.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          onSelect(filteredItems[selectedIndex].id);
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredItems, selectedIndex, onSelect, onClose]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{ top: position.top, left: position.left }}
      className="fixed z-50 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden"
    >
      <div className="p-2 border-b border-slate-100 flex items-center gap-2 bg-slate-50">
        <Search size={14} className="text-slate-400" />
        <input
          autoFocus
          placeholder="Filter..."
          className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="max-h-[300px] overflow-y-auto p-1">
        {filteredItems.map((item, index) => (
          <button
            key={item.id}
            onMouseEnter={() => setSelectedIndex(index)}
            onClick={() => onSelect(item.id)}
            className={`w-full flex items-start gap-3 p-2 rounded-lg transition-colors text-left ${index === selectedIndex ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
              }`}
          >
            <div className={`p-2 rounded-md ${index === selectedIndex ? 'bg-blue-100' : 'bg-slate-100'}`}>
              <item.icon size={18} />
            </div>
            <div>
              <div className="text-sm font-semibold">{item.label}</div>
              <div className="text-xs text-slate-400">{item.description}</div>
            </div>
          </button>
        ))}
        {filteredItems.length === 0 && (
          <div className="p-4 text-center text-sm text-slate-400">No results found</div>
        )}
      </div>
    </motion.div>
  );
}
