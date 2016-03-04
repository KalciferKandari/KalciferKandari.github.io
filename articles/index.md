---
#----------
# Written by: Kalcifer Kandari
# Date: 25 December 2015 06:06:59
#----------
layout: article
date: 2016-03-02 13:20:54
title: "Articles"
css:
     - "articles"
javascript:
    - "dynamicScaling"
    - "articles"
---
# Articles

{% for article in site.posts %}
- [{% if article.longTitle %}{{ article.longTitle }}{% else %}{{ article.title }}{% endif %}]({{ article.url }} "{{ article.title }}")  
*By {{ site.data.authors[article.author].name }}, written on {{ article.date | date: "%-d %B %Y %T" }}*  
{{ article.excerpt }}
{% endfor %}