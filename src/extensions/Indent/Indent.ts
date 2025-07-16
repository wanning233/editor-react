import { Extension } from "@tiptap/core";
import type { Editor } from "@tiptap/core";

import { ActiveButton } from "../../components/ActiveButton";
import type { GeneralOptions } from "../../types";
import { IndentProps, createIndentCommand } from "../../utils/indent";
//
export interface IndentOptions extends GeneralOptions<IndentOptions> {
  types: string[];
  minIndent: number;
  maxIndent: number;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    indent: {
      indent: () => ReturnType;
      outdent: () => ReturnType;
    };
  }
}

export const Indent = Extension.create<IndentOptions>({
  name: "indent",
  addOptions() {
    return {
      ...this.parent?.(),
      types: ["paragraph", "heading", "blockquote"],
      minIndent: IndentProps.min,
      maxIndent: IndentProps.max,
      button({ editor }: { editor: Editor }) {
        return [
          {
            component: ActiveButton,
            componentProps: {
              action: () => {
                editor.commands.indent();
              },
              shortcutKeys: ["Tab"],
              icon: "IndentIncrease",
            },
          },
          {
            component: ActiveButton,
            componentProps: {
              action: () => {
                editor.commands.outdent();
              },
              shortcutKeys: ["Shift", "Tab"],
              icon: "IndentDecrease",
            },
          },
        ];
      },
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: 0,
            parseHTML: (element) => {
              const identAttr = element.dataset.indent;
              return (identAttr ? Number.parseInt(identAttr, 10) : 0) || 0;
            },
            renderHTML: (attributes) => {
              if (!attributes.indent) {
                return {};
              }
              return { "data-indent": attributes.indent };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      indent: () =>
        createIndentCommand({
          delta: IndentProps.more,
          types: this.options.types,
        }),
      outdent: () =>
        createIndentCommand({
          delta: IndentProps.less,
          types: this.options.types,
        }),
    };
  },

  addKeyboardShortcuts() {
    return {
      Tab: () => this.editor.commands.indent(),
      "Shift-Tab": () => this.editor.commands.outdent(),
    };
  },
});
