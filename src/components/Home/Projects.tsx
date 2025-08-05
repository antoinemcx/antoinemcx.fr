'use client';

import Heading from '@/ui/Heading';
import ProjectItem from './components/ProjectItem';
import { motion } from 'framer-motion';
import { slideIn, slideUp } from '@/lib/motion';

interface Translate {
    title: string;
    meliodas: {
        short_description: string;
        description: string;
    };
    naybor: {
        short_description: string;
        description: string;
    };
    sbl: {
        short_description: string;
        description: string;
    };
    crmpt: {
        short_description: string;
        description: string;
    };
    projet_amboise: {
        short_description: string;
        description: string;
    };
}

function Projects({ translate }: { translate: Translate }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}>
            <motion.div
                variants={slideUp(0.35)}
                className="flex items-center gap-2 mb-14">
                <Heading size="md">{translate.title}</Heading>
                <div className="flex-1 ml-4 w-full h-px bg-accent"></div>
            </motion.div>

            <motion.div
                variants={slideIn('left', 'tween', 0.4, 0.35)}
                className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ProjectItem
                    translate={translate.meliodas}
                    src="https://cdn.discordapp.com/avatars/562571094947659783/10872e489314925e4c4b2ff328acb448.png"
                    name="Méliodas"
                    website="https://meliodas.antoinemcx.fr"
                    discord="https://meliodas.antoinemcx.fr/support"
                    inviteBot="https://meliodas.antoinemcx.fr/invite"
                    description={translate.meliodas.short_description}
                />
                <ProjectItem
                    translate={translate.naybor}
                    src="https://cdn.discordapp.com/avatars/793213992910585898/b563c0464256bdbf72a4751363f48f07.png"
                    name="Naybor"
                    github="https://github.com/antoinemcx/naybor"
                    discord="https://antoinemcx.fr/discord"
                    description={translate.naybor.short_description}
                />
                <ProjectItem
                    translate={translate.sbl}
                    src="https://cdn.discordapp.com/icons/863026585304432690/ee1a092edcdd9f8d11caf66f3bf2bb9e.webp"
                    name="StellarBotList.com"
                    website="https://stellarbotlist.com"
                    discord="https://stellarbotlist.com/discord"
                    description={translate.sbl.short_description}
                />

                <ProjectItem
                    translate={translate.crmpt}
                    src="https://cdn.discordapp.com/icons/1132049198708162702/00f72ac3e7b49089ff79774a7d78aff3.webp"
                    name="Crmpt.fr"
                    website="https://crmpt.fr"
                    discord="https://crmpt.fr/discord"
                    description={translate.crmpt.short_description}
                />
                <ProjectItem
                    translate={translate.projet_amboise}
                    src="https://projet-amboise.fr/img/logo.png"
                    name="Projet-Amboise.fr"
                    website="https://projet-amboise.fr"
                    github="https://github.com/antoinemcx/projet-amboise"
                    discord="https://projet-amboise.fr/discord"
                    description={translate.projet_amboise.short_description}
                />
            </motion.div>
        </motion.div>
    );
}

export default Projects;
