import React from 'react';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold } from './extensions/Bold/index'; 
import { Toolbar } from './components/Toolbar'; 
import './App.css';
import { Clear } from './extensions/Clear/index';
import { BulletList } from './extensions/BulletList';
import { Code } from './extensions/Code';
import { Color } from './extensions/Color';
import TextStyle from '@tiptap/extension-text-style'; 
import { OrderedList } from './extensions/OrderedList';
import { Italic } from './extensions/Italic';
import { Heading } from './extensions/Heading/Heading';

const extensions = [
  StarterKit,
  Bold, 
  Clear,
  BulletList,
  Code,
  Color,
  TextStyle,
  OrderedList,
  Italic,
  Heading,
];
function App() {
  const editor = useEditor({
    extensions: extensions,
    content: '<p>Hello World!</p>', 
  });

  return (
    <div className="App">
      <div className="toolbar">
        <Toolbar editor={editor as Editor} />
      </div>
      <div className="editor-container">
        <EditorContent editor={editor} className="text-area" />
      </div>
    </div>
  );
}

export default App;
