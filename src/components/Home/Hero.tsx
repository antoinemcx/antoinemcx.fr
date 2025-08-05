'use client';

import Heading from '@/ui/Heading';
import Paragraph from '@/ui/Paragraph';
import SocialIcons from './components/SocialIcons';
import { motion } from 'framer-motion';
import { slideUp } from '@/lib/motion';
import { useEffect, useState } from 'react';

interface Translate {
    heading: string;
    alt_heading: string[];
}

function Hero({ translate }: { translate: Translate }) {
    const [isHovered, setIsHovered] = useState(false);

    /* Remove wave animation class after it has been played */
    useEffect(() => {
        if (isHovered) {
            const timeout = setTimeout(() => setIsHovered(false), 1500); // "wave" duration
            return () => clearTimeout(timeout);
        }
    }, [isHovered]);

    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="relative min-h-[70vh] flex items-center">
            <div className="h-full">
                <motion.div variants={slideUp(0)}>
                    <Heading size="lg">
                        {translate.heading}
                        <motion.span
                            className={`ml-2 inline-block origin-[70%_70%] ${
                                isHovered ? 'animate-wave' : ''
                            }`}
                            onHoverStart={() => setIsHovered(true)}
                            onHoverEnd={() => setIsHovered(false)}
                            whileInView={{ opacity: 1 }}
                            onViewportEnter={() => setIsHovered(true)}>
                            👋
                        </motion.span>
                    </Heading>

                    <Paragraph size="lg" className="pt-6">
                        {translate.alt_heading[0]}
                        <br />
                        {translate.alt_heading[1]}
                    </Paragraph>
                </motion.div>

                <motion.div variants={slideUp(0.2)} className="flex gap-4 pt-14">
                    <SocialIcons />
                </motion.div>
            </div>
        </motion.div>
    );
}

export default Hero;
