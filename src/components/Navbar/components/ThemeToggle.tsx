'use client';

import { useTheme } from 'next-themes';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/ui/DropdownMenu';
import Button from '@/ui/Button';
import { Laptop, Moon, Sun } from 'lucide-react';

interface Translate {
    sr: string;
    light: string;
    dark: string;
    system: string;
}

const ThemeToggle = ({ translate }: { translate: Translate }) => {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="px-0 pl-4" variant="link" size="sm">
                    <Sun className="rotate-0 scale-100 transition-all hover:text-foreground dark:-rotate-90 dark:scale-0 dark:text-paragraph dark:opacity-90" />
                    <Moon className="absolute rotate-90 scale-0 transition-all dark:hover:text-foreground dark:rotate-0 dark:scale-100 dark:text-paragraph dark:opacity-90" />
                    <span className="sr-only">{translate.sr}</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" forceMount>
                <DropdownMenuItem onClick={() => setTheme('light')}>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>{translate.light}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>{translate.dark}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                    <Laptop className="mr-2 h-4 w-4" />
                    <span>{translate.system}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ThemeToggle;
