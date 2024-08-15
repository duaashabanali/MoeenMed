"use client"
import { sidebarOptions } from '@/utils/constant';
import Image from 'next/image';
import Link from 'next/link';
import React, { PropsWithChildren, useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useCookies } from 'next-client-cookies';
import { useRouter, usePathname } from 'next/navigation'
import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from '@/lib/graphql/queries/GetUserProfile';

interface SidebarProps extends PropsWithChildren { }

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    const {data}=useQuery(GET_USER_PROFILE);
    const {getUserProfile}=data || {}
    console.log(data,"dauser")
    const cookies = useCookies();
    const router = useRouter()
    const pathname = usePathname()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        cookies.remove('token');
        cookies.remove('userInfo');
        router.replace("/login");
    }

    const tabClasses = "flex gap-1 items-center p-4 text-white font-medium font-poppins text-base";
    const activeTabClasses = "border-l-[6px] border-purple bg-[url('/tab_active_bg.png')] bg-no-repeat";
    const combinedClasses = clsx(tabClasses, activeTabClasses);

    return (
        <>
            <nav className="bg-[url('/navbar_bg.png')] bg-no-repeat fixed top-0 z-50 w-full">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button
                                data-drawer-target="logo-sidebar"
                                data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    ></path>
                                </svg>
                            </button>
                            <Image src="/LogoTransparent.png" className="me-3" width={145} height={32} alt="logo" />
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3 relative">
                                <div>
                                    <button
                                        type="button"
                                        className="flex items-center gap-2 font-poppins rounded-full focus:ring-2 focus:ring-purple"
                                        aria-expanded={isDropdownOpen}
                                        onClick={toggleDropdown}
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        <Image
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                            src="/user_avata.png"
                                            alt="user photo"
                                        />
                                        <p className="text-sm text-white font-medium " role="none">
                                            {getUserProfile?.fullName}
                                        </p>
                                        <Image
                                            width={18}
                                            height={18}
                                            src="/down_arrow.png"
                                            alt="down_arrow"
                                        />
                                    </button>
                                </div>
                                {isDropdownOpen && (
                                    <div
                                        ref={dropdownRef}
                                        className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow absolute right-0 top-full mt-2"
                                        id="dropdown-user"
                                    >
                                        <div className="px-4 py-3" role="none">
                                            <p className="text-sm font-medium text-gray-900 truncate" role="none">
                                                {getUserProfile?.email}
                                            </p>
                                        </div>
                                        <ul className="py-1" role="none">
                                            <li>
                                                <button type="button" onClick={handleLogout} className="font-medium block px-4 py-2 text-sm text-gray-600 hover:bg-purple hover:text-white w-full text-start" role="menuitem">
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside
                id="logo-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full sm:translate-x-0 bg-[url('/sidebar_bg.png')] bg-no-repeat"
                aria-label="Sidebar"
            >
                <div className="h-full pb-4 overflow-y-auto bg-white bg-[url('/sidebar_bg.png')] bg-no-repeat">
                    <ul className="space-y-2">
                        {sidebarOptions.map((sidebarTab, index) => (
                            <li key={index}>
                                <Link
                                    href={sidebarTab.url}
                                    className={pathname === sidebarTab.url ? combinedClasses : tabClasses}
                                >
                                    <Image src={sidebarTab.img} alt={sidebarTab.name} width={16} height={16} className="ml-2" />
                                    <span className="ms-3">{sidebarTab.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-64">
                <div className="p-4 rounded-lg mt-14 text-white">
                    {children}
                </div>
            </div>
        </>
    );
};

export default Sidebar;
