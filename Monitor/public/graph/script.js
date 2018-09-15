function removes3(){
	// d3.selectAll("svg > *").remove();
	d3.select("svg").remove();
}

function updateDisplay2() {
	// verse = verse.replace(" ", "");
	// verse = verse.toLowerCase();		
	var item = document.getElementById("sbox").value;
	console.log(item);
	var url = 'http://localhost:3002/job/getjob2';
	if (item === "IT") {
		url = 'http://localhost:3002/job/getIT';
	} else if (item === "Education") {
		url = 'http://localhost:3002/job/getEducation';
	} else if (item === "Travel") {
		url = 'http://localhost:3002/job/getTravel';
	}else{
		item = "All"		
	}

	var w = 400,
		h = 400;

	var circleWidth = 5;

	var palette = {
		"lightgray": "#819090",
		"gray": "#708284",
		"mediumgray": "#536870",
		"darkgray": "#475B62",

		"darkblue": "#0A2933",
		"darkerblue": "#042029",

		"paleryellow": "#FCF4DC",
		"paleyellow": "#EAE3CB",
		"yellow": "#A57706",
		"orange": "#BD3613",
		"red": "#D11C24",
		"pink": "#C61C6F",
		"purple": "#595AB7",
		"blue": "#2176C7",
		"green": "#259286",
		"yellowgreen": "#738A05"
	}

	var request = new XMLHttpRequest();
	request.open('GET', url);
	request.responseType = 'text';


	request.onload = function () {
		console.log(request.response);
		console.log(item);
		var obj = JSON.parse(request.response);
		var nodes = [{ name: item, target: [0] }];
		fLen = obj.length;
		for (i = 0; i < fLen; i++) {
			var cons = [0];
			nodes.push({ name: obj[i].company, target: cons })
		}
		var links = [];
		for (var i = 0; i < nodes.length; i++) {
			if (nodes[i].target !== undefined) {
				for (var x = 0; x < nodes[i].target.length; x++) {
					links.push({
						source: nodes[i],
						target: nodes[nodes[i].target[x]]
					})
				}
			}
		}
		// SVG is used to define vector-based graphics for the Web; SVG defines the graphics 
		//in XML format; SVG graphics do NOT lose any quality if they are zoomed or resized; 
		//Every element and every attribute in SVG files can be animated; SVG is a W3C recommendation

		var myChart = d3.select('#chart')
			.append('svg')
			.attr('width', w)
			.attr('height', h)

		var force = d3.layout.force()
			.nodes(nodes)
			.links([])
			.gravity(0.3)
			.charge(-1000)
			.size([w, h])

		var link = myChart.selectAll('line')
			.data(links).enter().append('line')
			.attr('stroke', palette.gray)

		var node = myChart.selectAll('circle')
			.data(nodes).enter()
			.append('g')
			.call(force.drag);

		node.append('circle')
			.attr('cx', function (d) { return d.x; })
			.attr('cy', function (d) { return d.y; })
			.attr('r', circleWidth)
			.attr('fill', function (d, i) {
				if (i > 0) { return palette.pink }
				else { return palette.blue }
			})

		node.append('text')
			.text(function (d) { return d.name })
			.attr('font-family', 'Roboto Slab')
			.attr('fill', function (d, i) {
				if (i > 0) { return palette.mediumgray }
				else { return palette.yellowgreen }
			})
			.attr('x', function (d, i) {
				if (i > 0) { return circleWidth + 4 }
				else { return circleWidth - 15 }
			})
			.attr('y', function (d, i) {
				if (i > 0) { return circleWidth }
				else { return 8 }
			})
			.attr('text-anchor', function (d, i) {
				if (i > 0) { return 'beginning' }
				else { return 'end' }
			})
			.attr('font-size', function (d, i) {
				if (i > 0) { return '1em' }
				else { return '1.8em' }
			})

		force.on('tick', function (e) {
			node.attr('transform', function (d, i) {
				return 'translate(' + d.x + ', ' + d.y + ')';
			})

			link
				.attr('x1', function (d) { return d.source.x })
				.attr('y1', function (d) { return d.source.y })
				.attr('x2', function (d) { return d.target.x })
				.attr('y2', function (d) { return d.target.y })
		})


		force.start();

	};

	request.send();
};