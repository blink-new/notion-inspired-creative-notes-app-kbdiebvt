import { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Editor } from './components/Editor';
import { usePages } from './hooks/usePages';
import { Page } from './types';
import { Toaster } from './components/ui/sonner';
import { toast } from "sonner"
import { ThemeProvider } from "next-themes" // Import ThemeProvider

function App() {
// ... existing code ...

  const { pages, addPage, updatePage, deletePage, getPageById } = usePages();
  const [activePageId, setActivePageId] = useState<string | null>(null);
  const [activePage, setActivePage] = useState<Page | null | undefined>(null);

  // Effect to set the first page as active on initial load or when pages change
  useEffect(() => {
    if (!activePageId && pages.length > 0) {
      setActivePageId(pages[0].id);
    }
    // If activePageId is set, find and set the activePage
    if (activePageId) {
      const foundPage = getPageById(activePageId);
      setActivePage(foundPage);
      if (!foundPage && pages.length > 0) { // If current active page deleted, select first
        setActivePageId(pages[0].id);
      } else if (!foundPage && pages.length === 0) { // If all pages deleted
        setActivePageId(null);
        setActivePage(null);
      }
    } else if (pages.length === 0) { // No pages exist
        setActivePageId(null);
        setActivePage(null);
    }
  }, [pages, activePageId, getPageById]);

  const handleAddPage = useCallback(() => {
    const newPageId = addPage();
    setActivePageId(newPageId);
    toast.success("New page created!")
    return newPageId;
  }, [addPage]);

  const handleSelectPage = useCallback((id: string) => {
    setActivePageId(id);
  }, []);

  const handleUpdatePage = useCallback(
    (id: string, updates: Partial<Omit<Page, 'id' | 'createdAt'>>) => {
      updatePage(id, updates);
    },
    [updatePage]
  );

  const handleDeletePage = useCallback((id: string) => {
    const pageToDelete = getPageById(id);
    deletePage(id);
    toast.error(`Page "${pageToDelete?.title || 'Untitled'}" deleted.`);
    // Logic to select another page after deletion is handled in the useEffect above
  }, [deletePage, getPageById]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex h-screen w-screen bg-neutral-100 antialiased">
        <Sidebar 
        pages={pages} 
        onAddPage={handleAddPage} 
        onSelectPage={handleSelectPage}
        onDeletePage={handleDeletePage}
        activePageId={activePageId} 
      />
        <Editor 
        activePage={activePage} 
        onUpdatePage={handleUpdatePage} 
      />
        <Toaster richColors closeButton />
      </div>
    </ThemeProvider>
  );
}

export default App;
