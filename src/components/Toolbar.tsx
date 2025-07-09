// src/components/Toolbar.tsx
import React from 'react';
import { Editor } from '@tiptap/core';

interface ToolbarProps {
  editor: Editor;
  disabled?: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  return (
    <div className="toolbar">
          {editor.extensionManager.extensions.map((extension) => {
       const button = extension.options.button;
       if (button) {
         const { component: ButtonComponent, componentProps } = button({ editor });
         return (
           <ButtonComponent key={extension.name} {...componentProps}>
             {extension.name}
           </ButtonComponent>
         );
       }
       return null;
     })}
    </div>
  );
};
