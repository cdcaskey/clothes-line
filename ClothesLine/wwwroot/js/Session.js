const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    if (
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
            ua
        )
    ) {
        return "mobile";
    }
    return "desktop";
};

const canShare = () => {
    return navigator.canShare();
}

function showCopy() {
    return !canShare() || getDeviceType() == "desktop";
}

function shareLink(title, text, url) {
    let shareData = {
        title: title,
        text: text,
        url: url
    };

    navigator.share(shareData);
}

function copyText(text) {
    navigator.clipboard.writeText(text);
}
