
'use client';

import { useNotes } from '@/hooks/useNotes';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Editor from '@/components/editor/Editor';
import Sidebar from '@/components/sidebar/Sidebar';
import ChatButton from '@/components/chat/ChatButton';
import ChatWindow from '@/components/chat/ChatWindow';

export default function NotePage() {
  const params = useParams();
  const {
    notes,
    currentNote,
    addNote,
    updateNote,
    deleteNote,
    addChatMessage,
    setCurrentNoteId,
  } = useNotes();
  const router = useRouter();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Get noteId from params safely
  const noteId = Array.isArray(params.noteId) ? params.noteId[0] : params.noteId;

  useEffect(() => {
    setIsClient(true);
    if (noteId) {
      setCurrentNoteId(noteId);
    }
  }, [noteId, setCurrentNoteId]);

  useEffect(() => {
    if (isClient && noteId && !notes.some(note => note.id === noteId)) {
      router.push(`/${notes[0]?.id || '1'}`);
    }
  }, [notes, noteId, router, isClient]);

  const handleUpdateNoteTitle = (id: string, title: string) => {
    updateNote(id, { title });
  };

  if (!isClient) {
    return <div className="flex h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar 
        notes={notes}
        currentNoteId={noteId || '1'}
        onAddNote={addNote}
        onDeleteNote={deleteNote}
        onUpdateNoteTitle={handleUpdateNoteTitle}
      />
      
      <div className="flex-1 p-8 overflow-auto relative">
        <input
          value={currentNote?.title || ''}
          onChange={(e) => updateNote(noteId || '1', { title: e.target.value })}
          className="text-2xl font-bold w-full mb-4 p-2 border-b"
        />
        
        <Editor
          content={currentNote?.content || ''}
          onChange={(content) => updateNote(noteId || '1', { content })}
        />
        
        <ChatButton onClick={() => setIsChatOpen(!isChatOpen)} />
        <ChatWindow 
          noteId={noteId || '1'}
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          messages={currentNote?.chatHistory || []}
          onSendMessage={(text) => {
            addChatMessage(noteId || '1', text, true);
          }}
        />
      </div>
    </div>
  );
}