---
#----------
# Written by: Kalcifer Kandari
# Date: 3 March 2016 23:54:09
#----------
date: 2016-02-29 23:54:09
title: "Website Engine"
author: Kalcifer_Kandari
excerpt: "Websites are great, most of the time, but there are some aspects to them that are mildly annoying and should have been fixed already. Things such as those times when a page almost loads, but then loads a bit more and moves a link you are about to press just a enough for you to click a different one. Looking at you Google.com. And the fact that most website send the parts of the webpage that don’t change with every request. Small things that take a lot of effort to fix."
---

# {{ page.title }}

*Written by: {{ site.data.authors[page.author].name }}*  
*Date: {{ page.date | date: "%-d %B %Y %T" }}*

## 0. Abstract

{{ page.excerpt }}

## 1. Table of Contents

Use `command + up` or `control + up` to come back to the table of contents.

* TOC
{:toc}

## 2. Introduction

Working on the architecture of a website engine, this is the first rough conceptual outline, consider it draft 1. So far it has several parts, namely:

- [The display engine](#display-engine), which displays the website in the client’s browser.
- [The server engine](#server-engine), which handles requests.
- [The data storage engine](#data-storage-engine), which stores and retrieves data in an efficient way.

## 3. Display Engine

A new display engine is necessary because currently websites have subtle problems that are overlooked. These include:

- The sending of a lot of redundant information, such as information that is already on the current page, this wastes bandwidth, and time.
- Allowing the building or progressive loading to be seen by the user. This causes problems, such as the user trying to click a link that has loaded, but it being moved once the loading of other content is done, often causing the user to click another link.
- The webpage displaying stale information.

To fix these problems pages are not stored contiguously, each part of content is stored separately so more than any part can use any other part. Everything has an ID, every part, and every collection of parts as IDs, such as pages. Parts are stored separately, and the main types of parts that make up pages are as follows:

- **Dynamic Markdown (DMD), for content.**  
This is how the structure of any content of pages is written, and is stored in a similar way. Instead of using extraneous HTML, content is stored separately. This allows layout to be applied to content later as DLSs. Content references the DSS, DE, and DLS it uses.
- **Dynamic Style Sheets (DSS), for style.**  
DSS is somewhat like Cascading Style Sheets (CSS), except it can directly reference functionality of DJS. DSS references DJS directly.
- **Display JavaScript (DJS), for dynamic display.**  
This is used specifically with DSS and with it effectively forms more powerful CSS.
- **Dynamic Events (DE), for actions.**  
This is JavaScript that defines what something does when used. How these events are incorporated with other events on the page is to be decided.
- **Dynamic Layout Sheets (DLS), for layout.**  
DLS determines how content is laid out on the page, effectively converting it into HTML.

The purpose of the display engine is to determine how content is to be presented and controlled by the user.

The display engine has the following:

- **Loader.**  
The loader controls, using DJS that is associated a particular structure element, how to load and unload the page, including individual parts, and what order to do so.
- **Cacher.**  
Caches things, such as information that is frequently being used, but not necessarily right now.
- **DSS parser.**  
This converts DSS to CSS
- **DJS parser.**  
Incorporates DJS into the main JavaScript.
- **DE parser.**  
Incorporates DE into the main JavaScript.
- **DMD and DLS/Content parser.**  
This converts content to HTML using DLS.
- **Communicator.**  
The communicator handles connections with the server, and what ever else is connected to the page, which could be a WebRTC connection to a peer. Communication is always done with events, which are effectively commands, using socket.io for TCP connections, and WebRTC for UDP connections, including with the server.

## 4. Server Engine

The server engine handles requests from the client engine, including:

- Data requests, which are forwarded to the data storage engine, which may be on the same machine or another server, consolidates the returned data to be sent to the client.
- Application requests, where the server engine runs code.
Request routing, where the server workloads are distributed to different servers.

Node.js is used for effective asynchronous IO.

## 5. Data Storage

Engine Data storage is essentially used instead of a filesystem so only the information that is required is sent. As such, the parts of webpages are stored separately and indexed.

As nothing is assumed of data storage, other than the storage of data itself, basic properties are required:

- **Searchability, using indexes.**  
Entry lookups need to be fast, and as such, have as few reads from disk as possible. This is done with indexing, which are essentially maps of the data, that may be spread across different servers, and are usually held in memory. Indexes, being entries themselves, can also be indexed, creating the possibility of index routing to find data in highly distributed, extremely large data sets.
- **Consistency, using transactions.**  
All the data must remain consistent. Such as indexes remaining accurate with respect to the data itself, and the same data in more than one server being synchronised.
- **Segmentability, using sharding.**  
The database files themselves must be splittable and redistributable across many servers in order to manage workload.
- **Redundancy, using duplication and transactions.**  
In order to have backups, duplication and synchronisation of data is imperative to avoid loss of data. This is done by duplication of data with guaranteed consistency.
- **Burden fairness, using data routing.**
Different servers may happen to be dealing with data with different amounts of demand, those under high workload should not be put under additional stress, and may also have burden relieved by having part of its data moved or duplicated to a less stressed server.

Entries are stored as JSON where each object holds 1 isolated piece of information, and references to associated data. Entries may only contain references, and of these entries, indexes have domain hierarchies to resolve large ranges of reference quickly. Entries are allocated a server based on how much burden servers are under, where the precise location is known by indexes.  
Entries can be an arbitrary length of bytes, and free space is mapped using indexes.

Databases, which are individual files part of the larger data storage engine, can only be made longer without reading and then writing the entire file to disk. This is a limitation of filesystems. As much as it would be convenient to have every entry in a separate file, this comes with some expensive overhead, such as addition meta data and indexing of the filesystem by the operating system, and as such the additional time it takes for the filesystem to find the entry on top of the time it takes the data storage engine to find it.

{% include footer.html %}