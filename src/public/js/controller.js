//  PLLAYER CONTROLER
$('.myCssPlayer').append('<i class="fas fa-chevron-circle-down player-down"></i>');
$('.myCssPlayer').append('<i class="fas fa-thumbtack ghim" data-id="0"></i>');


$('.player-down').click(function(){
    changeMode();
    $('.player-up').css('display','block');
    $('.player-down').css('display','none');
});

$('.player-up').click(function(){
    changeMode();
    $('.player-up').css('display','none');
    $('.player-down').css('display','block');
    scrollToTop();
});

$('.ghim').click(function(){
    if ($('.ghim').data('id') == 0){
        $('.ghim').addClass('ghim-active');
        $('.myCssPlayer').addClass('player-ghim');
        $('.player_container').addClass('ghim-tigger');
        $('.ghim').data('id', 1);
        $('.player-down').css('display','none');
        return;
    }
    $('.ghim').data('id', 0);
    $('.myCssPlayer').removeClass('player-ghim');
    $('.player_container').removeClass('ghim-tigger');
    $('.ghim').removeClass('ghim-active');
    $('.player-down').css('display','block');
})

function scrollToTop(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
}

//  DOM
var data = { }
function loadComponent(component){
    $('#component').load(`../components/${component}.html`);
    return;
}

// SHOW ALL SONGS IN A PLAYLIST
function showAll(songs, des) {
    var htmls = songs.map(function (song, index) {
        $('.chart-btn').attr('data-id', song.playlistId);
        if (index == 99) return;
        return '<div class="chart-item">'+
        `            <div class="number">${song.number}</div>`+
        `            <i class="fas fa-minus minus"></i>`+
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
    $(des).html(htmls.join(""));
}