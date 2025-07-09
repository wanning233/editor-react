import TiptapTextAlign from '@tiptap/extension-text-align';
import type { TextAlignOptions as TiptapTextAlignOptions } from '@tiptap/extension-text-align';
import type { GeneralOptions } from '../../types';

type Align = 'left' | 'center' | 'right' | 'justify'

export interface TextAlignOptions extends TiptapTextAlignOptions,GeneralOptions<Align> {
    align: Align
}

export const TextAlign = TiptapTextAlign.extend<TextAlignOptions>({
    addOptions() {
        return {
            ...this.parent?.(),
            button: {
                
                component: TextAlignButton,
                componentProps: {
                    items: this.options.items,
                    disable: this.options.disable,
                }
            }
        }
    }
})
