'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
    PresentationChartLineIcon,
    TicketIcon
  } from "@heroicons/react/24/solid";

const links = [
    {
        name: 'Dashboard',
        href: '/',
        icon: PresentationChartLineIcon,
    },
    {
        name: 'Tickets',
        href: '/tickets',
        icon: TicketIcon,
    },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                const isActive = pathname === link.href;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex h-10 items-center justify-start gap-1 p-3 rounded-md',
                            {
                                'bg-gray-300 dark:bg-gray-600': isActive,
                                'hover:bg-gray-200 dark:hover:bg-gray-800': !isActive,
                            },
                        )}
                    >
                        <LinkIcon className="w-5" />
                        <p className="block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}