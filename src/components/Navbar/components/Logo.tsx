import Link from 'next/link';
import { FC } from 'react';
import LogoIcon from '@/components/icons/LogoIcon';

const Logo: FC = () => {
    return (
        <div className="active:scale-95 inline-flex items-center justify-center z-10">
            <Link
                href="/"
                className="flex h-9 self-center text-highlight hover:text-highlight transition-colors">
                <LogoIcon height={36} width={36} color="currentColor" />
            </Link>
        </div>
    );
};

export default Logo;
