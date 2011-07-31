// jQuery Carosello by Luke Morton 2011
// Licensed under MIT
(function ($) {
    "use strict";

    // Global accessible
    $.carosello = {};
    
    // Provide global settings
    $.carosello.globalSettings = {
        // Namespace
        'ns' : 'ca',
        
        // Slider container
        'container' : '.ca-container',
        
        // Speed of slide animation
        'speed' : 500,
        
        // Default axis to slide along
        'axis' : 'x',
        
        // Are we looping infinitely?
        'infinite' : false,
        
        // What carosello index should we start on?
        'startIndex' : 0,
        
        // Shortcut to binding caChange
        'onChange' : null,
        
        // Work out animation object
        'animation' : function ($container, $target, settings) {
            var animate = {};
            
            // Animate in relation to axis
            if (settings.axis === 'x') {
                animate.scrollLeft = $container.scrollLeft() + 
                    $target.position().left;
            } else if (settings.axis === 'y') {
                animate.scrollTop = $container.scrollTop() +
                    $target.position().top;
            }
            
            return animate;
        },
        
        // Cycle settings
        'cycle' : {
        
            // Cycle step increment
            // Hint: -1 turns animation into rtl
            'step' : 1,
            
            // Speed of cycle
            'speed' : 3000,
            
            // Auto start?
            'auto' : false,
            
            // Shortcut to binding caCycleStart
            'onStart' : null,
            
            // Shortcut to binding caCycleStop
            'onStop' : null,
            
            // Shortcut to binding caCycleChange
            'onChange' : null
        }
    };
    
    // The plugin
    $.fn.carosello = function (settings) {
        
        // Alias for this
        var ca = this,
        
            // Get index from this
            getIndex = function () {
                return $(this).data(settings.ns + 'Index') || 0;
            },
            
            // Get normalised index (keeps index within contraints)
            nIndex = function (slideCount, index) {
                if (index < 0) { return slideCount - 1; } 
                if (index >= slideCount) { return 0; }
                return index;
            },

            // Create trick clone
            insertTrick = function ($parent, $slides, dir) {
                if (dir === 'ltr') {
                    return $slides.first().clone()
                        .appendTo($parent);
                }
                
                return $slides.last().clone()
                    .prependTo($parent);
            },
            
            // Get direction from step
            getDir = function (step) {
                if (step > 0) {
                    return 'ltr';
                } else if (step < 0) {
                    return 'rtl';
                } else {
                    return null;
                }
            },
            
            // Slide to index in a particular carosello element
            toIndex = function (index, callback) {
                var s = this,
                    $ca = $(this),
                
                    // Container elements
                    $cont = $ca.find(settings.container),
                    $contInner = $cont.children(),
                
                    // Slides
                    $slides = $contInner.children(),
                    slideCount = $slides.length,
                
                    // Current index
                    currentIndex = getIndex.call(this),
                
                    // Slide we are moving to
                    $target,
                    
                    // Step
                    step = index - currentIndex,
                    
                    // Which direction are we moving?
                    dir = getDir(step),
                    
                    // Are we tricking?
                    trickery = false;
                
                // Set carosello index on object
                $ca.data(settings.ns + 'Index', index);
                
                if (settings.infinite) {
                    // Insert trick if we are on last slide 
                    if (dir === 'ltr' && currentIndex >= slideCount - 1) {
                        $target = insertTrick($contInner, $slides, 'ltr');
                    } else if (dir === 'rtl' && currentIndex <= 0) {
                        $target = insertTrick($contInner, $slides, 'rtl');
                        
                        if (settings.axis === 'x') {
                            $cont.scrollLeft(
                                $slides.eq(currentIndex).position().left);
                        } else {
                            $cont.scrollTop(
                                $slides.eq(currentIndex).position().top);
                        }
                    }
                    trickery = !! $target;
                }
                
                if ( ! $target) {
                    $target = $slides.eq(nIndex(slideCount, index));
                }
                
                // Animate to scroll position
                $cont.animate(settings.animation($cont, $target, settings),
                    settings.speed, function () {
                    var stepsToGo;
                    
                    if (trickery) {
                        // Remove trickery now
                        $target.remove();
                        
                        if (dir === 'ltr') {
                            $target = $slides.first();
                            index = 0;
                            if (settings.axis === 'x') {
                                $cont.scrollLeft(0);
                            } else {
                                $cont.scrollTop(0);
                            }
                            stepsToGo = step - 1;
                        } else if (dir === 'rtl') {
                            $target = $slides.last();
                            index = slideCount - 1;
                            if (settings.axis === 'x') {
                                $cont.scrollLeft($target.position().left);
                            } else {
                                $cont.scrollTop($target.position().top);
                            }
                            stepsToGo = step + 1;
                        }
                        
                        $ca.data(settings.ns + 'Index', index);
                        
                        if (stepsToGo > 0) {
                            toIndex.call(s, stepsToGo, callback);
                            
                            // Do not trigger event or callback
                            return;
                        }
                    }
                    
                    // Slide change complete event
                    $ca.trigger(settings.ns + 'Change', [index, $target]);
                    
                    if (callback) {
                        callback.call(ca, index, $target);
                    }
                });
            };
        
        // Slide to index
        ca.toIndex = function (index, callback) {
            // This will no always be carosello
            // sometimes it will be one carosello of many
            this.each(function () {
                toIndex.call(this, index, callback);
            });
            return ca;
        };
        
        // Slide directly to element
        ca.to = function (obj, callback) {
            var $target = $(obj);
            
            // Stop cycling
            ca.cycle.stop();
            
            // Slide only those containing target to target's index
            ca.has($target).each(function () {
                var $ca = $(this);
                
                // TODO: I want to make the following line healthier
                // at some point
                var index = $ca.find(settings.container)
                    .children().children().filter($target)
                    .index();
                
                toIndex.call(this, index, callback);
            });
            
            return ca;
        };
        
        // Change target
        ca.step = function (step, callback) {
            return ca
                .each(function () {
                    toIndex.call(this, getIndex.call(this) + step, callback);
                });
        };
        
        // Go forward
        ca.next = function (callback) {
            return ca.step(+1, callback);
        };
        
        // Go back
        ca.previous = function (callback) {
            return ca.step(-1, callback);
        };
        
        ca.cycle = {
            // Global cycle instance
            instance : null,
        
            // Add cycle functionality
            start : function (speed) {
                // No multi cycling
                if (ca.cycle.instance !== null) {
                    return ca;
                }
                
                // Allow custom speed or use default
                speed = speed || settings.cycle.speed;
                
                function cycle() {
                    ca.cycle.instance = setTimeout(cycle, speed);
                    ca.step(settings.cycle.step, function (i, $t) {
                        ca.trigger(settings.ns + 'CycleChange', [i, $t]);
                    });
                }
                
                ca.cycle.instance = setTimeout(cycle, speed);
                ca.trigger(settings.ns + 'CycleStart');
                
                return ca;
            },
            
            // Allow the stopping of cycle
            stop : function () {
                if (ca.cycle.instance !== null) {
                    clearTimeout(ca.cycle.instance);
                    ca.cycle.instance = null;
                    ca.trigger(settings.ns + 'CycleStop');
                }
                return ca;
            },
            
            // Toggle does the right thing for you
            toggle : function () {
                if (ca.cycle.instance) {
                    return ca.cycle.stop();
                }
                
                return ca.cycle.start();
            }
        };
        
        // Publically accessible local settings
        settings = ca.settings = $.extend(true, {},
            $.carosello.globalSettings, settings);
            
        // Add shortcut callbacks if requested
        $.each(['Change'], function (i, val) {
            var c = settings['on' + val];
            if (c) { ca.bind(settings.ns + val, c); }
        });
        $.each(['Start', 'Stop', 'Change'], function (i, val) {
            var c = settings.cycle['on' + val];
            if (c) { ca.bind(settings.ns + 'Cycle' + val, c); }
        });
        
        // Auto start cycle?
        if (settings.cycle.auto) { ca.cycle.start(); }
        
        // Init
        return ca.each(function () {
            // Set axis class
            $(this).addClass(settings.ns + '-axis-' + settings.axis);
            
            // Always start on an index
            toIndex.call(this, settings.startIndex);
        });
    };
}(jQuery));