---
#----------
# Written by: Kalcifer Kandari
# Date: 3 March 2016 23:54:09
#----------
date: 2016-02-29 23:54:09
title: "Website Engine: Outline"
author: Kalcifer_Kandari
excerpt: "Websites are great, most of the time, but there are some aspects to them that are mildly annoying that should not be there. Small things that take a lot of effort to fix. Here is a rough conceptual outline of architecture to fix them."
---

{% include contents.html %}

## 1. Introduction

Working on the architecture of a website engine. This is the first rough conceptual outline, consider it draft 1. So far it has several parts, namely:

- [The client engine](#client-engine), which displays the website in the client’s browser.
- [The server engine](#server-engine), which handles requests.
- [The data storage engine](#data-storage-engine), which stores and retrieves data in an efficient way.

## 2. Client Engine

A new display engine is necessary because currently websites have subtle problems that are overlooked. These include:

- The sending of a lot of redundant information, such as information that is already on the current page, which wastes bandwidth and time.
- Allowing the building or progressive loading to be seen by the user. This causes problems, such as the user trying to click a link that has loaded, but it being moved once the loading of other content is done, often causing the user to click a different link.
- The webpage displaying stale information.
- The storage of used information, such as pages automatically loading information, but not unloading it, which is a form of a memory leak.

To fix these problems pages are not stored contiguously, each part of content is stored separately so they can be used anywhere and many times. To facilitate this, everything has an identifier (ID), from every paragraph, to every page.  
Parts of pages are stored separately, and the main types of parts that make up pages are as follows:

- **Dynamic Markdown (DMD), for content.**  
This is how the structure of any content of pages is written, and is stored in a similar way. Instead of using extraneous HTML, content is stored without it separately. This allows layout to be applied to content later as DLSs. Content references the DSS, DE, and DLS it uses.
- **Dynamic Style Sheets (DSS), for style.**  
DSS is somewhat like Cascading Style Sheets (CSS), except it can directly reference functionality of DJS.
- **Display JavaScript (DJS), for dynamic display.**  
This is used specifically with DSS and with it effectively forms more powerful CSS that can change at runtime.
- **Dynamic Events (DE), for actions.**  
This is JavaScript that defines what something does when used. How these events are incorporated with other events on the page is to be decided.
- **Dynamic Layout Sheets (DLS), for layout.**  
DLS determines how content is laid out on the page, effectively converting it into HTML.

The purpose of the display engine is to determine how content is to be presented and controlled by the user.

The display engine is made up of the following:

- **Loader.**  
The loader controls, using DJS that is associated a particular structure element, how to load and unload the page, including individual parts, and what order to do so.
- **Cacher.**  
Caches things, such as information that is frequently being used, but not necessarily all the time.
- **DSS parser.**  
This converts DSS to CSS
- **DJS parser.**  
Incorporates DJS into the main JavaScript.
- **DE parser.**  
Incorporates DE into the main JavaScript.
- **DMD and DLS/Content parser.**  
This converts content as DMD to HTML using DLS.
- **Communicator.**  
The communicator handles connections with the server, and what ever else is connected to the page, which could be a WebRTC connection to a peer. Communication is always done with events, which are effectively commands, using socket.io for TCP connections, and WebRTC for UDP connections, including with the server.

## 3. Server Engine

The server engine handles requests from the client engine, for example:

- Data requests, which are forwarded to the data storage engine, which may be on the same machine or another server, consolidates the returned data to be sent to the client.
- Application requests, where the server engine processes some information.
- Request routing, where the server workloads are distributed to different servers.

Technically there is no distinction between data requests and application requests, as the data storage engine is an application. Everything that is sent across any network is just an event, which is a glorified command. All requests are the same.  
The serve engine just manages events, which is also essentially what the display engine does, and they may end-up being the same thing. The thing that distinguishes them is the event handlers.

Node.js is used on the server for effective asynchronous IO, and parity with the client, where it will be possible to have handlers run on both the client and the server.

## 4. Data Storage Engine

Data storage is essentially used instead of a filesystem so only the information that is required is sent. As such, the parts of webpages are stored separately and indexed.

As nothing is assumed of data storage, other than the storage of data itself, basic properties are required:

- **Searchability, using indexes.**  
Entry lookups need to be fast, and as such, have as few reads from disk as possible. This is done with indexes, which are essentially maps of the data that may be spread across different servers, and are usually held in memory. Indexes, being entries themselves, can also be indexed, creating the possibility of index routing to find data in highly distributed, extremely large data sets.
- **Consistency, using transactions.**  
All the data must remain consistent. Such as indexes remaining accurate with respect to the data itself, and the same data in more than one server being synchronised. Changes are not committed the information exists in non-volatile memory in all the locations.
- **Segmentability, using sharding.**  
The database files themselves must be splittable and redistributable across many servers in order to manage workload of those servers without high overhead.
- **Redundancy, using duplication and transactions.**  
In order to have backups, duplication and synchronisation of data is imperative to avoid loss of data. This is done by duplication of data with guaranteed consistency.
- **Burden balancing, using data routing.**  
Different servers may happen to be dealing with data with different demand, those under high workload should not be put under additional stress, and may also have burden relieved by having part of its data moved to a less stressed server.

Entries are stored as JSON where each object holds 1 isolated piece of information, and references to associated data. Indexes may only contain references, and of these entries, indexes have domain hierarchies to resolve large ranges of reference quickly. Entries are allocated a server based on how much burden servers are under, where the precise location is known by indexes.  
Entries can be an arbitrary length of bytes, and free space is mapped using indexes.

Files part of the larger data storage engine, can only be made longer without reading and then writing the entire file to disk, which is a limitation of filesystems. As much as it would be convenient to have every entry in a separate file, this comes with some expensive overhead, such as additional meta data and indexing of the filesystem by the operating system, and as such there is additional time for the filesystem to find the entry on top of the time it already takes the data storage engine to find it.

---

{: .centre}
[Next in the series: "Website Engine: The Precursor"]({% post_url 2016-03-07-website-engine-the-precursor-outline %})