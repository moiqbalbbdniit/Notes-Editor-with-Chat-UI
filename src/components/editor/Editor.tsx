
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { getExtensions } from '@/lib/tiptap/extensios';
import Toolbar from './Toolbar';
import { useEffect, useState } from 'react';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function Editor({ content, onChange }: EditorProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    extensions: getExtensions(),
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'proseMirror-content focus:outline-none min-h-[300px]',
      },
    },
    // Explicitly disable immediate render for SSR
    immediatelyRender: false,
  });

  if (!mounted || !editor) {
    return <div className="border rounded-lg p-4 min-h-[300px] bg-white"></div>;
  }

  return (
    <div className="border rounded-lg p-4 bg-white">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="min-h-[300px] mt-2" />
    </div>
  );
}