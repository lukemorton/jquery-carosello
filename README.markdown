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

## $.fn.carosello( [settings] )

The `$.fn.carosello` method takes an option set of key/value pairs
that configure the carousel. Please find a description of the
available settings below.

### ns (string)

**Default:** 'ca'

A simple string namespace used for namespacing events and classes
used by Carosello.

### speed (integer)

**Default:** 500

The speed at which a transition occurs in milliseconds. This can
also be set to 'slow' or 'fast'.

### axis (string)

**Default:** 'x'

This is the axis the default animation will slide along. You can
only set this value to 'x' or 'y'.

### infinite (boolean)

**Default:** true

A boolean value that indicates if we looping infinitely. An
infinite loop is created by cloning elements to give the appearance
there is no end to the slides within the carousel.

### startIndex (integer)

**Default:** 0

This is the starting index the carousel will slide to on
initialisation.

### onChange(event, index, $target) (function)

**Default:** null

Shortcut to binding the caChange event. The caChange event is
triggered after the slide has changed.

### animation($container, $target, settings) (function)

**Default:** function

Method to create animation object. Can be overloaded to provide a
custom animation for transitioning slides.

### cycle.step (integer)

**Default:** 1

A signed integer that indicates the number of steps to be taken in
a single cycle.

### cycle.speed (integer)

**Default:** 3000

The duration for which each slide will stay still before
transitioning to the next.

### cycle.auto (boolean)

**Default:** false

A boolean vallue representing whether the cycle should start when
the carosello is initialised.

### cycle.onStart(event) (function)

**Default:** null

A shortcut to the caCycleStart event. This event is trigged when the
cycle is first started.

### cycle.onStop(event) (function)

**Default:** null

A shortcut to the caCycleStop event. This event is trigged when the
cycle is first stopped.

### cycle.onChange(event, index, $target) (function)

**Default:** null

Shortcut to binding the caCycleChange event. The caCycleChange event
is triggered after the slide has changed during a cycle.

## Methods of $.fn.carosello

Please find below a description of additional methods attached to
the standard jQuery methods returned by `$.fn.carosello`.

### .toIndex( index, [callback] )

Slide to a particular index. Starting with 0 for the first slide and
incrementing upwards you can slide efficiently.

**index (integer)** the index to slide to

**callback(index, $target) (function)** a callback for when the
transition complete

### .to( selector, [callback] )

Slide to a particular element by CSS style selector.

**selector (string)** jQuery CSS style selector of the element you
wish to slide to

**callback(index, $target) (function)** a callback for when the
transition complete

### .to( DOMElement, [callback] )

Slide to a particular element by DOMElement.

**DOMElement (DOMElement)** the DOMElement to slide to

**callback(index, $target) (function)** a callback for when the
transition complete

### .to( jQuery, [callback]) 

Slide to a particular element by jQuery object.

**jQuery (jQuery)** the jQuery element to slide to

**callback(index, $target) (function)** a callback for when the
transition complete

### .step( steps, [callback] )

Slide a certain number of steps.

**steps (integer)** the amount of steps to slide

**callback(index, $target) (function)** a callback for when the
transition complete

### .next( [callback] )

Slide to the next slide.

**callback(index, $target) (function)** a callback for when the
transition complete

### .previous( [callback] )

Slide to the previous slide.

**callback(index, $target) (function)** a callback for when the
transition complete

### .cycle.start( [callback] )

Start a carousel cycle, i.e. a slideshow.

**callback(action) (function)**

### .cycle.stop( [callback] )

Stop a carousel cycle.

**callback(action) (function)**

### .cycle.toggle( [callback] )

Toggle a carousel cycle on and off.

**callback(action) (function)**

## Future

I imagine a layer above this plugin, to provide an even simpler API
with a much more opinionated nature. However I have no personal need
for this and therefore the flexible nature of `$.fn.carosello` is a
feature for me.

## Author

Luke Morton

## License

MIT