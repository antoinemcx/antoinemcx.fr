import Link from 'next/link';
import { FC } from 'react';
import Github from '@/components/icons/Github';
import Discord from '@/components/icons/Discord';
import Mail from '@/components/icons/Mail';
import X from '@/components/icons/X';

const SocialIcons: FC = () => {
    return (
        <>
            <Link
                className="self-center text-muted-hard hover:text-paragraph hover:rotate-6 transition-colors"
                href="/discord"
                target="_blank">
                <Discord height={29} width={29} color="currentColor" />
            </Link>
            <Link
                className="self-center text-muted-hard hover:text-paragraph hover:rotate-6 transition-colors"
                href="/github"
                target="_blank">
                <Github height={26} width={26} color="currentColor" />
            </Link>
            <Link
                className="self-center text-muted-hard hover:text-paragraph hover:rotate-6 transition-colors"
                href="mailto:contact@antoinemcx.fr"
                target="_blank">
                <Mail height={29} width={29} color="currentColor" />
            </Link>
            <Link
                className="self-center text-muted-hard hover:text-paragraph hover:rotate-6 transition-colors"
                href="/x"
                target="_blank">
                <X height={24} width={24} color="currentColor" />
            </Link>
        </>
    );
};

export default SocialIcons;
