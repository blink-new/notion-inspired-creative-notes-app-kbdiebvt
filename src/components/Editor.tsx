import React, { useEffect, useState, useCallback } from 'react';
import { Page } from '../types';
import { Input } from './ui/input';
// import { Textarea } from './ui/textarea'; // Remove this
import { RichTextEditor } from './RichTextEditor'; // Add this
import { motion } from 'framer-motion';

interface EditorProps {
  activePage: Page | null | undefined;
  onUpdatePage: (id: string, updates: Partial<Omit<Page, 'id' | 'createdAt'>>) => void;
}

export function Editor({ activePage, onUpdatePage }: EditorProps) {
  const [title, setTitle] = useState('');
  // const [content, setContent] = useState(''); // Content will be handled by RichTextEditor

  useEffect(() => {
    if (activePage) {
      setTitle(activePage.title);
      // setContent(activePage.content); // Content is passed directly to RichTextEditor
    } else {
      setTitle('');
      // setContent('');
    }
  }, [activePage]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (activePage) {
      onUpdatePage(activePage.id, { title: newTitle });
    }
  };

  // Remove handleContentChange as RichTextEditor has its own onChange
  const handleRichTextChange = (htmlContent: string) => {
    if (activePage) {
      onUpdatePage(activePage.id, { content: htmlContent });
    }
  };

  if (!activePage) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-neutral-100">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <img src="https://illustrations.popsy.co/gray/meditating.svg" alt="Meditating person" className="w-64 h-64 mx-auto mb-8"/>
          <h2 className="text-2xl font-semibold text-neutral-700 mb-2">Select a note to get started</h2>
          <p className="text-neutral-500">Or create a new one from the sidebar.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      key={activePage.id} // Ensures re-render with animation on page switch
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col p-8 bg-white overflow-y-auto"
    >
      <Input
        value={title}
        onChange={handleTitleChange}
        placeholder="Untitled Page"
        className="text-4xl font-bold border-none focus:ring-0 shadow-none p-0 mb-6 h-auto focus-visible:ring-offset-0 focus-visible:ring-0"
      />
      {/* Replace Textarea with RichTextEditor */}
      <RichTextEditor
        content={activePage.content} // Pass HTML content
        onChange={handleRichTextChange} // Handle HTML content change
        placeholder="Start writing your creative notes here..."
      />
    </motion.div>
  );
}