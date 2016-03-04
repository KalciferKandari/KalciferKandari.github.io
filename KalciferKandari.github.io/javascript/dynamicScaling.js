//----------
// Written by: Kalcifer Kandari
// Date: 28 September 2013 06:36:06
//----------
// Date: 2 March 2016 11:53:09

//---------- == Section
//========== == Function

//----------
// Dynamic Scale
//----------

// TODO What is this for, something to do with namespaces? …
(dynamicScale = function () {

    "use strict";
    
    //==========
    // Square
    //==========
    function square(x) {
    
        return x * x;
        
    }
    
    //==========
    // Dynamic scale
    //==========
    // TODO Improve API (getter and setters?).
    // TODO Improve ability to change non-numeric values, for example `text-align: justify;` to `text-align: none;`
    // TODO Extract the bezier function for use in other places, not just dynamicScaling(). quadraticBezierCurve().
    // TODO Extract the line function for use in other places, not just dynamicScaling(). line() or possible linearBezierCurve() depending on which formula is used.
    // TODO Should take height into account (does not function well on landscape smart phones) (whether the height or width is used should be based on ratio between them (should use the smallest)).
    // TODO To ensure that a scroll-bar is included, could just dynamically scale top margin, width, and font size (rather than unconventional auto CSS etc. (height not restricted)).
    // TODO Technically could scale anything.
    // TODO Automatically detect CSS styles to be scaled using comment markers.
    // TODO Improve comments.
    //
    // Note that with multiple line paragraphs, when words change line due to scaling, the size of the scaled fonts 'jumps' - this normal.
    //
    // Important: CSS must **not** contain styles with more than one value assigned, such as `margin: 10 20 5 15;`
    //
    // Simple callback function that ensures that fonts scale correctly for all devices - something not possible with the CSS vw units, and more elegant that @media.
    // Utilises quadratic bezier curve (y = (1 - t)^2"p0" + 2(1 - t)t"p1" + t^2"p2", where t is progress between p0 and p2 ε [0, 1] (http://en.wikipedia.org/wiki/Bézier_curve)) and linear equation (y = m * x + b, where x is windowWidth)
    //
    // Must create 'dynamicScalingParameters' variable compliant with the following prototype:
    //
    // [[[float windowWidthKey (value of 0 recommended), float sizeKey0 (value of 0 recommended)], float sizeKey1 (steepness of line - relative to minimumSizeKey, also the y intersect), [float maximumWindowWidthKey (for bezier scaling to take effect), float minimumSizeKey (before bezier scaling takes place), [string selector, [string property (properties to effect), float modifier (should not be 0) | <modifier>[string value0, string value1]], [...]], [...]], [...]]
    //
    // Explanation:
    //    [
    //        [0, 0], // Window width key, size key 0.
    //        25, // Size key 1 (steepness of line - relative to minimum size key).
    //        [300, 40], // Maximum window width key (for bezier scaling to take place), minimum size key (for bezier scaling to take place).
    //        ["selector", // Selector.
    //            ["property", 1], … // Property, modifier.
    //        ],
    //        …
    //    ]
    //
    // Looping key:
    // [<curves>[<p0>[<windowWidthKey>x, <sizeKey>y], <b>p1, <p2>[<minimumWindowWidthKey>x, <minimumSizeKey>y], <styles>[selector, <properties>[property, modifier], [...]], [...]], [...]]
    function dynamicScale(parameters) {
    
        //----------
        // Get CSS.
        //----------
        // Retrieve external CSS styles (assumes there is only one stylesheet as the title attributes is an empty string, making it difficult to distinguish between them).
        var css = document.styleSheets[0];
        var block = css.cssRules ? css.cssRules : css.rules;
            
        var windowWidth = window.innerWidth;
            
        //----------
        // Iterate through the parameters.
        //---------- start
        // Iterate through the multidimensional parameters array (chosen for superior computing speed).
        
        //----------
        // For every curve. (Top array).
        //----------
        var curvesCounter = 0;
        var parametersLength = parameters.length;
        for (curvesCounter; curvesCounter < parametersLength; curvesCounter++) {
            
            // Point 0 on the x axis. Window width.
            var p0X = parameters[curvesCounter][0][0];
            // Point 0 on the y axis. Size key 0.
            var p0Y = parameters[curvesCounter][0][1];
            // Point 1 on the x axis. 
            var p1X = 0;
            // Point 1 on the y axis. Size key 1, the steepness of line - relative to minimumSizeKey, also the y intersect.
            var p1Y = parameters[curvesCounter][1];
            // Point 2 on the x axis. Maximum window width for bezier scaling to take effect.
            var p2X = parameters[curvesCounter][2][0];
            // Point 3 on the y axis.  Minimum size before bezier scaling takes place.
            var p2Y = parameters[curvesCounter][2][1];
            
            //----------
            // For every CSS code block. (First nested array).
            //----------
            var blockCounter = 0;
            var blockLength = block.length;
            for (blockCounter; blockCounter < blockLength; blockCounter++) { 
                
                //----------
                // For every CSS style. (Second nested array).
                //----------
                var stylesCounter = 3;
                var numberOfCurves = parameters[curvesCounter].length;
                for (stylesCounter; stylesCounter < numberOfCurves; stylesCounter++) { 

                    var selector = parameters[curvesCounter][stylesCounter][0];

                    //----------
                    // If the CSS code block in the external CSS file matches the parameter. (Third nested array).
                    //----------
                    // WARN Was block.block[blockCounter].selectorText.toLowerCase(), but this stopped id name comparisons from working - not including toLowerCase() may cause a problem.
                    if (block[blockCounter].selectorText === selector) { 
                        
                        //----------
                        // For every CSS property. (Third nested array).
                        //----------
                        var propertiesCounter = 1;
                        var numberOfStyles = parameters[curvesCounter][stylesCounter].length;
                        for (propertiesCounter; propertiesCounter < numberOfStyles; propertiesCounter++) { 

                            var property = parameters[curvesCounter][stylesCounter][propertiesCounter][0];
                            var modifier = parameters[curvesCounter][stylesCounter][propertiesCounter][1]; // TODO if === 0, throw error.
                            
                            if (modifier && isNaN(modifier)) { // TODO Improve.
                                if (windowWidth < p2X) {
                                
                                    block[blockCounter].style[property] = modifier[0]; // TODO Validation? …
                                    
                                } else {
                                
                                    block[blockCounter].style[property] = modifier[1]; // TODO Validation? …
                                    
                                }
                                
                            } else {
                            
                                var algebra;
                                
                                // If the window width is within the bounds for quadratic bezier curve.
                                if (windowWidth >= p0X && windowWidth < p2X) {
                                
                                    // Do quadratic bezier curve algebra
                                
                                    var t = windowWidth / p2X; // t is just the percentage progress between p0 and p2 represented as a number between 0 and 1.
                                    algebra = (square(1 - t)) * p0Y + (2 * (1 - t) * t * p1Y) + (square(t)) * p2Y;
                                    
                                } else {
                                    
                                    // Do linear algebra
                                
                                    algebra = ((p2Y - p1Y) / p2X) * windowWidth + p1Y;
                                    
                                }

                                block[blockCounter].style[property] = String(algebra * modifier) + "px";
                                
                            }
                        }
                    }
                }
            }
        }
        
        //----------
        // Iterate through the parameters.
        //---------- end
        
    }
    
    return dynamicScale;
    
}());