# Hero / headings

These are notes on long form animations used in the headings / page starter's for each page. They are usually longer then normal ones
and are as such bring more anticipation and aww.

## Text

Headings and important text animation opening use this pattern.

```
    animateText(
      { start: 96, end: 0, type: "lines", mask: "lines" },
      [{ element: heading }, { element: para }],
      {
        duration: 0.6,
        easing: "power1.out",
        stagger: 0.06,
        staggerEase: "power1.out",
        timeline: timelineRef.current,
        offset: "-=0.15",
      },
    );
```

Note the following

-- duration at 0.6
-- stagger at 0.06
-- easings at power1.out
-- start as the tallest letter
-- Animating lines
