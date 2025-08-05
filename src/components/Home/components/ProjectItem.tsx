import Paragraph from '@/ui/Paragraph';
import Button from '@/ui/Button';
import { ArrowLeft, Github, Globe, Link, MoveRight } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';
import { Drawer } from 'vaul';
import Heading from '@/ui/Heading';
import Badge from './Badge';
import discordImg from '@/public/images/technos/discord.svg';

interface ProjectItemProps {
    translate: {
        short_description: string;
        description: string;
    };
    src: string;
    name: string;
    website?: string;
    github?: string;
    discord?: string;
    inviteBot?: string;
    description: string;
}

const ProjectItem: FC<ProjectItemProps> = ({
    translate,
    src,
    name,
    website,
    github,
    discord,
    inviteBot,
    description,
}) => {
    return (
        <Drawer.Root>
            <Drawer.Trigger asChild>
                <button className="group relative mt-5 pt-16 px-8 pb-10 rounded-xl bg-card cursor-pointer hover:bg-cardAlt-hover hover:-translate-y-1 transition-all shadow-md text-start">
                    <Image
                        className="absolute rounded-xl -mt-7 top-0 shadow-sm bg-cardAlt-hover group-hover:bg-card"
                        src={src}
                        width={70}
                        height={70}
                        quality={95}
                        alt={name}
                    />

                    <div className="text-highlight font-medium text-2xl">{name}</div>

                    <Paragraph size="sm" className="mt-5">
                        {description}
                    </Paragraph>

                    <MoveRight className="absolute bottom-5 right-6 text-muted-hard transition-transform group-hover:scale-125 group-hover:text-muted" />
                </button>
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 z-[55] bg-black/40 dark:bg-black/50" />
                <Drawer.Content className="bg-background z-[60] flex flex-col rounded-t-[10px] h-full mt-24 mzc-h-[80%] md:max-h-full fixed bottom-0 left-0 right-0">
                    <div className="p-4 bg-background rounded-t-[10px] flex-1">
                        <div className="mx-auto w-12 md:w-16 h-1.5 flex-shrink-0 rounded-full bg-card-foreground mb-10" />
                        <div className="max-w-md md:max-w-5xl mx-auto">
                            <Drawer.Close className="hidden md:block md:mb-14 md:pt-5">
                                <Button variant="ghost" className="!pl-3">
                                    <ArrowLeft className="mr-3" /> Back to the page
                                </Button>
                            </Drawer.Close>

                            <div className="drawer-gradient z-0" />

                            <Drawer.Title className="flex gap-5 mb-8">
                                <Image
                                    className="rounded-xl shadow-sm bg-cardAlt-hover group-hover:bg-card"
                                    src={src}
                                    width={60}
                                    height={60}
                                    quality={90}
                                    alt={name}
                                    draggable={false}
                                />
                                <Heading size="md" className="self-center">
                                    {name}
                                </Heading>
                            </Drawer.Title>

                            <div className="flex gap-4 mb-16">
                                {website && (
                                    <div className="self-center text-primary">
                                        <Badge
                                            name="Website"
                                            Icon={Globe}
                                            href={website}
                                        />
                                    </div>
                                )}
                                {github && (
                                    <div className="self-center text-primary">
                                        <Badge
                                            name="GitHub"
                                            Icon={Github}
                                            href={github}
                                        />
                                    </div>
                                )}
                                {discord && (
                                    <div className="self-center">
                                        <Badge
                                            name="Discord"
                                            image={discordImg}
                                            href={discord}
                                        />
                                    </div>
                                )}
                                {inviteBot && (
                                    <div className="self-center text-primary">
                                        <Badge
                                            name="Invite the bot"
                                            Icon={Link}
                                            href={inviteBot}
                                        />
                                    </div>
                                )}
                            </div>

                            <Paragraph className="max-w-full whitespace-pre-line">
                                {translate.short_description}
                                <br />
                                {translate.description}
                            </Paragraph>

                            <Heading size="sm" className="pt-5 pb-1">
                                Preview
                            </Heading>
                            <Paragraph className="max-w-full">
                                This component can be used as a Dialog replacement on
                                mobile and tablet devices.
                            </Paragraph>

                            <Heading size="sm" className="pt-8 pb-1">
                                Story
                            </Heading>
                            <Paragraph className="mb-2 max-w-full">
                                It comes unstyled and has gesture-driven animations.
                            </Paragraph>
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
};

export default ProjectItem;
