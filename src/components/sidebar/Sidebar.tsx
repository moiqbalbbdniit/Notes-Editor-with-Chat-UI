'use client';

import NoteItem from './NoteItem';
import { Plus, NotebookPen } from 'lucide-react';

interface SidebarProps {
  notes: Array<{ id: string; title: string }>;
  currentNoteId: string;
  onAddNote: () => void;
  onDeleteNote: (id: string) => void;
  onUpdateNoteTitle: (id: string, title: string) => void;
}

export default function Sidebar({
  notes,
  currentNoteId,
  onAddNote,
  onDeleteNote,
  onUpdateNoteTitle,
}: SidebarProps) {
  return (
    <div className="w-64 h-full border-r bg-gray-50 p-4 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <NotebookPen className="h-5 w-5" />
          Notes
        </h2>
        <button 
          onClick={onAddNote}
          className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          <span className="text-sm">New</span>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {notes.map(note => (
          <NoteItem
            key={note.id}
            note={note}
            isActive={note.id === currentNoteId}
            onDelete={onDeleteNote}
            onUpdate={onUpdateNoteTitle}
          />
        ))}
      </div>
    </div>
  );
}