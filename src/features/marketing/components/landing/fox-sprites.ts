function svgToDataUri(svg: string) {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const FOX_SIT = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <polygon points="8,8 11,3 14,8" fill="#d97706"/>
  <polygon points="9.5,7 11,4.5 12.5,7" fill="#451a03"/>
  <polygon points="18,8 21,3 24,8" fill="#d97706"/>
  <polygon points="19.5,7 21,4.5 22.5,7" fill="#451a03"/>
  <ellipse cx="16" cy="12" rx="8" ry="6" fill="#f59e0b"/>
  <ellipse cx="16" cy="18" rx="7" ry="6" fill="#f59e0b"/>
  <ellipse cx="16" cy="19" rx="5" ry="4" fill="#fef3c7"/>
  <circle cx="13" cy="10" r="1.2" fill="#1c1917"/>
  <circle cx="19" cy="10" r="1.2" fill="#1c1917"/>
  <circle cx="13.3" cy="9.7" r="0.4" fill="white"/>
  <circle cx="19.3" cy="9.7" r="0.4" fill="white"/>
  <ellipse cx="16" cy="12.5" rx="1.2" ry="0.8" fill="#292524"/>
  <rect x="11" y="23" width="3" height="4" rx="1" fill="#d97706"/>
  <rect x="18" y="23" width="3" height="4" rx="1" fill="#d97706"/>
  <path d="M7,16 Q3,20 5,24" stroke="#f59e0b" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M5.5,23.5" r="1.5" fill="#fef3c7"/>
  <circle cx="5" cy="24" r="1.5" fill="#fef3c7"/>
</svg>`);

const FOX_SIT2 = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <polygon points="8,8 11,3 14,8" fill="#d97706"/>
  <polygon points="9.5,7 11,4.5 12.5,7" fill="#451a03"/>
  <polygon points="18,8 21,3 24,8" fill="#d97706"/>
  <polygon points="19.5,7 21,4.5 22.5,7" fill="#451a03"/>
  <ellipse cx="16" cy="12" rx="8" ry="6" fill="#f59e0b"/>
  <ellipse cx="16" cy="18" rx="7" ry="6" fill="#f59e0b"/>
  <ellipse cx="16" cy="19" rx="5" ry="4" fill="#fef3c7"/>
  <circle cx="13" cy="10" r="1.2" fill="#1c1917"/>
  <circle cx="19" cy="10" r="1.2" fill="#1c1917"/>
  <circle cx="13.3" cy="9.7" r="0.4" fill="white"/>
  <circle cx="19.3" cy="9.7" r="0.4" fill="white"/>
  <ellipse cx="16" cy="12.5" rx="1.2" ry="0.8" fill="#292524"/>
  <rect x="11" y="23" width="3" height="4" rx="1" fill="#d97706"/>
  <rect x="18" y="23" width="3" height="4" rx="1" fill="#d97706"/>
  <path d="M7,16 Q3,21 5,25" stroke="#f59e0b" stroke-width="3" fill="none" stroke-linecap="round"/>
  <circle cx="5" cy="25" r="1.5" fill="#fef3c7"/>
</svg>`);

const FOX_CLING1 = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <polygon points="7,6 10,1 13,6" fill="#d97706"/>
  <polygon points="19,6 22,1 25,6" fill="#d97706"/>
  <rect x="9" y="0" width="3" height="5" rx="1" fill="#d97706"/>
  <rect x="20" y="0" width="3" height="5" rx="1" fill="#d97706"/>
  <ellipse cx="16" cy="10" rx="8" ry="6" fill="#f59e0b"/>
  <ellipse cx="16" cy="17" rx="6" ry="5" fill="#f59e0b"/>
  <ellipse cx="16" cy="18" rx="4" ry="3" fill="#fef3c7"/>
  <circle cx="13" cy="9" r="1.5" fill="#1c1917"/>
  <circle cx="19" cy="9" r="1.5" fill="#1c1917"/>
  <circle cx="13.4" cy="8.6" r="0.5" fill="white"/>
  <circle cx="19.4" cy="8.6" r="0.5" fill="white"/>
  <ellipse cx="16" cy="11.5" rx="1.5" ry="1" fill="#292524"/>
  <path d="M14,12.5 Q16,14 18,12.5" stroke="#292524" stroke-width="0.5" fill="none"/>
  <rect x="10" y="21" width="3" height="5" rx="1" fill="#d97706"/>
  <rect x="19" y="21" width="3" height="5" rx="1" fill="#d97706"/>
  <path d="M8,14 Q4,18 6,22" stroke="#f59e0b" stroke-width="3" fill="none" stroke-linecap="round"/>
  <circle cx="6" cy="22" r="1.5" fill="#fef3c7"/>
