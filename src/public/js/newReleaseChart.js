var releaseChart = {};

function getNewReleaseChart(callback, des, store) {
    fetch('/api/getNewReleaseChart/')
        .then(response => response.json())
        .then(data => {
            releaseChart[store] = data;
            callback(data,des);
        })
};
