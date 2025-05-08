'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Edit, Trash2, Check, X, FileText } from 'lucide-react';

interface NoteItemProps {
  note: {
    id: string;
    title: string;
  };
  isActive: boolean;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
}

export default function NoteItem({ 
  note, 
  isActive, 
  onDelete, 
  onUpdate 
}: NoteItemProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);

  const handleNoteClick = () => {
    if (!isEditing) {
      router.push(`/${note.id}`);
    }
  };

  const saveEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdate(note.id, editedTitle);
    setIsEditing(false);
  };

  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
        isActive
          ? 'bg-blue-100 text-blue-800'
          : 'hover:bg-gray-100'
      }`}
      onClick={handleNoteClick}
    >
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <FileText className="h-4 w-4 flex-shrink-0" />
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 bg-transparent outline-none min-w-0"
            autoFocus
            onKeyDown={(e) => e.key === 'Enter' && saveEdit(e as any)}
          />
        ) : (
          <span className="truncate">{note.title}</span>
        )}
      </div>

      <div className="flex items-center space-x-2 ml-2">
        {isEditing ? (
          <>
            <button onClick={saveEdit} className="p-1 text-green-600 hover:text-green-800">
              <Check className="h-4 w-4" />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setEditedTitle(note.title);
                setIsEditing(false);
              }} 
              className="p-1 text-red-600 hover:text-red-800"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }} 
              className="p-1 text-gray-500 hover:text-blue-600"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.id);
              }} 
              className="p-1 text-gray-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}