import React from 'react';

export interface Note {
  id: number;
  title: string;
}

interface NotesListProps {
  notes: Note[];
  selectedNoteId: number | null;
  onSelectNote: (id: number) => void;
}

const NotesList: React.FC<NotesListProps> = ({ notes, selectedNoteId, onSelectNote }) => {
  return (
    <div className="h-full overflow-y-auto p-4 border-r border-gray-200">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Notes</h2>
      </div>
      <ul className="space-y-2">
        {notes.map(note => (
          <li
            key={note.id}
            onClick={() => onSelectNote(note.id)}
            className={`cursor-pointer p-2 rounded ${selectedNoteId === note.id ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-blue-100'}`}
          >
            {note.title}
          </li>
        ))}
      </ul>
      <button className="mt-4 w-full px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        + New Note
      </button>
    </div>
  );
};

export default NotesList;
