import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        mode: 'dark',
    }
});

export const tierColors = {
    "S+": '#e50049',
    "S": '#e62536',
    "S-": '#e43b22',
    "A+": '#df4e00',
    "A": '#d76000',
    "A-": '#cd7000',
    "B+": '#c07e00',
    "B": '#b08b00',
    "B-": '#9f9800',
    "C+": '#8aa300',
    "C": '#71ad00',
    "C-": '#50b600',
    "F": '#00bf1e'
};

export const PATH = 'media-scoring-website';
export const TIER_KEY = 'ADMIN_TIERS.json';
export const TIER_LIST_KEY = 'ADMIN_TIER_LIST.json';
export const RUBRIC_KEY = 'ADMIN_RUBRIC.json';
export const ORDER_KEY = 'ADMIN_ORDER.json';
export const ADMIN_KEY = 'ADMIN_';
export const types = ['anime', 'manga', 'tv-shows', 'books'];
export const adminColumns = ['Title', 'Score', 'Tier', 'Image'];