import Image from 'next/image';
import { FC } from 'react';
import { ExternalLink, LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface BadgeProps {
    image?: any;
    Icon?: LucideIcon;
    name: string;
    href?: string;
}

const Badge: FC<BadgeProps> = ({ image, Icon, name, href }) => {
    return href ? (
        <Link href={href} target="_blank" className="group cursor-pointer">
            <div className="py-1 px-4 rounded-full bg-card flex gap-2">
                <div className="self-center">
                    {Icon ? (
                        <Icon height={20} className="-mr-1" />
                    ) : (
                        <Image
                            src={image}
                            alt={name}
                            height={18}
                            width={18}
                            draggable={false}
                        />
                    )}
                </div>
                <span className="text-highlight">{name}</span>

                <ExternalLink
                    height={19}
                    className="self-center text-muted group-hover:text-paragraph group-hover:transition-all group-hover:scale-105"
                />
            </div>
        </Link>
    ) : (
        <div className="py-1 px-4 rounded-full bg-card flex gap-2">
            <div className="self-center">
                {Icon ? (
                    <Icon height={20} className="-mr-1" />
                ) : (
                    <Image
                        src={image}
                        alt={name}
                        height={18}
                        width={18}
                        draggable={false}
                    />
                )}
            </div>
            {name}
        </div>
    );
};

export default Badge;
