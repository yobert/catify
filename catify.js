(function(){
	"use strict";

var cat1_base64 = 'iVBORw0KGgoAAAANSUhEUgAAAMQAAABICAQAAAAD3ZJDAAAABGdBTUEAALGPC/xhBQAAAAJiS0dEAP+Hj8y/AAADEUlEQVR42u1cy3LDIAzEnfz/L7uXOkMoeoLi9czupXVghRJYDEj2cbY5jr+C8/j8rL9G4Y2c0Q4Kr683Xv80AgIvq8Jxeszcy3uCjxaXigDBtIP6+auvcF1L8+EdPIlz/Y/C03AeVAQM/nWWd/4be5+8NR4VAQL1HiFhZS4kb86jIkCgdtZYaO0eycvzqAgQvFqTz3kyqOQ9xc8Mj4oAwdGCo0yqN+44JV50VK/yvu1ntj0qAgTH2eLz3ni+Et11RrkjD9nPbHtUBAhereVGnHftrHEzIxzdz2x7VAQIPjriPHL9Sd46j4oAwcf0Z61/pWgUees8KgIEKwkJxEZQESAw85oq4Mngu8u+J3Ovwn8qAgTTLI6q0ZqNbEk2rIyJqP3+u89+h0r/qQgQvDtoR2+PRmeZ3SvtzE42xxGsKQbZfyoCBO94hNXbsw3HbDSMve45l9dOObWImeab5KNnREvPQFj2s/63RkXA4B2zXoW22rg+39mO135Wkdkc1qz/VAQIUjFrC9kc0KzdXfbv9J+KAIG4j8iictR61uzIqqMiHoD36Wt0PSyVZxHJA1qxZ0XKdtqNgIoAgeuJIW1N7XmqcsbVeFqs14oTjHWsNqJvEajyn4oAgRih0+a81fnQez+56nnaq476VftPRYDAjFlrvd+Xee8PIyeyCvP60rc3K9PuBZFY9U7/qQgQMK8JBFQECLblNVmrlsheI2O/2v9qUBEg+BePWM3Vmdmw8oV22K/0fxe0705FgODjOevMPC6dZGbeBOlpY7TvOfu523+pnR5UBAjEN5h5co2kcqmeJ7sjkj3h2U1nYit9vTE3y5uhov1GM9VRESBIv9PPgmdl4x2RHvvV/l+2s8+IW+1QESBIvdPPwh2j9Un+z9qhIkCw/Rk6K2ZQnXeE7r/UDhUBgpQitNyeFRtVOUM77Xnzu6K/DxUBAnUfYeXkRM95vpl3VOG/xtPsS+U9qAgQqHlN19/o++yqEIlpfNv/1dUWFQECcWetRdmin3k4rcXyj6wvVeX/rJ7G6U9veY94AH4BbM+OlWvRZgYAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTQtMTAtMjNUMTY6MTk6MzUtMDY6MDCRv42YAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE0LTEwLTIzVDE2OjE5OjM1LTA2OjAw4OI1JAAAAABJRU5ErkJggg==';

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
var movespeed = 4;
var bounds;
var focused = true;
var inited = false;

var catstates = [
	[0,    0, 28, 24],
	[28,   0, 28, 24],
	[56,   0, 28, 24],
	[84,   0, 28, 24],
	[112,  0, 28, 24],
	[140,  0, 28, 24],
	[168,  0, 28, 24],

	[0,   24, 48, 24],
	[48,  24, 48, 24],
	[96,  24, 48, 24],
	[144, 24, 48, 24],

	[0,   48, 48, 24],
	[48,  48, 48, 24],
	[96,  48, 48, 24],
	[144, 48, 48, 24]
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
			e.returnValue = false;
		}
	});

	listener_add(document, 'keyup', function(e) {
		if(!has_focus()) { return; }

		var k = get_key(e);
		key_held[k] = false;

		if(k >= 37 && k <= 40) {
			e.returnValue = false;
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
	}

	if(key_held[40] || (!jumping && !sitting && !cantfall)) {
		y = y + movespeed;
	}

	if(jumping) {
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

	var walka = Math.floor(astep / 2) % 4;

	if(x > ox)
		catstate = 11 + walka;
	else
		catstate = 7 + walka;

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

