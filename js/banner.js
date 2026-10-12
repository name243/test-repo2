export function initBanner() { 

    const topBanner = document.getElementById('topBanner');
    const topBannerClose = document.getElementById('topBannerClose');

    if (topBannerClose && topBanner) {
    topBannerClose.addEventListener('click', () => {
        topBanner.classList.add('top-banner--hidden');
        setTimeout(() => {
        topBanner.remove();
        }, 300);
    });
    }   

}