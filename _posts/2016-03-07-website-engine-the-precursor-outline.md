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

As a full website engine will be very time consuming, it will be astute to create part of it first, namely the client considering it is the most readily accessible by users. To emphasise this, the engine will initially be HTTP only, where the data for the site will be stored as GitHub pages as JSON, where it will be constructed on the client on top of browser abstraction libraries, which are to be decided, but will likely be either JQuery, Bootstrap, or AngularJS.

As much as this engine with GitHub pages would not be suitable for production, as the interface is more complicated than what is acceptable for users, it is a good use-case and proof-of-concept for the display engine, and will create the framework necessary for two-way communication with the server.

The engine will be a JavaScript client HTTP display engine, including a dynamic parser, and use GitHub pages as data storage. This will also weaken the need for Jekyll, as the client will just pull the information it needs and compile it on-the-fly, as pages will be comprised of references (URLs) of other files. There are a few disadvantages though:

- Firstly, new pages will require 2 requests instead of 1, though this could be mitigated by automatically downloading all the page indexes of links to other pages that are downloaded.
- Secondly, pushing updates to the site cannot be done within the website itself, which is more of a shortfall of GitHub pages.
- Thirdly there are issues with dynamically generated pages where knowledge of all the pages that exist is required, which would make it inefficient for the client to do.

Certain abilities require either a site compiler or a server, where the server becomes increasingly attractive as the site becomes larger.

After the completion of the client HTTP display engine, the hosted node.js server can be created using an existing database engine for data storage, which would likely be OrientDB for the scaling and transactions. At this stage the website engine should be production-ready.

Once two-way communication between the client and server is complete, work can begin on the new data storage engine, which is likely to be the most complicated aspect.

---

{: class="centre"}
[Previously in the series: "Website Engine: Outline"]({% post_url 2016-02-29-website-engine-outline %})