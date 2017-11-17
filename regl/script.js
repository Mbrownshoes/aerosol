// const width = window.innerWidth;
// const height = window.innerHeight;
var width = 960; 
var height = 700; 
var test, world, yearSel, monthCount
var canvas = document.getElementById("canvas");

var pointLocations;
// var canvas = d3.select("body").append("canvas")
// console.log(canvas)
var j=0
canvas.width = width;
canvas.height = height;

var sel = d3.select('#chart')
d3.selection.prototype.moveToFront = function() {
    return this.each(function() {
        this.parentNode.appendChild(this);
    });
};


// var world
d3.loadData(["asiaTopo.json"], function(err, res) {
    console.log(res[0])
    world = res[0]
    // count ++
    // console.log(count)
    makeMap(res[0])
})

function makeMap(world) {
    console.log(world.objects)
    var land = topojson.mesh(world, world.objects.asia);

    const projection = d3.geoMercator()
        // .rotate([126, 0])
        .center([78, 24])
        // .parallels([50, 58.5])
        .scale(1200)
        .translate([960 / 2, 600 / 2]);
        // .fitSize([width, height], land)
        // .translate([-1240, 720]);
    // .rotate([-180, 0])
    // .precision(0.1);

    var svg = sel
        .append("svg")
        .attr("width", width)
        .attr("height", height)


    var path = d3.geoPath()
        .projection(projection);

    var pathStr = path(topojson.feature(world, world.objects.asia));


    var mask = svg.append('mask')
        .attr("id", "ocean")

    mask.append('rect')
        .attr("width", width)
        .attr("height", height)
        .style("fill", '#fff')

    mask.append('path')
        .attr("d", pathStr)
        .style("fill", '#000')

    svg.append('rect')
        .attr("mask", "url(#ocean)")
        .style("fill", '#a9d2df')
        .attr("width", width)
        .attr("height", height)

    svg.append("path")
        // .attr("class", "globe")
        // .datum(topojson.feature(world, world.objects.land))
        .attr("d", pathStr)
        .style("fill", 'none')
        .style("stroke", '#e0e0e0')
        .style("strokeWidth", .01);

    // yearSel = svg.append('text').text(' ')
    // .at({
    //     fontSize: 30,
    //     x: 100,
    //     y: 410
    // })
    // .attr('class', 'h2')
            //create legend
        // var color = d3.scaleLinear()
        //     .domain([d3.min(a), 0, d3.max(a)])
        //     .range(["#00441b", "white", "red"]);
            
        //       svg.append("g")
        //     .attr("class", "legendLinear")
        //     .attr("transform", "translate(40,680)");

        // m2 = '²'
        // yr = '¹'

        // var legendLinear = d3.legendColor()
        //     .shapeWidth(80)
        //     .labelFormat(d3.format(".2r"))
        //     .orient('horizontal')
        //     .cells(10)
        //     .title("g Cm\u207B" + m2 + " yr\u207B" + yr)
        //     .scale(color);

        // svg.select(".legendLinear")
        //     .call(legendLinear);
      
        // var legendScale = d3.scaleOrdinal()
        //     .domain(['Carbon uptake', 'Carbon release'])
        //     .range(['record', 'avg'])

        //d3-legend
        // var legend = d3.legendColor()
        //     .shapePadding(5)
        //     .useClass(true)
        //     .scale(legendScale);

        // svg.append('g')
        //     .attr('transform', 'translate(30,400)')
        //     .call(legend);


    monthCount = 0

}

