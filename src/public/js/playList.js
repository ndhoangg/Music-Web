
function showPlayList(data, des1, des2) {
    var html1 = `<img src="${data.thumbnail}" alt="">`+
    `        <span>${data.title}</span>`+
    `        <button onclick="playThisList(this);" data-id="${data.id}" class="playAll">`+
    `            <span>Phát tất cả</span>`+
    `        </button>`;
    var html2 = data.songs.map(function (song, index) {
        return '<div class="chart-item">'+
        `            <img onclick="playSong(this,playOne)" data-id="${song.id}" src="${song.thumbnail}">`+
        `            <div class="name-artist">`+
        `                <span class="name">${song.name}</span>`+
        `                <span class="artist">${song.performer}</span>`+
        `            </div>`+
        `            <span class="duration">${song.duration}</span>`+
        `            <i class="far fa-heart addToLib" data-id="${song.id}"></i>`+
        `            <i onclick="playSong(this,addToPlaylist)" class="fas fa-plus addToList" data-id="${song.id}"></i>`+
        `        </div>`;
    })
    $(des1).html(html1);
    $(des2).html(html2.join(""));
}

function getPlayList(id, callback1, des1, des2) {
    fetch('/api/getDetailPlaylist/' + id)
        .then(response => response.json())
        .then(data => {
            callback1(data,des1, des2);
        })
};
