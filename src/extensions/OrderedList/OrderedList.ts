import type { OrderedListOptions as TiptapOrderedListOptions } from '@tiptap/extension-ordered-list';
import { OrderedList as TiptapOrderedList } from '@tiptap/extension-ordered-list';

import { ActiveButton } from '../../components/ActiveButton';
import type { GeneralOptions } from '../../types';
export interface OrderedListOptions
  extends TiptapOrderedListOptions,
  GeneralOptions<OrderedListOptions> {}

export const OrderedList =  TiptapOrderedList.extend<OrderedListOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        component: ActiveButton,
        componentProps: {
          action: () => editor.commands.toggleOrderedList(),
          isActive: () => editor.isActive('orderedList') || false,
          disabled: false,
          icon: 'ListOrdered',
          shortcutKeys: ['mod', 'shift', '7'],
        },
      }),
    };
  },
});
