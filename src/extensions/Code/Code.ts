import { Code as TiptapCode } from '@tiptap/extension-code';

import { ActiveButton } from '../../components/ActiveButton';


export const Code = TiptapCode.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }:any) => ({
        component: ActiveButton,
        componentProps: {
          action: () => editor.commands.toggleCode(),
          isActive: () => editor.isActive('code') || false,
          disabled: !editor.can().toggleCode(),
          icon: 'Code',
          shortcutKeys: ['mod', 'E'],
        },
      }),
    };
  },
});
