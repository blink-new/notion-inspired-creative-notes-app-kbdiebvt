import { useState, useEffect, useCallback } from 'react';
import { nanoid } from 'nanoid';
import { Page } from '../types';

const LOCAL_STORAGE_KEY = 'creative-notes-pages';

export function usePages() {
  const [pages, setPages] = useState<Page[]>([]);

  useEffect(() => {
    try {
      const storedPages = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedPages) {
        setPages(JSON.parse(storedPages));
      } else {
        // Initialize with a default page if none are stored
        const initialPage: Page = {
          id: nanoid(),
          title: 'My First Note',
          content: 'This is where your brilliant ideas begin!',
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        setPages([initialPage]);
      }
    } catch (error) {
      console.error("Failed to load pages from localStorage", error);
      // Fallback to a single initial page in case of error
       const initialPage: Page = {
          id: nanoid(),
          title: 'Welcome Note',
          content: 'Could not load previous notes. Start fresh here!',
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
      setPages([initialPage]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pages));
    } catch (error) {
      console.error("Failed to save pages to localStorage", error);
    }
  }, [pages]);

  const addPage = useCallback(() => {
    const newPage: Page = {
      id: nanoid(),
      title: 'Untitled',
      content: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setPages((prevPages) => [...prevPages, newPage]);
    return newPage.id;
  }, []);

  const updatePage = useCallback((id: string, updates: Partial<Omit<Page, 'id' | 'createdAt'>>) => {
    setPages((prevPages) =>
      prevPages.map((page) =>
        page.id === id ? { ...page, ...updates, updatedAt: Date.now() } : page
      )
    );
  }, []);

  const deletePage = useCallback((id: string) => {
    setPages((prevPages) => prevPages.filter((page) => page.id !== id));
  }, []);
  
  const getPageById = useCallback((id: string): Page | undefined => {
    return pages.find(page => page.id === id);
  }, [pages]);

  return { pages, addPage, updatePage, deletePage, getPageById };
}
