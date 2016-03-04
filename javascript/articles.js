//----------
// Written by: Kalcifer Kandari
// Date: 28 September 2013 08:02:16
//----------
// Date: 2 March 2016 12:24:39
// TODO Indicate where code in <pre> tags has been wrapped

(function () {

    "use strict";
    
    var h1FontSize = 0.5;
    var h1LineHeight = 0.6;
    var parameters =[
        [
            [0, 0],
            20,
            [300, 30],
            ["h1, h2, h3, h4, h5, h6, #name",
                ["fontSize", 1],
                ["marginTop", 0.2],
                ["marginBottom", 0]
            ],
            ["#name",
                ["fontSize", 0.9],
                ["marginLeft", 0.2]
            ],
            ["#logo",
                ["height", 1.5],
                ["width", 1.5],
                ["marginTop", -0], // Move everything on the page up and down.
                ["marginBottom", -0.4], // Move the image up and down.
                ["marginLeft", 0.3] // Move the image and text left from the left.
            ],
            ["h1",
                ["fontSize", h1FontSize],
                ["marginTop", 0.4],
                ["lineHeight", h1LineHeight]
            ],
            ["h2",
                ["fontSize", (h1FontSize / 6 * 5)],
                ["lineHeight", (h1LineHeight / 6 * 5)]
            ],
            ["h3",
                ["fontSize", (h1FontSize / 6 * 4)],
                ["lineHeight", (h1LineHeight / 6 * 4)]
            ],
            ["h4",
                ["fontSize", (h1FontSize / 6 * 3)],
                ["lineHeight", (h1LineHeight / 6 * 3)]
            ],
            ["h5",
                ["fontSize", (h1FontSize / 6 * 2)],
                ["lineHeight", (h1LineHeight / 6 * 2)]
            ],
            ["h6",
                ["fontSize", (h1FontSize / 6 * 1)],
                ["lineHeight", (h1LineHeight / 6 * 1)]
            ],
            ["nav",
                ["marginBottom", 0.4],
                ["marginTop", 0.3]
            ]
        ],
        [
            [0, 0],
            275,
            [300, 350],
            ["body",
                ["maxWidth", 1]
            ]
        ],
        [
            [0, 0],
            9,
            [256, 10],
            ["body",
                ["fontSize", 1.1],
                ["paddingTop", 1],
                ["paddingRight", 1],
                ["paddingLeft", 1]
            ],
            ["p",
                ["paddingTop", 1]
            ],
            ["hr",
                ["marginTop", 1],
                ["marginBottom", -0.1],
                ["borderWidth", 0.1]
            ],
            ["blockquote, ul, ol, dl",
                ["marginBottom", 0],
                ["paddingLeft", 2]
            ],
            ["ul li, ol li",
                ["paddingLeft", 0.3]
            ],
            ["ul, ol, dl",
                ["paddingTop", 1]
            ],
            ["pre, code",
                ["borderWidth", 0.1],
                ["borderRadius", 0.3]
            ],
            ["pre",
                ["marginTop", 1]
            ],
            ["code",
                ["padding", 0.1]
            ],
            ["pre code",
                ["padding", 1],
                ["paddingLeft", 1],
                ["paddingRight", 1]
            ]
        ]
    ];

    dynamicScale(parameters);

    window.onresize = function () {dynamicScale(parameters)} ; // JavaScript, it is as beautiful as it is mystical http://stackoverflow.com/questions/183214/javascript-callback-scope.

}());
