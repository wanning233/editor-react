import TiptapColor from '@tiptap/extension-color';
import type { ColorOptions as TiptapColorOptions } from '@tiptap/extension-color';
import ColorActiveButton from './components/ColorActiveButton';

import type { GeneralOptions } from '../../types';


export interface ColorOptions extends TiptapColorOptions, GeneralOptions<ColorOptions> {
    colors?: string[]
    defaultColor?: string
  }
export const Color = TiptapColor.extend<ColorOptions>({
  addOptions() {
    return {
       ...this.parent?.(),
       button({ editor, t ,extension }: any){
        return {
            component: ColorActiveButton,
            componentProps: {
                colors: extension?.options.colors,
                defaultColor: extension?.options.defaultColor,
                action: (color?: unknown) => {
                  if (color === undefined) {
                    editor.chain().focus().unsetColor().run();
                  }
                  if (typeof color === 'string') {
                    editor.chain().focus().setColor(color).run();
                  }
                },
                isActive: () => {
                  const { color } = editor.getAttributes('textStyle');
                  if (!color) {
                    return false;
                  }
                  return editor.isActive({ color }) || false;
                },
                editor,
                disabled: false,
                icon:"Color"
              },
        }
       }
    };
  },
});
