'use client';

import { buttonVariants } from '@/ui/Button';
import Heading from '@/ui/Heading';
import Paragraph from '@/ui/Paragraph';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

const NotFound: FC = () => {
    const pathname = usePathname();

    let lang = 'en';
    let translate = {
        title: 'Not found...',
        back_to_home: 'Back to home',
        message: "The page you're looking for does not exist.",
    };
    if (pathname.startsWith('/fr')) {
        lang = 'fr';
        translate = {
            title: 'Non trouvé...',
            back_to_home: "Retour à l'accueil",
            message: "La page que vous recherchez n'existe pas.",
        };
    }

    return (
        <div className="max-w-7xl flex flex-col gap-5">
            <Link
                className={`mb-10 ${buttonVariants({
                    variant: 'outline',
                    className: 'w-fit',
                })}`}
                href={`/${lang}/`}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                {translate.back_to_home}
            </Link>

            <Heading>{translate.title}</Heading>
            <Paragraph>{translate.message}</Paragraph>
        </div>
    );
};

export default NotFound;
