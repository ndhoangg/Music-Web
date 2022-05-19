var isFirst = true;
var isPlayed = false;
var playList = [];
var listSong = [];
var currentSong = '';

// Constructor
const ap = new APlayer({
    container: document.getElementById('aplayer'),
    lrcType: 3,
    audio: [{}]
});

// Mini <--> Normal
function changeMode() {
    if (ap.mode == 'mini') {
        ap.setMode('normal');
        $('#aplayer').removeClass('miniPlayer');
        $('#aplayer').addClass('myCssPlayer');
        $('.myCssPlayer').css('display', 'block');
        return;
    }
    $('#aplayer').removeClass('myCssPlayer');
    $('#aplayer').addClass('miniPlayer');
    ap.setMode('mini');
}

ap.on('play', function () {
    $('.aplayer-pic').addClass('aplayer-pic-spin');
});

ap.on('pause', function () {
    $('.aplayer-pic').removeClass('aplayer-pic-spin');
});

// ap.on('ended', function () {
//     playSong('#autoPlayNext', playOne);
// });

// Player
function playSong(identifier, callback) {
    fetch('/api/getFullInfo/' + $(identifier).data('id'))
        .then(function (res) {
            return res.json();
        })
        .then(data => {
            console.log(data)
            var song = {
                id: data.encodeId,
                name: data.title,
                artist: data.artistsNames,
                url: data.streaming['128'],
                cover: data.thumbnailM,
                lrc: ''
            }
            if (!song.name) return;
            $('#autoPlayNext').data('id', song.next);
            if (isFirst) {
                $('.player-down').click();
                isFirst = false;
            }
            callback(song);
        })
        .catch(function (err) {
            console.log(err)
            console.log('err occur')
        })
}

function init() {
    $('.aplayer-lrc-contents').css('transform', 'translateY(0px)');
    $('.myCssPlayer').css('display', 'block');
}

function playOne(song) {
    isPlayed = true;
    ap.list.clear();
    ap.list.add(song);
    init();
    playList = [];
    listSong = [];
    playList.push(song.id);
    listSong.push(song);
    ap.play();
}

function addToPlaylist(song, isPlay = true) {
    if (!isPlayed) {
        ap.list.clear();
        isPlayed = true;
    }
    if (playList.includes(song.id)) return;
    else {
        playList.push(song.id);
        listSong.push(song);
        ap.list.add(song);
        if (isPlay) ap.play();
    }
}

function playThisList(identifier) {
    fetch('/api/getDetailPlaylist/' + $(identifier).data('id'))
        .then(function (res) {
            return res.json();
        })
        .then(data => {
            playList = [];
            listSong = [];
            ap.list.clear();
            data.songs.map((song, index) => {
                fetch('/api/getInfoMusic/' + song.id)
                    .then(function (res) {
                        return res.json();
                    })
                    .then(item => {
                        if (!item.name) return;
                        addToPlaylist(item);
                        if (isFirst) {
                            $('.player-down').click();
                            isFirst = false;
                        }
                    })
            })
        })
        .catch(function (err) {
            console.log(err)
            console.log('err occur')
        })
}
