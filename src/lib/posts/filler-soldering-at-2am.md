---
title: Soldering at 2am
lines: Soldering | at 2am
color: #ffc400
date: 2026-09-04
tldr: Filler post. A test of a longer body with headings, lists, and code.
---

This is a filler post to test the layout. None of it is real.

## The setup

A cheap iron, a roll of leaded solder, and a board that did not want to work. The plan was simple:

- tin the tip
- heat the pad, not the solder
- count to two
- hope

## What went wrong

Everything. The first joint was cold. The second joint bridged two pins. The third joint was fine, but it was on the wrong pad.

> Measure twice, solder once. Then desolder, because you measured wrong.

## A bit of code

```
always @(posedge clk) begin
  if (rst) count <= 0;
  else     count <= count + 1;
end
```

Some `inline code`, some **bold text**, some *italic text*, and a [link to nowhere](https://example.com).

This paragraph is here to make the page long enough to scroll, so the reading progress pie in the corner has something to do. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
