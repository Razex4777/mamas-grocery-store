import type { SlideData, AnimationConfig } from './types';

export const SLIDES: SlideData[] = [
    {
        id: 1,
        headline: "PRODUIT MAROCAIN",
        subtitle: "LES DÉLICES AUTHENTIQUES DU GRAND MAGHREB",
        imageSrc: "/hero_form/moroccan-tagine.png",
        imageAlt: "Moroccan Tagine dish"
    },
    {
        id: 2,
        headline: "PRODUIT ALGERIEN",
        subtitle: "LES DÉLICES AUTHENTIQUES DU GRAND MAGHREB",
        imageSrc: "/hero_form/algerian-chakchouka.png",
        imageAlt: "Algerian Chakchouka dish"
    },
    {
        id: 3,
        headline: "PRODUIT TUNISIEN",
        subtitle: "LES DÉLICES AUTHENTIQUES DU GRAND MAGHREB",
        imageSrc: "/hero_form/tunisian-couscous.png",
        imageAlt: "Tunisian Seafood Couscous dish"
    }
];

export const ANIMATION_CONFIG: AnimationConfig = {
    slideTransition: {
        duration: 0.6,
        ease: "easeInOut"
    },
    textStagger: {
        delayChildren: 0,
        staggerChildren: 0.1
    },
    textEntrance: {
        initial: { x: 100, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { duration: 0.4, ease: "easeOut" }
    }
};

export const DEFAULT_AUTO_PLAY_INTERVAL = 4000;
export const DEFAULT_TRANSITION_DURATION = 600;