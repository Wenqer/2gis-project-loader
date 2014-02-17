'use strict';
var request = require('request');

var url = 'http://catalog.api.2gis.ru/2.0/search?key=rujrdp3400&fields=data.bound%2Cdata.max_zoom_level%2Cdata.min_zoom_level%2Cdata.time_zone%2Cdata.time_zone_as_offset%2Cdata.code&type=project&lang=all';


function wktToBnd(wkt) {
    var arr,
        pointsArr,
        bracketsContent,
        regExp,
        southWest,
        northEast;

    wkt = wkt.replace(/, /g, ',');
    wkt.replace(' (', '(');

    arr = /^POLYGON\((.*)\)/.exec(wkt);
    regExp = /\((.*?)\)/g;

    bracketsContent = (regExp).exec(arr[1]);
    pointsArr = bracketsContent[1].split(',');
    southWest = pointsArr[0].split(' ');
    northEast = pointsArr[2].split(' ');

    return [
        parseFloat(southWest[1]),
        parseFloat(southWest[0]),
        parseFloat(northEast[1]),
        parseFloat(northEast[0])
    ];
}

function parse(item) {
    return {
        code: item.code,
        /*jshint camelcase: false */
        minZoom: item.min_zoom_level,
        maxZoom: item.max_zoom_level,
        timeOffset: item.time_zone_as_offset,
        bound: wktToBnd(item.bound)
    };
}

function load(cb) {
    request(url, function (err, resp, body) {
        var data = JSON.parse(body);
        cb(err, data.result.data.map(parse));
    });
}

module.exports = load;

