import { ActiveButton } from "../../components/ActiveButton";
import { Bold as TiptapBold } from "@tiptap/extension-bold";
import type { BoldOptions as TiptapImageOptions } from "@tiptap/extension-bold";
import { IconComponent } from "@/components/icons/icon";

export const Bold = TiptapBold.extend<TiptapImageOptions, {}>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }: any) => ({
        component: ActiveButton,
        componentProps: {
          action: () => {
            editor.commands.toggleBold();
          },
          isActive: () => editor.isActive("bold") || false,
          disabled: false,
          icon: IconComponent,
          iconProps: { name: "Bold" },
          shortcutKeys: ["mod", "B"],
        },
      }),
    };
  },
});
