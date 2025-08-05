import { HTMLAttributes, forwardRef } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const headingVariants = cva('text-highlight text-left leading-tight tracking-tighter', {
    variants: {
        size: {
            'default': 'text-3xl md:text-7xl lg:text-5xl font-extrabold',
            '2xl': 'text-5xl md:text-6xl lg:text-[5rem] font-extrabold',
            'xl': 'text-5xl md:text-6xl lg:text-7xl font-extrabold',
            'lg': 'text-4xl md:text-5xl lg:text-6xl font-extrabold',
            'md': 'text-3xl md:text-[2rem] lg:text-[2.5rem] font-bold',
            'sm': 'text-xl md:text-2xl lg:text-3xl font-medium',
        },
    },
    defaultVariants: {
        size: 'default',
    },
});

interface HeadingProps
    extends HTMLAttributes<HTMLHeadingElement>,
        VariantProps<typeof headingVariants> {}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
    ({ className, size, children, ...props }, ref) => {
        return (
            <h1 ref={ref} {...props} className={cn(headingVariants({ size, className }))}>
                {children}
            </h1>
        );
    }
);

Heading.displayName = 'Heading';

export default Heading;
