import { FC } from 'react';
import type { Metadata } from 'next';
import MiddleContainer from '@/ui/MiddleContainer';
import NotFound from './_components/NotFound';

export const metadata: Metadata = {
    title: 'Antoine Mcx | Page not found',
};

const PageNotFound: FC = () => {
    return (
        <MiddleContainer>
            <NotFound />
        </MiddleContainer>
    );
};

export default PageNotFound;
