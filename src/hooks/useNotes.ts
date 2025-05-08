'use client';
import { useState, useEffect } from 'react';

interface Note {
  id: string;
  title: string;
  content: string;
  chatHistory: Array<{ text: string; isUser: boolean }>;
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('notes');
      return saved ? JSON.parse(saved) : [
        { id: '1', title: 'First Note', content: '', chatHistory: [] }
      ];
    }
    return [{ id: '1', title: 'First Note', content: '', chatHistory: [] }];
  });

  const [currentNoteId, setCurrentNoteId] = useState('1');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: `Note ${notes.length + 1}`,
      content: '',
      chatHistory: [],
    };
    setNotes(prev => [...prev, newNote]);
    setCurrentNoteId(newNote.id);
    return newNote.id;
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(prev => 
      prev.map(note => 
        note.id === id ? { ...note, ...updates } : note
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    if (id === currentNoteId && notes.length > 1) {
      setCurrentNoteId(notes.find(note => note.id !== id)?.id || '1');
    }
  };

  const addChatMessage = (noteId: string, text: string, isUser: boolean) => {
    setNotes(prev => 
      prev.map(note => 
        note.id === noteId 
          ? { 
              ...note, 
              chatHistory: [...note.chatHistory, { text, isUser }] 
            } 
          : note
      )
    );
  };

  return {
    notes,
    currentNoteId,
    setCurrentNoteId,
    addNote,
    updateNote,
    deleteNote,
    addChatMessage,
    currentNote: notes.find(note => note.id === currentNoteId) || notes[0],
  };
}