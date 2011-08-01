# jQuery Carosello

	$('#ca').carosello();
	
Carosello is another jQuery carousel. I've tried to implement this
one without too much bias, and with flexibility in mind. So for
example I decided not to implement any assumptions about how you
want to control your carosello. All I assume is that you want it
to go around.

These decisions also make it fairly lightweight, before minification
the plugin is around 8.7kb. I've uglified it down to 2.6kb. That's
some lightweight ish right there, compared to say jCarousel which is
35kb (15kb minified). Having said that jCarousel does more for you 
which can be a benefit, check it out :)

Still here? I presume you're after a more lightweight customisable
experience then. Read on for some usage detail...

## Usage

Most functionality can be expressed via configuration or specific
methods, that decision is yours. To get a basic carousel going
without controls you need to already implement the following HTML:

	<div id="ca">
		<ul>
			<li>
				<img src="..." />
			</li>
			<li>
				<img src="..." />
			</li>
			<li>
				<img src="..." />
			</li>
		</ul>
	</div>

The outer `<div>` is used to initiate `$.fn.carosello()`, inside that
you need another wrapper element in this case `<ul>`. Then each slide
item is an `<li>`. The JS required is also brief:

	$(function () {
		$('#ca').carosello().cycle.start();
	});
	
As it happens using methods is more succint here than configuration:

	$(function () {
		$('#ca').carosello({'cycle' : {'auto': true}});
	});
	
In other cases configuration can be more wieldy:

	$(function () {
		var $toggle = $('a.toggle');
		var $carosello = $('#ca').carosello({
			'axis' : 'y',
			'cycle' : {
				'onStart' : function () {
					$toggle.text('pause');
				},
				'onStop' : function () {
					$toggle.text('play');
				},
				'auto' : true
			}
		});
		$toggle.click(function () { $carosello.cycle.toggle(); });
	});
	
The above example turns your HTML into a vertical carousel. It also
implements toggle functionality. As you can see not everything can
be done with configuration but it certainly removes some boilerplate.

I have missed out the fact you need to do some things with CSS, but
if you checkout example.html you will see it's not much at all.

## API

I will write up the API another time, for now consult the source. I
hope you find it fairly explanatory.

## Future

I imagine a layer above this plugin, to provide an even simpler API
with a much more opinionated nature. However I have no personal need
for this and therefore the flexible nature of `$.fn.carosello` is a
feature for me.

## Author

Luke Morton

## License

MIT