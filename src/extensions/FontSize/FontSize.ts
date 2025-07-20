import { Extension } from '@tiptap/core';

  import { DEFAULT_FONT_SIZE_LIST, DEFAULT_FONT_SIZE_VALUE } from '../../components/constants';
import type { GeneralOptions, NameValueOption } from '../../types';
import { ensureNameValueOptions } from '../../utils/utils';

import FontSizeMenuButton from './components/FontSizeMenuButton';

export {
  DEFAULT_FONT_SIZE_LIST
};

export interface FontSizeOptions extends GeneralOptions<FontSizeOptions> {
  types: string[]
  fontSizes: (string | NameValueOption)[]
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (fontSize: string) => ReturnType
      unsetFontSize: () => ReturnType
    }
  }
}

export const FontSize =  Extension.create<FontSizeOptions>({
  name: 'fontSize',
  addOptions() {
    return {
      ...this.parent?.() || {},
      types: ['textStyle'],
      fontSizes: [...DEFAULT_FONT_SIZE_LIST],
      button({editor, extension}) {
        const fontSizes = ensureNameValueOptions(extension.options?.fontSizes || DEFAULT_FONT_SIZE_VALUE);
        const defaultFontSize = ensureNameValueOptions([DEFAULT_FONT_SIZE_VALUE])[0];
        const items = fontSizes.map(k => ({
          title: k.value === defaultFontSize.value || String(k.name),
          isActive: () => {
            const { fontSize } = editor.getAttributes('textStyle');
            const isDefault = k.value === defaultFontSize.value;
            const notFontSize = fontSize === undefined;
            if (isDefault && notFontSize) {
              return true;
            }
            return editor.isActive({ fontSize: String(k.value) }) || false;
          },
          action: () => {
            if (k.value === defaultFontSize.value) {
              editor.commands.unsetFontSize();
              return;
            }
            editor.commands.setFontSize(String(k.value));
          },
          disabled: !editor.can().setFontSize(String(k.value)),
          divider: k.value === defaultFontSize.value || false,
          default: k.value === defaultFontSize.value || false,
        }));
        // const disabled = items.filter(k => k.disabled).length === items.length;
        return {
          component: FontSizeMenuButton,
          componentProps: {
            editor,
            disabled: false,
            items,
            maxHeight: 280,
          },
        };
      },
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize.replaceAll(/["']+/g, ''),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        fontSize =>
          ({ chain }) => {
            return chain().setMark('textStyle', { fontSize }).run();
          },
      unsetFontSize:
        () =>
          ({ chain }) => {
            return chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run();
          },
    };
  },
});
