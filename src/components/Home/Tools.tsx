'use client';

import Heading from '@/ui/Heading';
import { motion } from 'framer-motion';
import { slideIn, slideUp } from '@/lib/motion';
import Badge from './components/Badge';
import vsc from '@/public/images/technos/vsc.svg';
import windows_terminal from '@/public/images/technos/windows_terminal.png';
import photoshop from '@/public/images/technos/photoshop.svg';
import wampserver from '@/public/images/technos/wampserver.svg';
import filezilla from '@/public/images/technos/filezilla.svg';

import html5 from '@/public/images/technos/html5.svg';
import css3 from '@/public/images/technos/css3.svg';
import react from '@/public/images/technos/react.svg';
import tailwindcss from '@/public/images/technos/tailwindcss.svg';
import vite from '@/public/images/technos/vite.svg';
import nodejs from '@/public/images/technos/nodejs.svg';
import javascript from '@/public/images/technos/javascript.svg';
import typescript from '@/public/images/technos/typescript.svg';
import Nextjs from '../icons/Nextjs';
import prisma from '@/public/images/technos/prisma.svg';
import mysql from '@/public/images/technos/mysql.svg';
import Express from '../icons/Express';
import git from '@/public/images/technos/git.svg';
import python from '@/public/images/technos/python.svg';
import framermotion from '@/public/images/technos/framermotion.svg';

interface Translate {
    title: string;
    software: string;
    technologies: string;
}

const Tools = ({ translate }: { translate: Translate }) => {
    return (
        <>
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={slideUp(0.05)}
                className="flex items-center gap-2 mb-14 mt-5">
                <Heading size="md">{translate.title}</Heading>
                <div className="flex-1 ml-4 w-full h-px bg-accent"></div>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={slideIn('left', 'tween', 0.1, 0.35)}>
                <div className="pb-5">
                    <Heading size="sm">{translate.software}</Heading>
                </div>

                <div className="flex flex-wrap gap-3">
                    <Badge image={vsc} name="Visual Studio Code" />
                    <Badge image={windows_terminal} name="Windows Terminal" />
                    <Badge image={photoshop} name="PhotoShop" />
                    <Badge image={wampserver} name="WampServer" />
                    <Badge image={filezilla} name="FileZilla" />
                </div>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={slideIn('left', 'tween', 0.15, 0.35)}
                className="pt-10">
                <div className="pb-5">
                    <Heading size="sm">{translate.technologies}</Heading>
                </div>

                <div className="flex flex-wrap gap-3">
                    <Badge image={html5} name="HTML5" />
                    <Badge image={css3} name="CSS3" />
                    <Badge image={react} name="React" />
                    <Badge image={tailwindcss} name="TailwindCSS" />
                    <div className="py-1 px-4 rounded-full bg-card flex gap-2">
                        <div className="text-button self-center">
                            <Nextjs height={18} width={18} color="currentColor" />
                        </div>
                        Next.js
                    </div>
                    <Badge image={vite} name="Vite" />
                    <Badge image={nodejs} name="Node.js" />
                    <Badge image={javascript} name="JavaScript" />
                    <Badge image={typescript} name="TypeScript" />
                    <Badge image={prisma} name="Prisma" />
                    <Badge image={mysql} name="MySQL" />
                    <div className="py-1 px-4 rounded-full bg-card flex gap-2">
                        <div className="text-button self-center">
                            <Express height={18} width={18} color="currentColor" />
                        </div>
                        Express
                    </div>
                    <Badge image={git} name="Git" />
                    <Badge image={python} name="Python" />
                    <Badge image={framermotion} name="Framer-Motion" />
                </div>
            </motion.div>
        </>
    );
};

export default Tools;
