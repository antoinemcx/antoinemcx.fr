import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { i18n } from '@/root/i18n.config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales;
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

    const locale = matchLocale(languages, locales, i18n.defaultLocale);
    return locale;
}

const privatePages: string[] = ['/profile', '/admin'];

const authMiddleware = withAuth(
    async function onSuccess(req) {
        const pathname = req.nextUrl.pathname;

        // Route protection
        const token = await getToken({ req });
        const isAuth = !!token;

        const isAuthPage =
            pathname.startsWith(`/${i18n.locales[0]}/login`) ||
            pathname.startsWith(`/${i18n.locales[1]}/login`) ||
            pathname.startsWith(`/${i18n.locales[0]}/register`) ||
            pathname.startsWith(`/${i18n.locales[1]}/register`);

        if (isAuthPage) {
            if (isAuth) {
                return NextResponse.redirect(new URL('/', req.url));
            }
        }

        const privatePathnameRegex = RegExp(
            `^(/(${i18n.locales.join('|')}))?(${privatePages.join('|')})?/?$`,
            'i'
        );
        const isPrivatePage = privatePathnameRegex.test(pathname);

        if (isPrivatePage && !isAuth) {
            return NextResponse.redirect(new URL('/login', req.url));
        }

        return null;
    },
    {
        callbacks: {
            authorized: ({ token }) => token != null,
        },
        pages: {
            signIn: '/login',
        },
    }
);

export default function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);
        return NextResponse.redirect(
            new URL(
                `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
                request.url
            )
        );
    }

    (authMiddleware as any)(request);
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icon.png|images/).*)'],
};