function main(regl, aerosolData, coorData) {

// console.log(coorData.length)
    const numPoints = coorData.length;
    const pointWidth = 4;
    const pointMargin = 1;
    const duration = 2000;
    const delayByIndex = 500 / numPoints;
    // console.log(delayByIndex)
    const maxDuration = duration + delayByIndex * numPoints; // include max delay in here
    // console.log(maxDuration)

    var weeks = 4;
    var allweeks =[];
    endPoints = numPoints;
    startPoints = 0
    for (var i=0; i < weeks; i++) {
        
        allweeks[i] = aerosolData.slice(startPoints,endPoints)
        startPoints = endPoints
        endPoints = endPoints + numPoints
    }
    // console.log(allweeks)
    // jan = aerosolData.slice(0,numPoints)

    // jan = aerosolData.filter(function(d,i) {
    //     // console.log(d)
    //     return d.date == "41"
    // })
    // feb = aerosolData.filter(function(d) {
    //     return d.date == "42"
    // })
    // mar = aerosolData.filter(function(d) {
    //     return d.date == "43"
    // })
    // apr = aerosolData.filter(function(d) {
    //     return d.date == "44"
    // })
    // may = aerosolData.filter(function(d) {
    //     return d.date == "1505"
    // })
    // jun = aerosolData.filter(function(d) {
    //     return d.date == "1506"
    // })
    // jul = aerosolData.filter(function(d) {
    //     return d.date == "1507"
    // })
    // aug = aerosolData.filter(function(d) {
    //     return d.date == "1508"
    // })
    // sep = aerosolData.filter(function(d) {
    //     return d.date == "1509"
    // })
    // oct = aerosolData.filter(function(d) {
    //     return d.date == "1510"
    // })
    // nov = aerosolData.filter(function(d) {
    //     return d.date == "1511"
    // })
    // dec = aerosolData.filter(function(d) {
    //     return d.date == "1512"
    // })
// console.log(points)
    const toCities = (points) => citiesLayout(points, width, height, allweeks[0],coorData);
    const toCities1 = (points) => citiesLayout(points, width, height, allweeks[1],coorData);
    const toCities2 = (points) => citiesLayout(points, width, height, allweeks[2],coorData);
    const toCities3 = (points) => citiesLayout(points, width, height, allweeks[3],coorData);
    const toCities4 = (points) => citiesLayout(points, width, height, may);
    const toCities5 = (points) => citiesLayout(points, width, height, jun);
    const toCities6 = (points) => citiesLayout(points, width, height, jul);
    const toCities7 = (points) => citiesLayout(points, width, height, aug);
    const toCities8 = (points) => citiesLayout(points, width, height, sep);
    const toCities9 = (points) => citiesLayout(points, width, height, oct);
    const toCities10 = (points) => citiesLayout(points, width, height, nov);
    const toCities11 = (points) => citiesLayout(points, width, height, dec);
    // const toCities12 = (points) => citiesLayout(points, width, height, jan);
    // const toSwarm = (points) => swarmLayout(points, width, height, aerosolData);
    // const toPhoto = (points) => photoLayout(points, width, height, imgData);
    // const toArea = (points) => areaLayout(points, width, height, jan);
    // const toPhyllotaxis = (points) => phyllotaxisLayout(points, pointWidth, width / 2, height / 2, aerosolData);
    // const toMiddle = (points) => {
    // 	points.forEach((d, i) => {
    // 		console.log(d.x)
    // 		d.x = width / 2;
    // 		d.y = height / 2;
    // 		d.color = [0, 0, 0];
    // 	});
    // }
    const toBlack = (points) => {
        points.forEach((d, i) => {
            d.color = [0, 0, 0];
        });
    }

    const layouts = [toCities, toCities1, toCities2, toCities3];
    let currentLayout = 0;

    // wrap d3 color scales so they produce vec3s with values 0-1
    // also limit the t value to remove darkest color
    function wrapColorScale(scale) {
        const tScale = d3.scaleLinear().domain([0, 1]).range([0.4, 1]);
        return t => {
            const rgb = d3.rgb(scale(tScale(t)));
            return [rgb.r / 255, rgb.g / 255, rgb.b / 255];
        };
    }

    const colorScales = [
        d3.scaleSequential(d3.interpolateViridis),
        d3.scaleSequential(d3.interpolateMagma),
        d3.scaleSequential(d3.interpolateInferno),
        d3.scaleSequential(d3.interpolateCool),
    ].map(wrapColorScale);
    let currentColorScale = 0;



    // function to compile a draw points regl func
    function createDrawPoints(points) {


        const drawPoints = regl({
            frag: `
		  precision highp float;
			varying vec3 fragColor;
			void main() {
				gl_FragColor = vec4(fragColor, 1);
			}
			`,

            vert: `
			attribute vec2 positionStart;
			attribute vec2 positionEnd;
			attribute float index;
			attribute vec3 colorStart;
			attribute vec3 colorEnd;

			varying vec3 fragColor;

			uniform float pointWidth;
			uniform float stageWidth;
			uniform float stageHeight;
			uniform float elapsed;
			uniform float duration;
			uniform float delayByIndex;
			// uniform float tick;
			// uniform float animationRadius;
			uniform float numPoints;

			// helper function to transform from pixel space to normalized device coordinates (NDC)
			// in NDC (0,0) is the middle, (-1, 1) is the top left and (1, -1) is the bottom right.
			vec2 normalizeCoords(vec2 position) {
				// read in the positions into x and y vars
	      float x = position[0];
	      float y = position[1];

				return vec2(
		      2.0 * ((x / stageWidth) - 0.5),
		      // invert y since we think [0,0] is bottom left in pixel space
		      -(2.0 * ((y / stageHeight) - 0.5)));
			}

			// helper function to handle cubic easing (copied from d3 for consistency)
			// note there are pre-made easing functions available via glslify.
			float easeCubicInOut(float t) {
				t *= 2.0;
        t = (t <= 1.0 ? t * t * t : (t -= 2.0) * t * t + 2.0) / 2.0;

        if (t > 1.0) {
          t = 1.0;
        }

        return t;
			}

			void main() {
				gl_PointSize = pointWidth;

				float delay = delayByIndex * index;
	      float t;

	      // drawing without animation, so show end state immediately
	      if (duration == 0.0) {
	        t = 1.0;

	      // still delaying before animating
	      } else if (elapsed < delay) {
	        t = 0.0;
	      } else {
	        t = easeCubicInOut((elapsed - delay) / duration);
	      }

	      // interpolate position
	      vec2 position = mix(positionStart, positionEnd, t);

	      // apply an ambient animation
				// float dir = index > numPoints / 2.0 ? 1.0 : -1.0;
	      // position[0] += animationRadius * cos((tick + index) * dir);
	      // position[1] += animationRadius * sin((tick + index) * dir);

	      // above we + index to offset how they move
	      // we multiply by dir to change CW vs CCW for half


	      // interpolate color
	      fragColor = mix(colorStart, colorEnd, t);

	      // scale to normalized device coordinates
				// gl_Position is a special variable that holds the position of a vertex
	      gl_Position = vec4(normalizeCoords(position), 0.0, 1.0);
			}
			`,

            attributes: {
                positionStart: points.map(d => [d.sx, d.sy]),
                // positionEnd: points.map(d => [d.sx, d.sy]),
                positionEnd: points.map(d => [d.tx, d.ty]),
                colorStart: points.map(d => d.colorStart),
                colorEnd: points.map(d => d.colorEnd),
                index: d3.range(points.length),
            },

            uniforms: {
                pointWidth: regl.prop('pointWidth'),
                stageWidth: regl.prop('stageWidth'),
                stageHeight: regl.prop('stageHeight'),
                delayByIndex: regl.prop('delayByIndex'),
                duration: regl.prop('duration'),
                numPoints: numPoints,
                // animationRadius: 0,// 15.0,
                // tick: (reglprops) => { // increase multiplier for faster animation speed
                // 	// console.log(reglprops);
                // 	// return reglprops.tick / 50;
                // 	return 0; // disable ambient animation
                // },
                // time in milliseconds since the prop startTime (i.e. time elapsed)
                elapsed: ({
                    time
                }, {
                    startTime = 0
                }) => (time - startTime) * 1000,
            },

            count: points.length,
            primitive: 'points',
        });

        return drawPoints;
    }
        //Render loop
  
    // function to start animation loop (note: time is in seconds)
    function animate(layout, points, coorData) {
        // console.log(points)
        
        // yearSel.transition().duration(100).text(months[monthCount] + ' 2015')
        d3.select("#week").text(weeks[monthCount] + ' 2015');

        monthCount++
        // console.log(points)
        console.log('animating with new layout');
        // make previous end the new beginning
        
        // console.log(points)
        points.forEach(function(d,i){
            // console.log(coorData[i])
            d.sx = d.tx;
            d.sy = d.ty;
            d.colorStart = d.colorEnd;
        });

        if (monthCount > weeks - 1) monthCount = 0
        // layout points
        // console.log(points)
        layout(points);

        // copy layout x y to end positions
        const colorScale = colorScales[currentColorScale];

        if(j==0){
            // console.log(j)

            points.forEach(d => {
                d.tx = d.x;
                d.ty = d.y;
                d.sx=d.x;
                d.sy=d.y;
                d.colorStart = d.color;
                d.colorEnd= d.color;
            });

        }else{
            points.forEach((d, i) => {
                d.tx = d.x;
                d.ty = d.y;
                // d.colorEnd = colorScale(i / points.length)
                d.colorEnd = d.color;
            });            
        }
        // console.log(j)
        j+=1

        // points.forEach((d, i) => {
        //     d.tx = d.x;
        //     d.ty = d.y;
        //     // d.colorEnd = colorScale(i / points.length)
        //     d.colorEnd = d.color;
        // });

        // create the regl function with the new start and end points
        // console.log(points)
        const drawPoints = createDrawPoints(points);

        // start an animation loop
        let startTime = null; // in seconds
        const frameLoop = regl.frame(({
            time
        }) => {
            // console.log(time)
            // keep track of start time so we can get time elapsed
            // this is important since time doesn't reset when starting new animations
            if (startTime === null) {
                startTime = time;
            }

            

            // clear the buffer
            // regl.clear({
            // 	// background color (black)
            // 	color: [255, 255, 255, 1],
            // 	depth: 1,
            // });

            // draw the points using our created regl func
            // note that the arguments are available via `regl.prop`.
            // console.log(delayByIndex)
            drawPoints({
                pointWidth,
                stageWidth: width,
                stageHeight: height,
                duration,
                delayByIndex,
                startTime,
            });

            // how long to stay at a final frame before animating again (in seconds)
            const delayAtEnd = 0.1;

            // if we have exceeded the maximum duration, move on to the next animation
            // console.log(maxDuration / 1000)
     
            if (time - startTime > (2)) {
                // console.log(time)
            // if (Math.round(frame) == 0){
                console.log('done animating, moving to next layout');
                // debugger;

                frameLoop.cancel();
                currentLayout = (currentLayout + 1) % layouts.length;
                currentColorScale = (currentColorScale + 1) % colorScales.length;

                // when restarting at the beginning, come back from the middle again
                // if (currentLayout === 0) {
                // 	points.forEach((d, i) => {
                // 		d.tx = width / 2;
                // 		d.ty = height / 2;
                // 		d.colorEnd = [0, 0, 0];
                // 	});
                // }
                // console.log(points)
                animate(layouts[currentLayout], points,coorData);
            }
        });
    }



    ////// create initial set of points
    const points = d3.range(numPoints).map(d => ({}));

    points.forEach((d, i) => {
        // console.log(width)
        d.tx = width / 2;
        d.ty = height / 2;
        d.colorEnd = [0, 0, 0];
    });

    animate(layouts[currentLayout],points,coorData);
}

