---
uid: notes_test_markdownhbs
title: Handlebars Combi Markdown
customWorld: Universe
tags:
- testing
---

This file tests if markdown and handlebars could play together in the same file.

Hallo {{customWorld}}!

```json
{
  "title": "{{title}}",
  "customWorld": "{{customWorld}}",
  "path": "{{path}}",
  "date_to_iso_via_helper": "{{dateFormatISO date}}"
}
```