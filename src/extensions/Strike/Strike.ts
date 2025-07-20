import type { StrikeOptions as TiptapStrikeOptions } from '@tiptap/extension-strike';
import { Strike as TiptapStrike } from '@tiptap/extension-strike';

import { ActiveButton } from '../../components/ActiveButton';
import type { GeneralOptions } from '@/types';

export interface StrikeOptions extends TiptapStrikeOptions, GeneralOptions<StrikeOptions> {}

export const Strike = TiptapStrike.extend<StrikeOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor }: any) => ({
        component: ActiveButton,
        componentProps: {
          action: () => editor.commands.toggleStrike(),
          isActive: () => editor.isActive('strike') || false,
          disabled: false,
          icon: 'Strike',
          shortcutKeys: ['shift', 'mod', 'S'],
        },
      }),
    };
  },
});
