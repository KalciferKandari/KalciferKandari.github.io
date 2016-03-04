//----------
// Written by: Kalcifer Kandari
// Date: 25 September 2013 08:15:13
//----------
// Date: 2 March 2016 11:49:09

(function () {
    
    "use strict";
    
    var parameters = [
        [
            [0, 0],
            25,
            [300, 40],
            ["h1",
                ["fontSize", 1],
                ["marginTop", -0.2], // Moves everything but the logo down.
                ["paddingBottom", 0.76]
            ]
        ],
        [
            [0, 0],
            25,
            [1100, 80],
            ["#logo",
                ["height", 2.8],
                ["width", 2.8],
                ["marginTop", 1.7] // Moves whole page down.
            ]
        ],
        [
            [0, 0],
            25,
            [300, 30],
            ["#logo",
                ["paddingBottom", 1.4]
            ]
        ],
        [
            [0, 0],
            13,
            [256, 14],
            ["p, nav, a, ul, li, form, input, h2",
                ["fontSize", 1]
            ],
            ["#main",
                ["marginTop", 1]
            ]
        ]
    ];

    dynamicScale(parameters);

    window.onresize = function () {dynamicScale(parameters)} ; // JavaScript, it is as beautiful as it is mystical http://stackoverflow.com/questions/183214/javascript-callback-scope.

}());
