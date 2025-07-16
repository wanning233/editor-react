import { ActiveButton } from "../../components/ActiveButton";
import { Node } from "@tiptap/core";

export const Clear = Node.create<any>({
  name: "clear",
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }: any) => ({
        component: ActiveButton,
        componentProps: {
          action: () =>
            editor.chain().focus().clearNodes().unsetAllMarks().run(),
          disabled: !editor
            .can()
            .chain()
            .focus()
            .clearNodes()
            .unsetAllMarks()
            .run(),
          shortcutKeys: ["mod", "K"],
          icon: "Clear",
        },
      }),
    };
  },
});
