'use client';

import Heading from '@/ui/Heading';
import { motion } from 'framer-motion';
import { slideUp } from '@/lib/motion';
import Paragraph from '@/ui/Paragraph';
import Link from 'next/link';
import { buttonVariants } from '@/ui/Button';

interface Translate {
    title: string;
    subtitle: string[];
}

const Contact = ({ translate }: { translate: Translate }) => {
    return (
        <>
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={slideUp(0.05)}
                className="flex items-center gap-2 mt-6">
                <Heading size="md">{translate.title}</Heading>
                <div className="flex-1 ml-4 w-full h-px bg-accent"></div>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={slideUp(0.07)}
                className="mt-6 mb-10">
                <Paragraph className="text-muted whitespace-pre-line !leading-tight">
                    {translate.subtitle[0]}{' '}
                    <Link
                        href="/discord"
                        className={buttonVariants({ variant: 'paragraphLink' })}>
                        {translate.subtitle[1]}
                    </Link>
                    .
                </Paragraph>
            </motion.div>
        </>
    );
};

export default Contact;
