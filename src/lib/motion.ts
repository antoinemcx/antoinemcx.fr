export const slideIn = (
    direction: 'left' | 'right' | 'up' | 'down',
    type: 'tween' | 'spring' | 'inertia',
    delay: number,
    duration: number
) => ({
    hidden: {
        opacity: 0,
        x: direction === 'left' ? '-15%' : direction === 'right' ? '15%' : 0,
        y: direction === 'up' ? '15%' : direction === 'down' ? '15%' : 0,
    },
    show: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
            type,
            delay,
            duration,
            ease: 'easeOut',
        },
    },
});

export const slideUp = (delay: number) => ({
    hidden: {
        y: 25,
        opacity: 0,
    },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            duration: 1,
            delay,
        },
    },
});

export const fadeIn = (
    direction: 'left' | 'right' | 'up' | 'down',
    type: 'tween' | 'spring' | 'inertia',
    delay: number,
    duration: number
) => ({
    hidden: {
        x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
        y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
        opacity: 0,
    },
    show: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
            type,
            delay,
            duration,
            ease: 'easeOut',
        },
    },
});
