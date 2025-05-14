import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react'; // Removed EditorProvider as it's not strictly needed here
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder'; // Import Placeholder
import { EditorToolbar } from './EditorToolbar';
import './RichTextEditor.css';

interface RichTextEditorProps {
  content: string;
  onChange: (richText: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Example: Configure heading levels if needed
        // heading: {
        //   levels: [1, 2, 3],
        // },
        // Disable default placeholder from StarterKit if you want to use the dedicated one
        // document: false, // If you want to fully control the document structure
      }),
      Placeholder.configure({ // Configure the placeholder
        placeholder: placeholder || 'Start typing...',
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        // Removed prose classes, will rely on RichTextEditor.css for styling the editor content area
        // This provides more direct control over editor appearance.
        class: 'tiptap', // Apply our custom class for styling
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col flex-1">
      <EditorToolbar editor={editor} />
      {/* The EditorContent will now correctly apply the .tiptap class from editorProps */}
      <EditorContent editor={editor} className="flex-1 flex flex-col" />
    </div>
  );
}