import type { NavLink } from "../types";

export const NAV_LINKS: NavLink[] = [
    { href: "/", label: "About", isActive: true },
    { href: "/cv", label: "CV", isActive: true },
    { href: "/projects", label: "Code", isActive: true },
    { href: "/publications", label: "Publications", isActive: true },
    { href: "/posts", label: "Posts", isActive: true },
    { href: "/talks", label: "Talks", isActive: false },
    { href: "/teaching", label: "Teaching", isActive: false },
    { href: "/tags", label: "Tags", isActive: false },
];
