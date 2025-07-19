import React from "react";
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
];

const menuItems = [
  "主诉",
  "现病史",
  "既往史",
  "流行病史",
  "体格检查",
  "辅助检查",
  "门诊诊断",
  "处置治疗",
  "电子签名",
  "其他记录",
];

function App() {
  const editor = useEditor({
    extensions: extensions,
    content: "<p>Hello World!</p>",
  });

  return (
    <Layout style={{ height: "100vh" }}>
      {/* 顶部标题栏 */}
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
        {/* 左侧目录 */}
        <Sider width={180} style={{ background: "#f5f6fa", padding: "24px 0" }}>
          <div style={{ paddingLeft: 24 }}>
            {menuItems.map((item, idx) => (
              <div key={idx} style={{ margin: "12px 0", fontWeight: 500 }}>
                {item}：
              </div>
            ))}
          </div>
        </Sider>
        {/* 右侧内容 */}
        <Content
          style={{ background: "#f8fafc", padding: 32, overflow: "auto" }}
        >
          <div className="editor-container">
            {/* 工具栏现在在编辑器容器内部 */}
            <div className="editor-toolbar-wrapper">
              <Toolbar editor={editor as Editor} />
            </div>
            <EditorContent editor={editor} className="text-area" />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
