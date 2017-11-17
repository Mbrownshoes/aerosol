function toVectorColor(colorStr) {
    var rgb = d3.rgb(colorStr);
    return [rgb.r / 255, rgb.g / 255, rgb.b / 255]
}


function loadData() {
    return new Promise(function(resolve, reject) {
        var aerosolCsv = function() {
            var args = [],
                len = arguments.length;
            while (len--) args[len] = arguments[len];
            console.log(args[0])
            return d3.csv(args[0], function(d) {
                return {
                    continent: +d.aer,
                    lat: +d.y,
                    lng: +d.x,
                    date: d.week
                }
            }, args[1])
        };
        d3.queue().defer(aerosolCsv, "week41-44.csv").await(function(err, aerosolData) {
        	console.log(aerosolData)
        	// var times = _.uniq(_.flatten(aerosolData.map(d => d3.keys(d.date)))).sort()
            
            if (err) {
                console.error("Something went wrong loading data", err);
                reject(err);
                return
            }
            resolve({
                aerosolData: aerosolData,
                // aerosolData1: aerosolData1
                // imgData: processImageData(imgData, width, height)
            })
        })
    })

    
}

function colorDataByContinent(data, aerosolData) {
    // var colorScale = d3.scaleOrdinal().domain(["NA", "SA", "EU", "AS", "AF", "OC", "AN"]).range(d3.range(0, 1, 1 / 6).concat(1).map(d3.scaleSequential(d3.interpolateCool)));
    // console.log(d3.min(aerosolData,function(d){return d.continent}))
    console.log(d3.max(aerosolData, function(d) {
            return d.continent
        }))
    var colorScale = d3.scaleLinear()
        .domain([0,1, d3.max(aerosolData, function(d) {return d.continent; })/2,
         d3.max(aerosolData, function(d) {return d.continent; })])

        // .domain([d3.min(aerosolData, function(d) {
        //     return d.continent
        // }), d3.max(aerosolData, function(d) {
        //     return d.continent
        // })])
        .range(["white",'#fff7bc','#fec44f','#d95f0e']);
    // var varyLightness = function(color) {
    //     var hsl = d3.hsl(color);
    //     hsl.l *= .1 + Math.random();
    //     return hsl.toString()
    // };
    data.forEach(function(d, i) {
        // console.log(colorScale(aerosolData[i].continent))
        d.color = toVectorColor((colorScale(aerosolData[i].continent)))
    })
}

function citiesLayout(points, width, height, aerosolData) {
    // console.log(points)
    // debugger;
    function projectData(data) {
        var latExtent = d3.extent(aerosolData, function(d) {
            return d.lat
        });
        console.log('lat:', latExtent)
        var lngExtent = d3.extent(aerosolData, function(d) {
            return d.lng
        });
        console.log('lng:',lngExtent)
        var extentGeoJson = {
            type: "LineString",
            coordinates: [
                [lngExtent[0], latExtent[0]],
                [lngExtent[1], latExtent[1]]
            ]
        };
        // console.log(world)
        // var land = topojson.mesh(world, world.objects.land);
        // var projection = d3.geoNaturalEarth2().fitSize([width, height], land);
        // console.log(aerosolData)
        // data.forEach(function(d, i) {
        //     var city = aerosolData[i];
        //     // if(i>64000){
        //     // 	console.log(city.lng)
        //     // }
        //     // console.log(i)
        //     // console.log(projection([city.lng, city.lat]))
        //     var location = projection([city.lng, city.lat]);
        //     d.x = location[0];
        //     d.y = location[1]
        // })
        var projection = d3.geoMercator().fitSize([width, height], extentGeoJson);
        data.forEach(function(d, i) {
            // console.log(d)
            var city = aerosolData[i];
            var location = projection([city.lng, city.lat]);
            d.x = location[0];
            d.y = location[1]
        })


    }
    // console.log(points)
    projectData(points);
    colorDataByContinent(points, aerosolData)
}

// function areaLayout(points, width, height, aerosolData) {
//     colorDataByContinent(points, aerosolData);
//     var rng = d3.randomNormal(0, .2);
//     var pointWidth = Math.round(width / 800);
//     var pointMargin = 1;
//     var pointHeight = pointWidth * .375;
//     var latExtent = d3.extent(aerosolData, function(d) {
//         return d.lat
//     });
//     var xScale = d3.scaleQuantize().domain(latExtent).range(d3.range(0, width, pointWidth + pointMargin));
//     var binCounts = xScale.range().reduce(function(accum, binNum) {
//         accum[binNum] = 0;
//         return accum
//     }, {});
//     var byContinent = d3.nest().key(function(d) {
//         return d.continent
//     }).entries(aerosolData);
//     aerosolData.forEach(function(city, i) {
//         city.d = points[i]
//     });
//     byContinent.forEach(function(continent, i) {
//         continent.values.forEach(function(city, j) {
//             var d = city.d;
//             var binNum = xScale(city.lat);
//             d.x = binNum;
//             d.y = height - pointHeight * binCounts[binNum];
//             binCounts[binNum] += 1
//         })
//     })
// }

function areaLayout(points, width, height, aerosolData) {
    colorDataByContinent(points, aerosolData);
    var rng = d3.randomNormal(0, .2);
    var pointWidth = Math.round(width / 800);
    var pointMargin = 1;
    var pointHeight = pointWidth * .375;
    var latExtent = d3.extent(aerosolData, function(d) {
        return d.lat
    });
    var xScale = d3.scaleQuantize().domain(latExtent).range(d3.range(0, width, pointWidth + pointMargin));
    var binCounts = xScale.range().reduce(function(accum, binNum) {
        accum[binNum] = 0;
        return accum
    }, {});
    var byContinent = d3.nest().key(function(d) {
        return d.continent
    }).entries(aerosolData);
    aerosolData.forEach(function(city, i) {
        city.d = points[i]
    });
    byContinent.forEach(function(continent, i) {
        continent.values.forEach(function(city, j) {
            var d = city.d;
            var binNum = xScale(city.lat);
            d.x = binNum;
            d.y = height - pointHeight * binCounts[binNum];
            binCounts[binNum] += 1
        })
    })
}