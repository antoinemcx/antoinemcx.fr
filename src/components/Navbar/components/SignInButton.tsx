import { Locale } from '@/root/i18n.config';
import { buttonVariants } from '@/ui/Button';
import Link from 'next/link';

const SignInButton = ({ translate, lang }: { translate: string; lang: Locale }) => {
    return (
        <Link href={`/${lang}/login`} className={buttonVariants({ size: 'sm' })}>
            {translate}
        </Link>
    );
};

export default SignInButton;
