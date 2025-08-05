import { HTMLAttributes, forwardRef } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const paragraphVariants = cva('!text-paragraph mb-2', {
    variants: {
        size: {
            default: 'text-base sm:text-lg',
            sm: 'text-sm, sm:text-base',
            lg: 'text-3xl leading-10',
            xl: 'text-[34px] leading-10',
        },
    },
    defaultVariants: {
        size: 'default',
    },
});

interface ParagraphProps
    extends HTMLAttributes<HTMLParagraphElement>,
        VariantProps<typeof paragraphVariants> {}

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
    ({ className, size, children, ...props }, ref) => {
        return (
            <p
                ref={ref}
                {...props}
                className={cn(paragraphVariants({ size, className }))}>
                {children}
            </p>
        );
    }
);

Paragraph.displayName = 'Paragraph';

export default Paragraph;