</svg>`);

const FOX_CLING2 = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <polygon points="7,6 10,1 13,6" fill="#d97706"/>
  <polygon points="19,6 22,1 25,6" fill="#d97706"/>
  <rect x="8" y="0" width="3" height="4" rx="1" fill="#d97706"/>
  <rect x="21" y="0" width="3" height="4" rx="1" fill="#d97706"/>
  <ellipse cx="16" cy="10" rx="8" ry="6" fill="#f59e0b"/>
  <ellipse cx="16" cy="17" rx="6" ry="5" fill="#f59e0b"/>
  <ellipse cx="16" cy="18" rx="4" ry="3" fill="#fef3c7"/>
  <circle cx="12" cy="9" r="1.5" fill="#1c1917"/>
  <circle cx="20" cy="9" r="1.5" fill="#1c1917"/>
  <circle cx="12.4" cy="8.6" r="0.5" fill="white"/>
  <circle cx="20.4" cy="8.6" r="0.5" fill="white"/>
  <ellipse cx="16" cy="11.5" rx="1.5" ry="1" fill="#292524"/>
  <path d="M14,12.5 Q16,14 18,12.5" stroke="#292524" stroke-width="0.5" fill="none"/>
  <rect x="10" y="21" width="3" height="6" rx="1" fill="#d97706"/>
  <rect x="19" y="21" width="3" height="6" rx="1" fill="#d97706"/>
  <path d="M8,14 Q3,19 5,23" stroke="#f59e0b" stroke-width="3" fill="none" stroke-linecap="round"/>
  <circle cx="5" cy="23" r="1.5" fill="#fef3c7"/>
</svg>`);

const FOX_WALK_R1 = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <polygon points="14,7 17,2 20,7" fill="#d97706"/>
  <polygon points="20,7 23,2 26,7" fill="#d97706"/>
  <ellipse cx="18" cy="11" rx="7" ry="5" fill="#f59e0b"/>
  <ellipse cx="12" cy="15" rx="7" ry="5" fill="#f59e0b"/>
  <ellipse cx="12" cy="16" rx="4.5" ry="3" fill="#fef3c7"/>
  <circle cx="20" cy="9.5" r="1" fill="#1c1917"/>
  <circle cx="20.3" cy="9.2" r="0.3" fill="white"/>
  <ellipse cx="22" cy="11" rx="0.8" ry="0.5" fill="#292524"/>
  <rect x="8" y="19" width="2.5" height="5" rx="1" fill="#d97706" transform="rotate(-10 9 19)"/>
  <rect x="14" y="19" width="2.5" height="5" rx="1" fill="#d97706" transform="rotate(10 15 19)"/>
  <path d="M5,13 Q2,10 3,7" stroke="#f59e0b" stroke-width="3" fill="none" stroke-linecap="round"/>
  <circle cx="3" cy="7" r="1.5" fill="#fef3c7"/>
</svg>`);

const FOX_WALK_R2 = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <polygon points="14,7 17,2 20,7" fill="#d97706"/>
  <polygon points="20,7 23,2 26,7" fill="#d97706"/>
  <ellipse cx="18" cy="11" rx="7" ry="5" fill="#f59e0b"/>
  <ellipse cx="12" cy="15" rx="7" ry="5" fill="#f59e0b"/>
  <ellipse cx="12" cy="16" rx="4.5" ry="3" fill="#fef3c7"/>
  <circle cx="20" cy="9.5" r="1" fill="#1c1917"/>
  <circle cx="20.3" cy="9.2" r="0.3" fill="white"/>
  <ellipse cx="22" cy="11" rx="0.8" ry="0.5" fill="#292524"/>
  <rect x="8" y="19" width="2.5" height="5" rx="1" fill="#d97706" transform="rotate(10 9 19)"/>
  <rect x="14" y="19" width="2.5" height="5" rx="1" fill="#d97706" transform="rotate(-10 15 19)"/>
  <path d="M5,13 Q1,11 2,8" stroke="#f59e0b" stroke-width="3" fill="none" stroke-linecap="round"/>
  <circle cx="2" cy="8" r="1.5" fill="#fef3c7"/>
</svg>`);

