import type { Editor, Extension } from "@tiptap/core";
import type { TextAlignOptions as TiptapTextAlignOptions } from "@tiptap/extension-text-align";
import TiptapTextAlign from "@tiptap/extension-text-align";

import type { GeneralOptions } from "../../types";
import TextAlignButton from "./components/TextAlignButton";

type Alignments = "left" | "center" | "right" | "justify";
export interface TextAlignOptions
  extends TiptapTextAlignOptions,
    GeneralOptions<TextAlignOptions> {
  alignments: Alignments[];
}
export const TextAlign = TiptapTextAlign.extend<TextAlignOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      types: ["heading", "paragraph", "list_item", "title"],
      button({ editor, extension }: { editor: Editor; extension: Extension }) {
        const alignments = (extension?.options?.alignments as Alignments[]) || [
          "left",
          "center",
          "right",
          "justify",
        ];
        const shortcutKeysMap = {
          left: ["mod", "Shift", "L"],
          center: ["mod", "Shift", "E"],
          right: ["mod", "Shift", "R"],
          justify: ["mod", "Shift", "J"],
        };
        const iconMap = {
          left: "Left",
          center: "Center",
          right: "Right",
          justify: "Justify",
        };
        const items = alignments.map((k) => ({
          title: k,
          icon: iconMap[k],
          shortcutKeys: shortcutKeysMap[k],
          isActive: () => editor.isActive({ textAlign: k }) || false,
          action: () => editor.commands?.setTextAlign?.(k),
          disabled: !editor?.can?.()?.setTextAlign?.(k),
        }));
        const disabled =
          items.filter((k) => k.disabled).length === items.length;
        return {
          component: TextAlignButton,
          componentProps: {
            icon: "TextAlign",
            disabled,
            items,
          },
        };
      },
    };
  },
});
