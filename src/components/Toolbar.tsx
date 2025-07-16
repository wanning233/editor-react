import React from "react";
import { Editor } from "@tiptap/core";

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
          const buttonResult = button({ editor });

          // 处理返回数组的情况（如 Indent 扩展）
          if (Array.isArray(buttonResult)) {
            return buttonResult.map((btnConfig, index) => {
              const { component: ButtonComponent, componentProps } = btnConfig;
              return ButtonComponent ? (
                <ButtonComponent
                  key={`${extension.name}-${index}`}
                  {...componentProps}
                >
                  {componentProps.children || extension.name}
                </ButtonComponent>
              ) : null;
            });
          } else {
            // 处理返回单个对象的情况
            const { component: ButtonComponent, componentProps } = buttonResult;
            return ButtonComponent ? (
              <ButtonComponent key={extension.name} {...componentProps}>
                {componentProps.children || extension.name}
              </ButtonComponent>
            ) : null;
          }
        }
        return null;
      })}
    </div>
  );
};