const FOX_WALK_L1 = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <polygon points="12,7 9,2 6,7" fill="#d97706"/>
  <polygon points="18,7 15,2 12,7" fill="#d97706"/>
  <ellipse cx="14" cy="11" rx="7" ry="5" fill="#f59e0b"/>
  <ellipse cx="20" cy="15" rx="7" ry="5" fill="#f59e0b"/>
  <ellipse cx="20" cy="16" rx="4.5" ry="3" fill="#fef3c7"/>
  <circle cx="12" cy="9.5" r="1" fill="#1c1917"/>
  <circle cx="11.7" cy="9.2" r="0.3" fill="white"/>
  <ellipse cx="10" cy="11" rx="0.8" ry="0.5" fill="#292524"/>
  <rect x="17" y="19" width="2.5" height="5" rx="1" fill="#d97706" transform="rotate(10 18 19)"/>
  <rect x="23" y="19" width="2.5" height="5" rx="1" fill="#d97706" transform="rotate(-10 24 19)"/>
  <path d="M27,13 Q30,10 29,7" stroke="#f59e0b" stroke-width="3" fill="none" stroke-linecap="round"/>
  <circle cx="29" cy="7" r="1.5" fill="#fef3c7"/>
</svg>`);

const FOX_WALK_L2 = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <polygon points="12,7 9,2 6,7" fill="#d97706"/>
  <polygon points="18,7 15,2 12,7" fill="#d97706"/>
  <ellipse cx="14" cy="11" rx="7" ry="5" fill="#f59e0b"/>
  <ellipse cx="20" cy="15" rx="7" ry="5" fill="#f59e0b"/>
  <ellipse cx="20" cy="16" rx="4.5" ry="3" fill="#fef3c7"/>
  <circle cx="12" cy="9.5" r="1" fill="#1c1917"/>
  <circle cx="11.7" cy="9.2" r="0.3" fill="white"/>
  <ellipse cx="10" cy="11" rx="0.8" ry="0.5" fill="#292524"/>
  <rect x="17" y="19" width="2.5" height="5" rx="1" fill="#d97706" transform="rotate(-10 18 19)"/>
  <rect x="23" y="19" width="2.5" height="5" rx="1" fill="#d97706" transform="rotate(10 24 19)"/>
  <path d="M27,13 Q31,11 30,8" stroke="#f59e0b" stroke-width="3" fill="none" stroke-linecap="round"/>
  <circle cx="30" cy="8" r="1.5" fill="#fef3c7"/>
</svg>`);

const FOX_SCRATCH1 = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <polygon points="8,8 11,3 14,8" fill="#d97706"/>
  <polygon points="18,8 21,3 24,8" fill="#d97706"/>
  <ellipse cx="16" cy="12" rx="8" ry="6" fill="#f59e0b"/>
  <ellipse cx="16" cy="18" rx="7" ry="6" fill="#f59e0b"/>
  <ellipse cx="16" cy="19" rx="5" ry="4" fill="#fef3c7"/>
  <line x1="13" y1="10" x2="11" y2="11" stroke="#1c1917" stroke-width="0.8" stroke-linecap="round"/>
  <line x1="19" y1="10" x2="21" y2="11" stroke="#1c1917" stroke-width="0.8" stroke-linecap="round"/>
  <ellipse cx="16" cy="12.5" rx="1" ry="0.6" fill="#292524"/>
  <rect x="20" y="7" width="3" height="4" rx="1" fill="#d97706" transform="rotate(20 21 9)"/>
  <rect x="11" y="23" width="3" height="4" rx="1" fill="#d97706"/>
  <rect x="18" y="23" width="3" height="4" rx="1" fill="#d97706"/>
  <path d="M7,16 Q3,20 5,24" stroke="#f59e0b" stroke-width="3" fill="none" stroke-linecap="round"/>
  <circle cx="5" cy="24" r="1.5" fill="#fef3c7"/>