function loadData() {

    d3.queue()
        .defer(d3.csv, "week-41-44.csv")
        .defer(d3.csv, "coordinates.csv")
        .await(dostuff);

    function dostuff(error,aerosolData,coorData){
        
        aerosolData.forEach(function(d){
            d.aer= +d.aer
        })

        coorData.forEach(function(d){
            d.lat = +d.y,
            d.lng = +d.x
        })

        // pointLocations = coorData.map(function(d){})
        console.log('data has loaded. initializing regl...');
            regl({
        canvas: canvas,
        // callback when regl is initialized
        onDone: (err, regl) => {
            if (err) {
                console.error('Error initializing regl', err);
                return;
            }
            main(regl, aerosolData, coorData);
        },
    });
    }

    // return new Promise(function(resolve, reject) {
    //     var aerosolCsv = function() {
    //         var args = [],
    //             len = arguments.length;
    //         while (len--) args[len] = arguments[len];
    //         console.log(args)
    //         return d3.csv(args[0], function(d) {
    //             return {
    //                 continent: +d.aer,
    //                 lat: +d.y,
    //                 lng: +d.x,
    //                 date: d.week
    //             }
    //         }, args[1])
    //     };
    //     // var coordsRaw = args[1]
        
    //         .await(function(err, aerosolData,coordsRaw) {
    //             console.log(coordsRaw)
    //             // var times = _.uniq(_.flatten(aerosolData.map(d => d3.keys(d.date)))).sort()
                
    //             if (err) {
    //                 console.error("Something went wrong loading data", err);
    //                 reject(err);
    //                 return
    //             }
    //             resolve({
    //                 aerosolData: aerosolData,
    //                 coordsRaw: coordsRaw

    //                 // aerosolData1: aerosolData1
    //                 // imgData: processImageData(imgData, width, height)
    //             })
    //         })
    // })

    
}
loadData()
//     .then(({
//     aerosolData
// }) => {
//     console.log(d3.map(aerosolData, function(d) {
//         return d.date;
//     }).keys())
//     console.log('data has loaded. initializing regl...');

//     // initialize regl
//     regl({
//         canvas: canvas,
//         // callback when regl is initialized
//         onDone: (err, regl) => {
//             if (err) {
//                 console.error('Error initializing regl', err);
//                 return;
//             }
//             main(regl, aerosolData);
//         },
//     });
// });