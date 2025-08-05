'use client';

import Link from 'next/link';
import { buttonVariants } from '@/ui/Button';
import ThemeToggle from './components/ThemeToggle';
import Logo from './components/Logo';
import SignInButton from './components/SignInButton';
import UserAccountNav from './components/UserAccountNav';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Locale } from '@/root/i18n.config';

interface Translate {
    about_me: string;
    contact_me: string;
    tools: string;
    blog: string;
    sign_in: string;
    theme_toggle: {
        sr: string;
        light: string;
        dark: string;
        system: string;
    };
    user_nav: {
        profile: string;
        sign_out: string;
    };
    admin: string;
}

function Navbar({ translate, lang }: { translate: Translate; lang: Locale }) {
    const { data: session } = useSession();

    const [open, setOpen] = useState<boolean>(false);
    const links = [
        { name: translate.about_me, href: `/${lang}/about` },
        { name: translate.contact_me, href: `/${lang}/contact` },
        { name: translate.tools, href: `/${lang}/tools` },
        { name: translate.blog, href: `/${lang}/blog` },
    ];

    const pathname = usePathname();

    return (
        <div
            className={`flex fixed ${
                !open && 'backdrop-blur-sm'
            } z-10 top-0 left-0 right-0 h-20 items-center justify-between`}>
            <div className="container mx-auto w-full flex justify-between items-center">
                <div
                    className="lg:hidden cursor-pointer z-10"
                    onClick={() => setOpen(!open)}>
                    <div
                        className={`my-[5px] w-[25px] h-[3px] bg-foreground rounded-sm transform transition-all duration-300 ${
                            open ? 'rotate-45 translate-y-2' : ''
                        }`}></div>
                    <div
                        className={`my-[5px] w-[25px] h-[3px] bg-foreground rounded-sm transition-opacity ${
                            open ? 'opacity-0' : ''
                        }`}></div>
                    <div
                        className={`my-[5px] w-[25px] h-[3px] bg-foreground rounded-sm transform transition-all duration-300 ${
                            open ? '-rotate-45 -translate-y-2' : ''
                        }`}></div>
                </div>

                <div className="flex lg:w-full lg:justify-between">
                    <Logo />

                    <div
                        className={`fixed lg:relative items-start lg:items-center space-y-4 lg:space-y-0 px-14 lg:px-0 top-0 pt-[12vh] lg:pt-0 ${
                            open ? 'left-0 h-[95vh]' : 'left-[-110vw]'
                        } w-[100vw] h-[100vh] lg:h-auto lg:w-auto left-0 lg:left-auto flex-col flex lg:gap-3 lg:flex-row backdrop-blur-md transition-all duration-300 ease-in`}>
                        {links.map((link, index) => {
                            return (
                                <Link
                                    key={index}
                                    href={link.href}
                                    className={buttonVariants({
                                        variant: 'navbarLink',
                                        className:
                                            pathname === link.href &&
                                            '!font-semibold !text-foreground',
                                        size: 'md',
                                    })}>
                                    {link.name}
                                </Link>
                            );
                        })}

                        {session && (
                            <>
                                {/* Protected pages */}
                                {session.user.role === 'ADMIN' && (
                                    <Link
                                        href="/admin"
                                        className={buttonVariants({
                                            variant: 'navbarLink',
                                            size: 'md',
                                        })}>
                                        {translate.admin}
                                    </Link>
                                )}
                            </>
                        )}

                        <div className="hidden lg:block lg:px-0 z-10">
                            <ThemeToggle translate={translate.theme_toggle} />
                        </div>

                        {session ? (
                            <div className="hidden lg:block">
                                <UserAccountNav
                                    user={session.user}
                                    lang={lang}
                                    translate={translate.user_nav}
                                />
                            </div>
                        ) : (
                            <div className="pl-6">
                                <SignInButton lang={lang} translate={translate.sign_in} />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center space-x-2 lg:hidden z-10">
                    <ThemeToggle translate={translate.theme_toggle} />
                    {session && (
                        <UserAccountNav
                            user={session.user}
                            lang={lang}
                            translate={translate.user_nav}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
