---
#----------
# Written by: Kalcifer Kandari
# Date: 25 December 2015 06:06:59
#----------
layout: page
date: 2016-03-02 13:20:54
title: "Articles"
css:
     - "articles"
javascript:
    - "dynamicScaling"
    - "articles"
---

# {{ page.title }}

The point of this blog is to present technical musings of Kalcifer Kandari. The blog will *not* feature final papers, which will be hosted on [bioticpixels.com](http://bioticpixels.com/articles "bioticpixels.com/articles").
{% for article in site.posts %}
- [{% if article.longTitle %}{{ article.longTitle }}{% else %}{{ article.title }}{% endif %}]({{ article.url }} "{{ article.title }}")  
*By {{ site.data.authors[article.author].name }}, written on {{ article.date | date: "%-d %B %Y %T" }}*  
{{ article.excerpt }}
{% endfor %}