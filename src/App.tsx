import React, { useState, useEffect } from "react";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold } from "./extensions/Bold/index";
import { Toolbar } from "./components/Toolbar";
import "./App.css";
import { Clear } from "./extensions/Clear/index";
import { BulletList } from "./extensions/BulletList";
import { Code } from "./extensions/Code";
import { Color } from "./extensions/Color";
import TextStyle from "@tiptap/extension-text-style";
import { OrderedList } from "./extensions/OrderedList";
import { Italic } from "./extensions/Italic";
import { Heading } from "./extensions/Heading/Heading";
import { TextAlign } from "./extensions/TextAlign/TextAlign";
//@ts-ignore
import { Layout } from "antd";
import { Indent } from "./extensions/Indent";
import TableOfContents from './components/TableOfContents';
import { FontSize } from "./extensions/FontSize";
import { DEFAULT_FONT_SIZE_LIST } from "./components/constants";
import { Strike } from "./extensions/Strike";
import { Table } from "./extensions/Table";
import { Highlight } from "./extensions/Highlight";
import { Image } from "./extensions/Image";
const { Header, Sider, Content } = Layout;

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
  TextAlign,
  Indent,
  FontSize.configure({
    fontSizes: [...DEFAULT_FONT_SIZE_LIST], 
  }),
  Strike,
  Table,
  Highlight,
  Image,
];

interface TOCItem {
  title: string;
  level: number;
}

function App() {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]); 

  const editor = useEditor({
    extensions: extensions, // 确保扩展被正确传递
    content: "<p>Hello World!</p>",
  });

  if (!editor) return null; 

  useEffect(() => {
    const updateToc = () => {
      const content = editor.getHTML();
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const headings = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6')) as HTMLElement[];

      const items = headings.map(heading => ({
        title: heading.innerText,
        level: parseInt(heading.tagName[1])
      }));

      setTocItems(items);
    };

    editor.on('update', updateToc);
    
    return () => {
      editor.off('update', updateToc);
    };
  }, [editor]);

  return (
    <Layout style={{ height: "100vh" }}>
      <Header
        style={{
          background: "#fff",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #e8e8e8",
          zIndex: 10,
        }}
      >
        <div style={{ fontSize: "18px", fontWeight: 600, color: "#1f2937" }}>
          文档编辑器
        </div>
      </Header>
      <Layout>
        <Sider width={180} style={{ background: '#f5f6fa', padding: '24px 0' }}>
          <TableOfContents items={tocItems} /> 
        </Sider>
        <Content style={{ background: "#f8fafc", padding: 32, overflow: "auto" }}>
          <div className="editor-container">
            <div className="editor-toolbar-wrapper">
              <Toolbar editor={editor} />
            </div>
            <EditorContent editor={editor} className="text-area" />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
