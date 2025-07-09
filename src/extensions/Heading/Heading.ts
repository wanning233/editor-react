import { Heading as TiptapHeading } from '@tiptap/extension-heading';
import type { HeadingOptions as TiptapHeadingOptions } from '@tiptap/extension-heading';
import { HeadingButton } from './components/HeadingButton';

import type { GeneralOptions } from '@/types'; 
export interface HeadingOptions extends TiptapHeadingOptions,GeneralOptions<HeadingOptions>{}


export const Heading = TiptapHeading.extend<HeadingOptions>({
    addOptions() {
        return {
            ...this.parent?.(),
            button({ editor, extension }:any){
                const levels = extension?.options?.levels || [1, 2, 3, 4, 5, 6]

                const items = levels.map((level:number) => {
                    return {
                        action: () => editor.commands.toggleHeading({ level }),
                        isActive: () => editor.isActive('heading', { level }),
                        disabled: !editor.can().toggleHeading({ level }),
                        icon: 'Heading',
                        shortcutKeys: ['mod', 'alt', level],
                    }
                })
                const disable = items.filter((k:any) =>k.disabled).length === items.length
                return {
                    component: HeadingButton,
                    componentProps: {
                        items,
                        disable,
                    }
                }
            }
        }
    }
});
