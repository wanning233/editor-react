import React from "react";
import { Editor } from "@tiptap/core";

interface ToolbarProps {
  editor: Editor;
  disabled?: boolean;
}

// 定义工具栏按钮分组配置
const TOOLBAR_GROUPS = [
  {
    name: "text-style",
    extensions: ["bold", "italic", "code"],
  },
  {
    name: "heading-text",
    extensions: ["heading", "textAlign"],
  },
  {
    name: "lists",
    extensions: ["bulletList", "orderedList"],
  },
  {
    name: "formatting",
    extensions: ["color", "indent"],
  },
  {
    name: "actions",
    extensions: ["clear"],
  },
];

export const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  // 将扩展按分组组织
  const groupedButtons = React.useMemo(() => {
    const extensionButtonMap = new Map();

    // 首先收集所有扩展的按钮
    editor.extensionManager.extensions.forEach((extension) => {
      const button = extension.options.button;
      if (button) {
        const buttonResult = button({ editor });
        // 使用扩展的实际名称
        const extensionName = extension.name.toLowerCase();
        extensionButtonMap.set(extensionName, {
          extension,
          buttonResult,
        });
        // 调试信息：打印所有扩展名称
        console.log(`Extension found: ${extension.name} (${extensionName})`);
      }
    });

    // 按分组组织按钮，支持多种可能的名称
    return TOOLBAR_GROUPS.map((group) => {
      const buttons = group.extensions
        .map((extensionName) => {
          // 尝试多种可能的名称匹配
          const possibleNames = [
            extensionName,
            extensionName.toLowerCase(),
            extensionName.replace(/([A-Z])/g, "-$1").toLowerCase(), // camelCase to kebab-case
            extensionName.replace(/([A-Z])/g, "$1").toLowerCase(), // camelCase to lowercase
          ];

          let button = null;
          for (const name of possibleNames) {
            button = extensionButtonMap.get(name);
            if (button) {
              console.log(`Matched extension: ${extensionName} -> ${name}`);
              break;
            }
          }

          if (!button) {
            console.log(
              `Extension not found: ${extensionName} (tried: ${possibleNames.join(
                ", "
              )})`
            );
          }
          return button;
        })
        .filter(Boolean);

      return {
        ...group,
        buttons,
      };
    }).filter((group) => group.buttons.length > 0);
  }, [editor]);

  const renderButton = (
    buttonData: any,
    extensionName: string,
    index: number
  ) => {
    const { buttonResult } = buttonData;

    // 处理返回数组的情况（如 Indent 扩展）
    if (Array.isArray(buttonResult)) {
      return buttonResult.map((btnConfig, btnIndex) => {
        const { component: ButtonComponent, componentProps } = btnConfig;
        return ButtonComponent ? (
          <ButtonComponent
            key={`${extensionName}-${btnIndex}`}
            {...componentProps}
          >
            {componentProps.children || extensionName}
          </ButtonComponent>
        ) : null;
      });
    } else {
      // 处理返回单个对象的情况
      const { component: ButtonComponent, componentProps } = buttonResult;
      return ButtonComponent ? (
        <ButtonComponent key={`${extensionName}-${index}`} {...componentProps}>
          {componentProps.children || extensionName}
        </ButtonComponent>
      ) : null;
    }
  };

  return (
    <div className="toolbar">
      {groupedButtons.map((group, groupIndex) => (
        <div key={group.name} className="toolbar-group">
          {group.buttons.map((buttonData, buttonIndex) => {
            const extensionName = buttonData.extension.name;
            return renderButton(buttonData, extensionName, buttonIndex);
          })}
        </div>
      ))}
    </div>
  );
};
