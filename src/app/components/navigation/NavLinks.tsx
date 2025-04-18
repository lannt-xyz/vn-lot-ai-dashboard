'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
    {
        name: 'Dashboard',
        href: '/',
        // icon: Users,
    },
    {
        name: 'Tickets',
        href: '/tickets',
        // icon: LanguageSetting,
    },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <>
            {links.map((link) => {
                // const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex h-10 items-center justify-start gap-1 p-3 hover:bg-gray-200 rounded-md',
                            {
                                'bg-gray-300': pathname === link.href,
                            },
                        )}
                    >
                        {/* <LinkIcon className="w-5" /> */}
                        <p className="block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}