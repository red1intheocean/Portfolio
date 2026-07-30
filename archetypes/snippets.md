---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
tags: []
draft: true
---

<!-- Brief description of what this snippet does -->

{{</* codeblock lang="c" filename="{{ .File.ContentBaseName }}.c" */>}}
// code here
{{</* /codeblock */>}}
