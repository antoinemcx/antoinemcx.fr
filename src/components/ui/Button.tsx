import { VariantProps, cva } from 'class-variance-authority';
import { ButtonHTMLAttributes, FC, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export const buttonVariants = cva(
    'active:scale-95 hover:transition-colors inline-flex items-center justify-center transition-color focus:outline-none focus-ring-2 focus:ring-muted focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-muted disabled:pointer-events-none dark:focus:ring-offset-slate-900',
    {
        variants: {
            variant: {
                default:
                    'bg-button text-background hover:bg-buttonHover uppercase font-medium md:font-bold hover:scale-105 transition-transform duration-200',
                outline:
                    'hover:bg-accent text-button border-2 border-button uppercase font-medium md:font-bold hover:scale-105 transition-transform duration-200',
                ghost: 'bg-transparent hover:bg-accent text-paragraph opacity-90 hover:opacity-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent font-medium',
                link: 'bg-transparent py-0 h-auto hover:text-foreground text-paragraph opacity-90 hover:opacity-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent font-medium',
                paragraphLink:
                    '!text-lg bg-transparent py-0 !px-0 h-auto text-primary hover:text-primaryHover hover:underline hover:underline-offset-4 font-medium',
                navbarLink:
                    'bg-transparent hover:text-foreground text-paragraph opacity-90 hover:opacity-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent font-medium',
            },
            size: {
                default: 'h-10 py-2 px-6 rounded-full text-[15px]',
                sm: 'h-9 px-5 rounded-full text-sm',
                md: 'h-11 lg:h-10 py-2 px-[18px] rounded-full text-xl md:text-lg',
                lg: 'h-11 px-8 rounded-full text-lg',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
}

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, children, variant, isLoading, size, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={isLoading}
                {...props}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
