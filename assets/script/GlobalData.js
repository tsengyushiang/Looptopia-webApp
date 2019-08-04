
window.nodCount = 0;
window.day = 0;
window.path = [];
window.accurate_path = [];


window.requestOnFinishedFunction = function () { };

function getRequestCallBack(dataArr) {


    let data = [];

    dataArr.forEach(element => {
        data.push(JSON.parse(element));
    });

    window.requestOnFinishedFunction(data);
    window.requestOnFinishedFunction = function () { };

}

