'use client';

import Button, { buttonVariants } from '@/ui/Button';
import Heading from '@/ui/Heading';
import Paragraph from '@/ui/Paragraph';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import MiddleContainer from '@/ui/MiddleContainer';
import { usePathname } from 'next/navigation';

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
    const pathname = usePathname();

    let lang = 'en';
    let translate = {
        title: 'There was a problem...',
        default_message: 'Something went wrong',
        back_to_home: 'Back to home',
        try_again: 'Try again',
    };
    if (pathname.startsWith('/fr')) {
        lang = 'fr';
        translate = {
            title: 'Il y a eu un problème...',
            default_message: 'Quelque chose a mal tourné',
            back_to_home: "Retour à l'accueil",
            try_again: 'Réessayer',
        };
    }

    return (
        <MiddleContainer>
            <div>
                <Heading size="md" className="mb-2">
                    {translate.title}
                </Heading>
                <Paragraph size="lg">
                    {error.message || translate.default_message}
                </Paragraph>

                <div className="flex sm:flex-row flex-col gap-5 mt-8">
                    <Link
                        className={buttonVariants({
                            variant: 'outline',
                            className: 'w-auto',
                        })}
                        href={`/${lang}/`}>
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        {translate.back_to_home}
                    </Link>
                    <Button onClick={reset}>{translate.try_again}</Button>
                </div>
            </div>
        </MiddleContainer>
    );
};

export default Error;
