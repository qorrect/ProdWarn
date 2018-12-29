const numberOfSites = 2;

function saveOptions(e) {
    //
    e.preventDefault();
    document.querySelector("#saveButton").disabled = true;
    const records = [];
    for (let i = 0; i < numberOfSites; i++) {
        const record = {
            no: i,
            pattern: document.querySelector("#p" + i).value,
            color: document.querySelector("#c" + i).value,
            stylez: document.querySelector("#s" + i).value,

        };
        records.push(record);
    }
    console.log(records);
    chrome.storage.sync.set({'records': records}, function () {
        console.log('Settings saved');
    });
}

function restoreOptions() {

    function setCurrentChoice(result) {
        console.log(result);
        if (result && result.records) {
            const records = result.records;
            records.forEach(function (element) {
                document.querySelector("#p" + element.no).value = element.pattern;
                if (element && element.color) document.querySelector("#c" + element.no).value = element.color;
                if (element && element['stylez']) document.querySelector("#s" + element.no).value = element.stylez;

            });
        }

    }


    chrome.storage.sync.get('records', function (items) {
        console.log('here');
        console.log(items);
        setCurrentChoice(items);
    });

}

function resetForm() {
    for (let i = 1; i < numberOfSites; i++) {
        document.querySelector("#p" + i).value = "";
        document.querySelector("#c" + i).value = "";
        document.querySelector("#s" + i).value = "";

    }
    document.querySelector("#saveButton").disabled = false;
}

function main() {
    document.addEventListener("DOMContentLoaded", restoreOptions);
    document.querySelector("form").addEventListener("submit", saveOptions);
    document.querySelector("#resetButton").addEventListener("click", resetForm);

    for (let i = 0; i < numberOfSites; i++) {
        document.querySelector("#p" + i).addEventListener("input",
            () => {
                document.querySelector("#saveButton").disabled = false;
            });
        document.querySelector("#c" + i).addEventListener("change",
            () => {
                document.querySelector("#saveButton").disabled = false;
            });
        document.querySelector("#s" + i).addEventListener("input",
            () => {
                document.querySelector("#saveButton").disabled = false;
            });
    }

}

main();