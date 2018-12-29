function main() {
    isProduction(window.location, (color, style) => {
        if (style) document.body.style.border = style;
        else document.body.style.border = "8px outset " + color;
        // It looks funky otherwise
        document.body.style.margin = "0px";
    });
}

function isProduction(url, cb) {
    chrome.storage.sync.get('records', (items) => {
        items.records.some(record => {
            if (record.pattern && url.toString().indexOf(record.pattern) !== -1) {
                cb(record.color, record.stylez);
                return true;
            }
            return false;
        });
    });
}

main();