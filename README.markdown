# jQuery Carosello

	$('#ca').carosello();
	
Carosello is another jQuery carousel. I've tried to implement this
one without too much bias, and with flexibility in mind. So for
example I decided not to implement any assumptions about how you
want to control your carosello. All I assume is that you want it
to go around.

## Usage

Most functionality can be expressed via configuration or specific
methods, that decision is yours. To get a basic carousel going
without controls you need to already implement the following HTML:

	<div id="ca">
		<div class="ca-container">
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
	</div>

The outer `<div>` is used to initiate `$.fn.carosello()`, you could
initiate multiple carousels within this element by including multiple
`div.ca-container`. The JS required is brief:

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
		$('#ca').carosello({
			'infinite' : true,
			'cycle' : {
				'step' : 1,
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
	
The above example turns on the infinite behaviour, that is, when the
carousel reaches it's last slide, it will continue to slide in the
same direction as if the slides were infinite. It also implements
toggle functionality. As you can see not everything can be done with
configuration but it certainly removes some boilerplate.

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