</svg>`);

const FOX_SCRATCH2 = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <polygon points="8,8 11,3 14,8" fill="#d97706"/>
  <polygon points="18,8 21,3 24,8" fill="#d97706"/>
  <ellipse cx="16" cy="12" rx="8" ry="6" fill="#f59e0b"/>
  <ellipse cx="16" cy="18" rx="7" ry="6" fill="#f59e0b"/>
  <ellipse cx="16" cy="19" rx="5" ry="4" fill="#fef3c7"/>
  <line x1="13" y1="10" x2="11" y2="11" stroke="#1c1917" stroke-width="0.8" stroke-linecap="round"/>
  <line x1="19" y1="10" x2="21" y2="11" stroke="#1c1917" stroke-width="0.8" stroke-linecap="round"/>
  <ellipse cx="16" cy="12.5" rx="1" ry="0.6" fill="#292524"/>
  <rect x="21" y="6" width="3" height="4" rx="1" fill="#d97706" transform="rotate(-10 22 8)"/>
  <rect x="11" y="23" width="3" height="4" rx="1" fill="#d97706"/>
  <rect x="18" y="23" width="3" height="4" rx="1" fill="#d97706"/>
  <path d="M7,16 Q3,21 5,25" stroke="#f59e0b" stroke-width="3" fill="none" stroke-linecap="round"/>
  <circle cx="5" cy="25" r="1.5" fill="#fef3c7"/>
</svg>`);

const FOX_SLEEP1 = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <ellipse cx="16" cy="18" rx="9" ry="6" fill="#f59e0b"/>
  <ellipse cx="16" cy="19" rx="6" ry="4" fill="#fef3c7"/>
  <ellipse cx="12" cy="14" rx="6" ry="5" fill="#f59e0b"/>
  <polygon points="7,10 9,5 12,10" fill="#d97706"/>
  <polygon points="12,10 15,5 17,10" fill="#d97706"/>
  <line x1="10" y1="13" x2="8" y2="13" stroke="#1c1917" stroke-width="0.8" stroke-linecap="round"/>
  <line x1="14" y1="13" x2="16" y2="13" stroke="#1c1917" stroke-width="0.8" stroke-linecap="round"/>
  <ellipse cx="12" cy="15" rx="0.8" ry="0.5" fill="#292524"/>
  <path d="M22,14 Q27,12 26,18 Q25,22 20,20" stroke="#f59e0b" stroke-width="4" fill="none" stroke-linecap="round"/>
  <circle cx="20" cy="20" r="2" fill="#fef3c7"/>
  <text x="20" y="10" font-size="5" fill="white" opacity="0.6" font-family="sans-serif" font-weight="bold">z</text>
  <text x="24" y="7" font-size="4" fill="white" opacity="0.4" font-family="sans-serif" font-weight="bold">z</text>
</svg>`);

const FOX_SLEEP2 = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <ellipse cx="16" cy="18" rx="9" ry="6" fill="#f59e0b"/>
  <ellipse cx="16" cy="19" rx="6" ry="4" fill="#fef3c7"/>
  <ellipse cx="12" cy="14" rx="6" ry="5" fill="#f59e0b"/>
  <polygon points="7,10 9,5 12,10" fill="#d97706"/>
  <polygon points="12,10 15,5 17,10" fill="#d97706"/>
  <line x1="10" y1="13" x2="8" y2="13" stroke="#1c1917" stroke-width="0.8" stroke-linecap="round"/>
  <line x1="14" y1="13" x2="16" y2="13" stroke="#1c1917" stroke-width="0.8" stroke-linecap="round"/>
  <ellipse cx="12" cy="15" rx="0.8" ry="0.5" fill="#292524"/>
  <path d="M22,14 Q27,12 26,18 Q25,22 20,20" stroke="#f59e0b" stroke-width="4" fill="none" stroke-linecap="round"/>
  <circle cx="20" cy="20" r="2" fill="#fef3c7"/>
  <text x="21" y="9" font-size="5.5" fill="white" opacity="0.7" font-family="sans-serif" font-weight="bold">z</text>
  <text x="25" y="5" font-size="4.5" fill="white" opacity="0.5" font-family="sans-serif" font-weight="bold">z</text>
  <text x="28" y="2" font-size="3.5" fill="white" opacity="0.3" font-family="sans-serif" font-weight="bold">z</text>
</svg>`);

export const FOX_SPRITES = {
  sit: [FOX_SIT, FOX_SIT2],
  cling: [FOX_CLING1, FOX_CLING2],
  walkRight: [FOX_WALK_R1, FOX_WALK_R2],
  walkLeft: [FOX_WALK_L1, FOX_WALK_L2],
  scratch: [FOX_SCRATCH1, FOX_SCRATCH2],
  sleep: [FOX_SLEEP1, FOX_SLEEP2],
} as const;
