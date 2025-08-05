import Footer from '@/components/Footer/index';
import Hero from '@/components/Home/Hero';
import Projects from '@/components/Home/Projects';
import Tools from '@/components/Home/Tools';
import Contact from '@/components/Home/Contact';

import { Locale } from '@/root/i18n.config';
import { getLanguage } from '@/lib/language';

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
    const { Index, Footer: FooterTranslate } = await getLanguage(lang);

    return (
        <>
            <div className="container">
                <Hero translate={Index.Hero} />

                <div className="pt-4">
                    <Projects translate={Index.Projects} />
                </div>

                <div className="pt-28">
                    <Tools translate={Index.Tools} />
                </div>

                <div className="pt-28">
                    <Contact translate={Index.Contact} />
                </div>
            </div>

            <Footer translate={FooterTranslate} />
        </>
    );
}
