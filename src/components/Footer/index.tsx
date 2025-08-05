import Paragraph, { paragraphVariants } from '@/ui/Paragraph';
import Link from 'next/link';

const Footer = ({ translate }: { translate: { legal_info: string } }) => {
    return (
        <div className="relative bottom-0 pt-36 pb-6">
            <div className="gradient-bottom z-0" />
            <div className="container flex justify-between">
                <Paragraph className="!text-muted">© 2023 Antoine</Paragraph>
                <Link
                    href="/legal"
                    className={paragraphVariants({
                        className:
                            'hover:underline hover:underline-offset-4 hover:!text-paragraph-hover active:scale-95',
                    })}>
                    {translate.legal_info}
                </Link>
            </div>
        </div>
    );
};

export default Footer;
