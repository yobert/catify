(function(){
	"use strict";

var cat1_base64 = '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';

/**
 * Filter to be applied to the loaded cat atlas
 *
 * Red  (#FF0000): invert(16%) sepia(99%) saturate(7451%) hue-rotate(8deg) brightness(103%) contrast(117%)
 * Green(#00FF00): invert(52%) sepia(47%) saturate(1999%) hue-rotate(79deg) brightness(115%) contrast(126%)
 * Blue (#0000FF): invert(8%) sepia(99%) saturate(7376%) hue-rotate(247deg) brightness(99%) contrast(144%)
 * To generate other filters using HEX @link https://codepen.io/sosuke/pen/Pjoqqp
 * To generate other filters using rgb() @link https://stackoverflow.com/a/43960991
 **/
var filter_colour = '';

function get_id(i) {
	var e = document.getElementById(i);

	if (!e)
		throw ('get_id(\'' + i + '\') failed');

	return e;
}
function listener_add(el, ev, cb) {
	if (el.addEventListener)
		el.addEventListener(ev, cb, false);
	else
		el.attachEvent('on' + ev, cb);
}
function document_size() {
	return [
		document.documentElement.clientWidth,
		document.documentElement.clientHeight
	];
}
function window_size() {
	var wx, wy;
	if (window.innerWidth) {
		wx = window.innerWidth;
		wy = window.innerHeight;
	}
	if (!wx && document.documentElement) {
		wx = document.documentElement.clientWidth;
		wy = document.documentElement.clientHeight;
	}
	if (!wx) {
		var body = document.body || document.getElementsByTagName('body')[0];
		if (body) {
			if (body.clientWidth) {
				wx = body.clientWidth;
				wy = body.clientHeight;
			} else if (body.offsetWidth) {
				wx = body.offsetWidth;
				wy = body.offsetHeight;
			}
		}
	}

	return [wx, wy];
}
function get_key(ev) {
	ev = ev ? ev : this.event;
	return ev.keyCode ? ev.keyCode : ev.which;
}
function window_scroll() {
	var x = 0;
	var y = 0;

	if (self.pageYOffset) {
		x = self.pageXOffset;
		y = self.pageYOffset;
	} else if (document.documentElement && document.documentElement.scrollTop) {
		x = document.documentElement.scrollLeft;
		y = document.documentElement.scrollTop;
	} else if (document.body) {
		x = document.body.scrollLeft;
		y = document.body.scrollTop;
	}

	return [x, y];
}







var obs = [];

var key_held = []; // auto set to false when key lifted
var cat;
var x = 100;
var y = 100;
var astep = 0;
var stillstep = 0;
var catstate = 0;
var jumping = false;
var jumpvel = 0;
var jumpstate = -1;
var movespeed = 4;
var dir = 0;
var bounds;
var focused = true;
var inited = false;


// [x, y, w, h]
var catstates = [
	[0,    0, 28, 24],
	[28,   0, 28, 24],
	[56,   0, 28, 24],
	[84,   0, 28, 24],
	[112,  0, 28, 24],
	[140,  0, 28, 24],
	[168,  0, 28, 24],
	// Walk left
	[0,   24, 48, 24],
	[48,  24, 48, 24],
	[96,  24, 48, 24],
	[144, 24, 48, 24],
	// Walk right
	[0,   48, 48, 24],
	[48,  48, 48, 24],
	[96,  48, 48, 24],
	[144, 48, 48, 24],
	// Prepare to jump
	[0,   77, 28, 22],
	[29,  79, 22, 20],
	// Start jump right
	[58,  78, 26, 19],
	[84,  76, 52, 21],
	[136, 76, 52, 21],
	// Start jump left
	[162,100, 26, 19],
	[110, 98, 52, 21],
	[58,  98, 52, 21],
	// Falling right
	[0,  119, 48, 25],
	[48, 121, 48, 23],
	// Falling left
	[145,119, 48, 25],
	[97, 121, 48, 23],
];

var walk = [
	[11, 12, 13, 14],
	[ 7,  8,  9, 10],
];

var jump = [
	[15, 16, 17, 18, 19],
	[15, 16, 20, 21, 22],
];
var fall = [
	[23, 24],
	[25, 26],
];

(function() {
	// add a cat when CAT is typed
	var buffer = '';
	if(document.body) {
		listener_add(document.body, 'keydown', function(e) {
			if(document.activeElement &&
			   document.activeElement.tagName.match(/^(INPUT|TEXTAREA)$/)) {
				return;
			}

			var k = get_key(e);
			k = String.fromCharCode(k);
			if(k == 'C') {
				buffer = k;
				return;
			}

			if(!buffer.length) {
				return;
			}

			buffer += k;
			if(buffer == 'CAT') {
				catify();
				buffer = '';
			}else if(buffer.length > 3) {
				buffer = '';
			}
		});
	}
}());

function catify() {
	if(!document.createRange)
		return; // :'(

	if(!inited) {
		init();
	}

	cat = document.createElement('div');
	cat.style.position = 'absolute';
	//cat.style.backgroundImage = 'url("images/cat/atlas/cat1.png")';
	cat.style.backgroundImage = 'url("data:image/png;base64,' + cat1_base64 +'")';
	cat.style.backgroundRepeat = 'no-repeat';
	cat.style.filter = filter_colour;
	cat.className = 'catify';

	listener_add(cat, 'click', function(e) {
		focused = !focused;
	});
	listener_add(cat, 'dblclick', function(e) {
		cat.parentNode.removeChild(cat);
		cat = null;
	});

	// set the cat atop a random spot on the page
	//var at = obs[Math.floor(Math.random() * obs.length)];
	//x = at.left + Math.floor(at.width * 0.5);
	//y = at.top - 1;
	x = Math.floor(bounds[0] * 0.3);
	y = 0;

	draw();
	document.body.appendChild(cat);

	if(!inited) {
		setInterval(update, 16);
		inited = true;
	}
}

function init() {
	var i;

//	listener_add(window, 'resize', resize);
//	listener_add(window, 'scroll', resize);
	setInterval(resize, 200);
	resize();

	for(i = 0; i < 255; i++) {
		key_held[i] = false;
	}

	listener_add(document, 'keydown', function(e) {
		if(!has_focus()) { return; }

		var k = get_key(e);
		key_held[k] = true;

		if(k >= 37 && k <= 40) {
			e.preventDefault();
		}
	});

	listener_add(document, 'keyup', function(e) {
		if(!has_focus()) { return; }

		var k = get_key(e);
		key_held[k] = false;

		if(k >= 37 && k <= 40) {
			e.preventDefault();
		}
	});
}

function has_focus() {
	if(!focused || !cat) {
		 return false;
	}

	if(document.activeElement &&
	   document.activeElement.tagName.match(/^(INPUT|TEXTAREA)$/)) {
		return false;
	}

	return true;
}

function update(force) {
	if(astep > 1000000)
		astep = 0;

	var ox = x;
	var oy = y;

	var catrect = {
		'top': y - catstates[catstate][3],
		'left': x,
		'width':catstates[catstate][2],
		'height': catstates[catstate][3]
	};
	var sitting = collide(catrect, obs);
	var cantfall = false;

	//if(y + catstates[catstate][3] >= bounds[1]) {
	if(y + 2 > bounds[1]) {
		sitting = true;
		cantfall = true;
	}

	if(key_held[37])
		x = x - movespeed;

	if(key_held[39])
		x = x + movespeed;

	if(x < 0)
		x = 0;

	if(x + catstates[catstate][2] > bounds[0])
		x = bounds[0] - catstates[catstate][2];

	if(key_held[38] && !jumping && sitting) {
		jumping = true;
		jumpvel = 10;
		jumpstate = -1;
	}

	if(key_held[40] || (!jumping && !sitting && !cantfall)) {
		y = y + movespeed;
	}

	if(x != ox)
		dir = (x > ox)?0:1;

	if(jumping) {
		jumpstate++;
		if(jumpstate < jump[dir].length)
			catstate = jump[dir][jumpstate];
		else
			catstate = jump[dir][jump[dir].length-1];
		y = y - jumpvel;

		if(y - catstates[catstate][3] < 0)
			y = catstates[catstate][3];

		jumpvel--;
		if(jumpvel == -1)
			jumping = false;
	}

	//if(y + catstates[catstate][3] > bounds[1]) {
	//	y = bounds[1] - catstates[catstate][3];
	//}
	if(y + 1 > bounds[1]) {
		y = bounds[1] - 1;
	}
	if(y - catstates[catstate][3] < 0) {
		y = catstates[catstate][3];
	}

	if(x == ox && y == oy) {
		if(stillstep <= 0) {
			stillstep = Math.floor(Math.random() * 20) + 20;
			astep = Math.floor(Math.random() * 100000);
		}
		stillstep--;

		catstate = astep % 7;
		draw();
		return;
	}

	astep++;

	if(jumping) {
		draw();
		return;
	}

	if(!jumping && !sitting) {
		catstate = fall[dir][astep%2];
		draw();
		return;
	}

	catstate = walk[dir][Math.floor(astep / 2) % 4];

	draw();
}

function draw() {
	bg(cat, catstates[catstate]);
	cat.style.left = x+'px';
	cat.style.top = (y - catstates[catstate][3])+'px';
}

function bg(e, a) {
	e.style.width = a[2]+'px';
	e.style.height = a[3]+'px';
	e.style.backgroundPosition = (-a[0]) + 'px ' + (-a[1]) + 'px';
}

function collide(o, list) {
	var i, l;
	for(i = 0; i < list.length; i++) {
		l = list[i];
		//if(l.top > o.top + o.height)
		//	continue;
		//if(l.top + l.height < o.top)
		//	continue;
		if(o.top + o.height < l.top)
			continue;
		if(o.top + o.height > l.top + movespeed)
			continue;
		if(l.left > o.left + o.width)
			continue;
		if(l.left + l.width < o.left)
			continue;
		return true;
	}
	return false;
}

function resize() {
	var body = document.body;

	obs = [];

	var scr = window_scroll();

	all_text_nodes(body, function(e) {
		var range = document.createRange();
		range.selectNodeContents(e);
		var rects = range.getClientRects();
		var dims;
		for(var i = 0; i < rects.length; i++) {
			dims = {
				top: rects[i].top + scr[1],
				left: rects[i].left,
				width: rects[i].width,
				height: rects[i].height
			};
			obs.push(dims);

/*			d = document.createElement('div');
			d.style.position = 'absolute';
			d.style.backgroundColor = '#f00';
			d.style.opacity = 0.5;

			d.style.left = dims.left+'px';
			d.style.top = dims.top+'px';
			d.style.width = dims.width+'px';
			d.style.height = dims.height+'px';

			d.appendChild(document.createTextNode(''));
			document.body.appendChild(d);*/
		}
	});

	bounds = document_size();
	var w = window_size();
	if(bounds[1] < w[1])
		bounds[1] = w[1];
}

function all_text_nodes(element, cb)
{
	if(element.childNodes.length > 0)
		for(var i = 0; i < element.childNodes.length; i++)
			all_text_nodes(element.childNodes[i], cb);

	if(element.nodeType == Node.TEXT_NODE && /\S/.test(element.nodeValue))
		cb(element);
}

window.catify = catify;
})();

