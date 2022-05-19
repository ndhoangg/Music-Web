const Zing = require('../api/ZingMp3');
var DATE = new Date();

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getTime(s){
    return(s-(s%=60))/60+(9<s?':':':0')+s;
}

class ApiController {

    //  [GET] /api/getInfoMusic:id
    getInfoMusic(req, res,next) {
        Zing.getInfoMusic(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.json(err))
    }

    //  [GET] /api/getFullInfo:id
    getFullInfo(req, res,next) {
        Zing.getFullInfo(req.params.id)
            .then(data => res.json(data))
            .catch(err => res.json(err))
    }

    //  [GET] /api/getWeekChart:id
    getWeekChart(req, res,next) {
        Zing.getWeekChart(req.params.id)
            .then(data => {
                const playlistId = data.playlistId;
                Zing.getDetailPlaylist(data.playlistId)
                    .then(songs => {
                        let data = songs.song.items.map( (song,index) => {
                            return {
                                id: song.encodeId,
                                name: song.title,
                                performer: song.artistsNames,
                                thumbnail: song.thumbnailM,
                                duration: getTime(song.duration),
                                number: index + 1,
                                playlistId: playlistId,
                            }
                        })
                        return data;
                    })
                    .then(songs => res.json(songs))
                    .catch(err => res.json(err))
            })
            .catch(err => res.json(err))
    }

    //  [GET] /api/getSectionPlaylist:id
    getSectionPlaylist(req, res,next) {
        Zing.getSectionPlaylist(req.params.id)
            .then(data => res.json(data))
            .catch(err => res.json(err))
    }

    //  [GET] /api/getDetailPlaylist:id
    getDetailPlaylist(req, res,next) {
        Zing.getDetailPlaylist(req.params.id)
            .then(data => {
                let songs = data.song.items.map((item,index) => {
                    return {
                        id: item.encodeId,
                        name: item.title,
                        performer: item.artistsNames,
                        thumbnail: item.thumbnailM,
                        number: index + 1,
                        duration: getTime(item.duration)
                    }
                })
                return {
                    id: data.encodeId,
                    title: data.title,
                    thumbnail: data.thumbnailM,
                    songs: songs
                }
            })
            .then(data => {
                res.json(data);
            })
            .catch(err => res.json(err))
    }

    //  [GET] /api/getStreaming:id
    getStreaming(req, res,next) {
        Zing.getStreaming(req.params.id)
            .then(data => res.json(data))
            .catch(err => res.json(err))
    }

    //  [GET] /api/Lyric:id
    getLyric(req, res,next) {
        Zing.getLyric(req.params.id)
            .then(data => res.json(data))
            .catch(err => res.json(err))
    }

    //  [GET] /api/getHome:id
    getHome(req, res,next) {
        Zing.getHome(req.params.id)
            .then(data => res.json(data))
            .catch(err => res.json(err))
    }

    //  [GET] /api/getNewReleaseChart
    getNewReleaseChart(req, res,next) {
        Zing.getNewReleaseChart(req.params.id)
            .then(data => {
                return data.items.map((item,index) => {
                    return {
                        id: item.encodeId,
                        name: item.title,
                        performer: item.artistsNames,
                        thumbnail: item.thumbnailM,
                        number: index + 1,
                        duration: getTime(item.duration)
                    }
                })
            })
            .then(data => {
                res.json(data);
            })
            .catch(err => res.json(err))
    }
}

module.exports = new ApiController;
