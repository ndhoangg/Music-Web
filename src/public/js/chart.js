
function showTop5(songs, des) {
    var htmls = songs.map(function (song, index) {
        if (index > 4) return '';
        return '<div class="chart-item">'+
        `                    <div class="number">${song.number}</div>`+
        '                    <i class="fas fa-minus minus"></i>'+
        `                    <img onclick="playSong(this,playOne)" data-id="${song.id}" src="${song.thumbnail}">`+
        '                    <div class="name-artist">'+
        `                        <span class="name">${song.name}</span>`+
        `                        <span class="artist">${song.performer}</span>`+
        '                    </div>'+
        '                </div>';
    })
    $(des).html(htmls.join(""));
}

var chart = {};

function getChart(callback, des, id, store) {
    fetch('/api/getWeekChart/' + id)
        .then(response => response.json())
        .then(data => {
            chart[store] = data;
            callback(data,des);
        })
};
