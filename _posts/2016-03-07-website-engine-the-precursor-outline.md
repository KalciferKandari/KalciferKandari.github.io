---
#----------
# Written by: Kalcifer Kandari
# Date: 7 March 2016 16:12:54
#----------
date: 2016/03/07 16:12:54
title: "Website Engine: The Precursor Outline"
author: "Kalcifer_Kandari"
excerpt: ""
---

As a full website engine will be very time consuming, it will be astute to create part of it first, namely the client considering it is the most readily accessible by users. To emphasise this, the engine will initially be HTTP only, where the data for the site will be stored as GitHub pages as JSON, where it will be constructed on the client on top of browser abstraction libraries.

The engine will be a JavaScript client HTTP display engine, including a dynamic parser, and use GitHub pages as data storage. This will also void the need for Jekyll as the client will just pull the information it needs and compile it on-the-fly, as pages will be comprised of references (URLs) of other files. The disadvantages of this are firstly, that new pages will require 2 requests instead of 1, though this could be mitigated by automatically downloading all the page indexes of links to other pages on that are downloaded. And secondly, pushing updates to the site cannot be done within the website itself, which is more of a shortfall of GitHub pages.

The JavaScript library it will be built on is to be decided, but will likely be either JQuery, Bootstrap, or AngularJS. The only thing that is required is browser disparity abstraction.

---

[Previously in the series: "Website Engine: Outline"]({% post_url 2016-02-29-website-engine-outline %})