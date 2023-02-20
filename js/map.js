
let myMap = NaN;
let geoMarks = {};
let names = {};
let ids = NaN;
ymaps.ready(init);
const paramsString = ''

var socket = new WebSocket("ws://188.120.227.130:8765");



socket.onopen = function() {
    let searchParams = new URLSearchParams(window.location.search)
    //ids = searchParams.getAll('id[]')
    ids = [12,245]
    socket.send(JSON.stringify({'type':'subscribe', 'id':ids}))//todo:тут будут id из url
};

socket.onmessage = function(event) {
    console.log(event.data)
};

function init() {
     myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 10
        })
}

function add_marker(id, coordinates){
    myMap.geoObjects.remove(geoMarks[id])
    geoMarks[id] = new ymaps.GeoObject({
        geometry: {
            type: "Point",
            coordinates: coordinates,
            preset: 'islands#redIcon',
        },
        properties: {
            iconContent: names[id],
        },
    },
        {
            preset: 'islands#blueStretchyIcon',
        });
    myMap.geoObjects.add(geoMarks[id]);

}


function add_marker_loop(id, cords, i){
    setTimeout(function () {
        add_marker(id, cords)
        cords[0] += 0.002;
        cords[1] += 0.002;
        if ( i < 10){
            add_marker_loop(id, cords, i+1)
        }
    }, 1000)
}



function add_marker_test(){
    names[1] = '1';
    names[2] = '2';
    cords1 = [55.75, 37.50];
    add_marker_loop(1, cords1, 0);
    cords2 = [53.75, 37.50];
    add_marker_loop(2, cords2, 0);
}

