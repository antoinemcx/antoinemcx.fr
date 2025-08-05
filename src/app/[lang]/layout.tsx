import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '@/components/Providers';
import Navbar from '@/components/Navbar/index';
import { Toaster } from '@/ui/Toaster';

import { Locale, i18n } from '@/root/i18n.config';
import { getLanguage } from '@/lib/language';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Antoine Mcx',
    description: 'Generated boilerplate for Next.js',
};

export async function generateStaticParams() {
    return i18n.locales.map((locale: Locale) => ({ lang: locale }));
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { lang: Locale };
}) {
    const { Navbar: NavbarTranslate } = await getLanguage(params.lang);

    return (
        <html
            lang={params.lang}
            className={`antialiased scroll-smooth ${inter.className}`}>
            <body className="min-h-screen bg-background antialiased">
                <Providers>
                    <Navbar lang={params.lang} translate={NavbarTranslate} />

                    <section>
                        <div className="gradient-top z-0" />
                        {children}
                    </section>
                </Providers>

                <Toaster />

                {/* Space on mobile devices for more height */}
                <div className="h-5 md:hidden" />
            </body>
        </html>
    );
}
