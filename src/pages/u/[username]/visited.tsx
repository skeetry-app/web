import {FC} from 'react';

import {GetStaticPaths, GetStaticProps} from 'next/types';
import {useRouter} from 'next/router';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {linkRoutes} from '_utils/linkRoutes';
import {MOCK_USERS} from '_mocks';
import {MainLayout} from '_layouts/MainLayout';
import {Profile} from '_components/Profile';
import {NotFound} from '_components/NotFound';
import {MainTabs} from '_components/MainTabs';

const Visited: FC = () => {
    const router = useRouter();
    const {username} = router.query;
    const user = MOCK_USERS.find((u) => u.username === username);

    if (!user) {
        return (
            <MainLayout>
                <NotFound />
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Profile user={user} />
            <MainTabs linkRoutes={linkRoutes} />
            Hello
        </MainLayout>
    );
};

export default Visited;

export const getStaticProps: GetStaticProps = async ({locale}) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ['common'])),
        },
    };
};

export const getStaticPaths: GetStaticPaths<{slug: string}> = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};
