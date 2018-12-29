function main() {

    isProduction(window.location, (color) => {
        document.body.style.border = "10px solid " + color;
        document.body.style.margin = "0px";
    });

}

function isProduction(url, cb) {
    console.log('url = ' + url);
    chrome.storage.sync.get('records', (items) => {
        const records = items.records;
        for (let i = 0; i < records.length; i++) {
            const record = records[i];
            if (record.pattern && url.toString().indexOf(record.pattern) !== -1) {
                cb(record.color);
                break;
            }
        }
    });
}

main();