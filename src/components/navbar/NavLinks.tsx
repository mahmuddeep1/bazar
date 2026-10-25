import React from 'react';
import { cacheLife } from 'next/cache';
import Marquee from './Marquee';
import NavLinksClient from './NavLinksClient';

interface Navs {
    id: string;
    slug: string;
    icon: string;
    nameBn: string;
    url: string;
}

// ক্যাটেগরি ডেটা cache করা হচ্ছে, তাই prerender এর সময় আটকাবে না
async function getCategories(): Promise<Navs[]> {
    "use cache";
    cacheLife("hours");

    const response = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");
    if (!response.ok) return [];
    return response.json();
}

const NavLinks = async () => {
    const data = await getCategories();

    return (
        <div>
            <NavLinksClient data={data} />
            <Marquee />
        </div>
    );
};

export default NavLinks;