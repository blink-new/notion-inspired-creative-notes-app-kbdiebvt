import React, { useState } from 'react';
import { PlusCircle, FileText, Trash2 } from 'lucide-react';
import { Page } from '../types';
import { Button } from './ui/button';
import { ThemeToggle } from './ThemeToggle';
import { DeletePageDialog } from './DeletePageDialog';

interface SidebarProps {
  pages: Page[];
  onAddPage: () => string; // Returns the new page ID
  onSelectPage: (id: string) => void;
  onDeletePage: (id: string) => void;
  activePageId: string | null;
}

export function Sidebar({ pages, onAddPage, onSelectPage, onDeletePage, activePageId }: SidebarProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<{ id: string; title: string } | null>(null);

  const handleDeleteClick = (e: React.MouseEvent, page: Page) => {
    e.stopPropagation(); // Prevent onSelectPage from firing
    setPageToDelete({ id: page.id, title: page.title || 'Untitled' });
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (pageToDelete) {
      onDeletePage(pageToDelete.id);
      setDeleteDialogOpen(false);
      setPageToDelete(null);
    }
  };

  return (
    <div className="h-full w-64 bg-neutral-50 border-r border-neutral-200 p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-neutral-700">Notes</h2>
        <Button variant="ghost" size="icon" onClick={onAddPage} aria-label="Add new page">
          <PlusCircle className="h-5 w-5 text-neutral-500 hover:text-neutral-700" />
        </Button>
      </div>
      <nav className="flex-grow overflow-y-auto">
        {pages.length === 0 && (
          <p className="text-sm text-neutral-500 italic">No pages yet. Create one!</p>
        )}
        <ul>
          {pages.map((page) => (
            <li key={page.id} className="mb-1">
              <div
                onClick={() => onSelectPage(page.id)}
                className={`group flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors
                  ${activePageId === page.id 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'hover:bg-neutral-100 text-neutral-600'}
                `}
              >
                <div className="flex items-center truncate">
                  <FileText className={`h-4 w-4 mr-2 flex-shrink-0 
                    ${activePageId === page.id ? 'text-blue-600' : 'text-neutral-400 group-hover:text-neutral-600'}
                  `} />
                  <span className="truncate text-sm font-medium">
                    {page.title || 'Untitled'}
                  </span>
                </div>
                {activePageId === page.id && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={(e) => handleDeleteClick(e, page)}
                    aria-label="Delete page"
                    className="opacity-0 group-hover:opacity-100 hover:bg-red-100 hover:text-red-600 transition-opacity ml-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-neutral-200 flex items-center justify-between">
        <p className="text-xs text-neutral-400">Blink Notes v0.1</p>
        <ThemeToggle />
      </div>

      {/* Delete Confirmation Dialog */}
      {pageToDelete && (
        <DeletePageDialog
          isOpen={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          pageTitle={pageToDelete.title}
          onConfirmDelete={handleConfirmDelete}
        />
      )}
    </div>
  );
}