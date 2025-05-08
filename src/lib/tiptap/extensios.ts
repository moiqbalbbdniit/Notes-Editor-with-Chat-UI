// lib/tiptap/extensions.ts
import { Extension } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Heading from '@tiptap/extension-heading';

export const getExtensions = () => [
  StarterKit.configure({
    // Disable extensions not needed for this project
    code: false,
    codeBlock: false,
    blockquote: false,
    horizontalRule: false,
    dropcursor: false,
    gapcursor: false,
    hardBreak: false,
  }),
  Heading.configure({
    levels: [1, 2, 3],
    HTMLAttributes: {
      class: 'heading',
    },
  }),
  BulletList.configure({
    HTMLAttributes: {
      class: 'bullet-list',
    },
  }),
  OrderedList.configure({
    HTMLAttributes: {
      class: 'ordered-list',
    },
  }),
  ListItem.configure({
    HTMLAttributes: {
      class: 'list-item',
    },
  }),
];