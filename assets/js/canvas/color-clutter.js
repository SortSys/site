		// twitter @msvaljek

		// https://msvaljek.blogspot.com/2013/09/canvas-plasma-particles.html

		// standard shim

	;function colorClutter(){
		var myRequestAnimationFrame =  window.requestAnimationFrame ||
			  window.webkitRequestAnimationFrame ||
			  window.mozRequestAnimationFrame    ||
			  window.oRequestAnimationFrame      ||
			  window.msRequestAnimationFrame     ||
			  function(callback) {
				  window.setTimeout(callback, 10);
			  };
		window.requestAnimationFrame=myRequestAnimationFrame;

		// dom stuff
		var canvas = document.getElementById('canvas-animation');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		var ctx = canvas.getContext('2d');
		ctx.globalCompositeOperation = 'lighter';

		function randomMax(max) {
			return Math.floor(Math.random() * max);
		}
		function distance(a, b) {
			return ~~Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
		}

		var particleBackground = 'rgba(0, 0, 0, 0)',
			numParticles = 70,
			radiusmax = 100,
			flashfactor = 5,
			miParticleSize = 20,
			criticalDistance = 150,
			colorSet = [
				'Aqua',
				'BlueViolet',
				'CornflowerBlue',
				'DeepPink',
				'Gold',
				'SpringGreen',
				'Tomato'
			],
			fillStyle;

		var Particle = function (ind) {
			this.ind = ind;
			this.x = randomMax(canvas.width);
			this.y = randomMax(canvas.height);
			this.dy = -5 + randomMax(10);
			this.dx = -5 + randomMax(10);
			this.r = randomMax(radiusmax);
			this.color = colorSet[Math.floor(Math.random() * colorSet.length)];
		};

		Particle.prototype.draw = function () {
			this.r = this.r > miParticleSize ? flashfactor * (Math.log(this.r) / Math.LN10) : miParticleSize;
			this.y += this.dy;
			this.x += this.dx;
			
			for (var i = this.ind + 1; i < particleSystem.particles.length; i++) {
				if (distance(this, particleSystem.particles[i]) < criticalDistance && this.color === particleSystem.particles[i].color) {
					this.r = radiusmax;
					particleSystem.particles[i].r = radiusmax;
				}
			}

			if (this.y > canvas.height || this.x < 0 || this.x > canvas.width || this.y < 0 || (this.dy === 0 && this.dx === 0)) {
				this.x = randomMax(canvas.width);
				this.y = randomMax(canvas.height);
				this.dy = -5 + randomMax(10);
				this.dx = -5 + randomMax(10);
			}

			ctx.beginPath();
			
			fillStyle = ctx.createRadialGradient(this.x, this.y, this.r * 0.001, this.x, this.y, this.r);
			fillStyle.addColorStop(0, this.color);
			fillStyle.addColorStop(1, particleBackground);
			
			ctx.fillStyle = fillStyle;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
			ctx.fill();
		};

		var ParticleSystem = function () {
			ctx.lineWidth = 1;
			this.particles = [];
			
			for (var i = 0; i < numParticles; i++) {
				this.particles.push(new Particle(i));
			}
		};
		ParticleSystem.prototype.draw = function () {
			this.particles.forEach(function(particle) {
				particle.draw();
			});
		};

		var particleSystem = new ParticleSystem();


		window.onresize = function() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			ctx.globalCompositeOperation = 'lighter';
			particleSystem = new ParticleSystem();
		};

		(function animloop(){
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			particleSystem.draw();
			
			requestAnimationFrame(animloop);
		})();
	};