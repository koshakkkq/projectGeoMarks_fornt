let myMap = NaN;
let geoMarks = {};
let names = {};
let ids = NaN;
ymaps.ready(init);
const paramsString = ''

var socket = new WebSocket("ws://188.120.227.130:8765");



socket.onopen = function() {
    let searchParams = new URLSearchParams(window.location.search)
    ids = searchParams.getAll('id[]')
    socket.send(JSON.stringify({'type':'subscribe', 'id':ids}))//todo:тут будут id из url
};

socket.onmessage = function(event) {
    add_marker_test(JSON.parse(event.data)['id'], JSON.parse(event.data)['coords'])
};

function init() {
    myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 10
    })
}

function add_marker(id, coords) {
    myMap.geoObjects.remove(geoMarks[id])
    geoMarks[id] = new ymaps.GeoObject({
            geometry: {
                type: "Point",
                coordinates: coords,
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

function add_marker_test(id, coords) {
    names[id] = id;
    add_marker(id, coords);
}
