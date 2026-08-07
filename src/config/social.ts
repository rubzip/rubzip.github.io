import type { SocialLink } from "../types";

export const SOCIALS: SocialLink[] = [
    {
        name: "Github",
        href: "https://github.com/rubzip",
        linkTitle: `Follow Rubén Gijón on Github`,
        isActive: true,
    },
    {
        name: "Mail",
        href: "mailto:ruben.gijon@usc.es",
        linkTitle: `Send an email to Rubén Gijón`,
        isActive: true,
    },
    {
        name: "ORCID",
        href: "https://orcid.org/0009-0000-3378-7979",
        linkTitle: `Rubén Gijón on ORCID`,
        isActive: true,
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/ruben-gijon-canete/?locale=en_US",
        linkTitle: `Rubén Gijón on LinkedIn`,
        isActive: true,
    },
];

export const SOCIAL_ICONS: Record<string, string> = {
    Github: "Github",
    Mail: "Mail",
    Linkedin: "LinkedIn",
    ORCID: "ORCID",
    RSS: "RSS",
};
