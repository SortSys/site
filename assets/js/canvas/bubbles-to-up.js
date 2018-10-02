



;function canvasBubblesToUp(color1, color2){

    var width, 
        height, 
        largeHeader, 
        canvas, 
        ctx, 
        circles, 
        target, 
        animateHeader    = true,
        firstColor       = color1,
        elementIdForDraw = 'canvas-animation',
        secondColor      = color2;

    // Main
    initHeader();
    addListeners();

    function initHeader() {
        width = jQuery('#'+ elementIdForDraw).parent().eq(0).innerWidth();
        height = jQuery('#'+ elementIdForDraw).parent().eq(0).innerHeight();
        target = {x: 0, y: height};

        largeHeader = document.getElementById(elementIdForDraw);
        largeHeader.style.height = height+'px';

        canvas = document.getElementById(elementIdForDraw);
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create particles
        circles = [];
        for(var x = 0; x < width*0.2; x++) {
            var c = new Circle();
            circles.push(c);
        }
        animate();
    }

    // Event handling
    function addListeners() {
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in circles) {
                circles[i].draw();
            }
        }
        requestAnimationFrame(animate);
    }

    // Canvas manipulation
    function Circle() {
        var _this = this;

        // constructor
        (function() {
            _this.pos = {};
            init();
        })();

        function randomInteger(min, max) {
            var rand = min - 0.5 + Math.random() * (max - min + 1)
            rand = Math.round(rand);
            return rand;
        }

        function init() {
            _this.pos.x = Math.random()*width;
            _this.pos.y = height+Math.random()*1200;
            _this.alpha = 0.2+Math.random()*0.15;
            _this.scale = 0.1+Math.random()*0.9;
            _this.velocity = randomInteger(1,3);
            _this.color = Math.random();
        };

        

        this.draw = function() {
            if(_this.alpha <= 0) {
                init();
            }
            _this.pos.y -= _this.velocity;
            _this.alpha -= 0.0005;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale*12, 0, 2 * Math.PI, false);
            //ctx.fillStyle = 'rgba(29,67,103,'+ _this.alpha+')';

            if(_this.color > 0.5){
            	ctx.fillStyle = firstColor + _this.alpha+')';
            }

            else{
            	ctx.fillStyle = secondColor + _this.alpha+')';
            }
            ctx.fill();
        };
    }

};