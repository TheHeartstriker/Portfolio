# Openings / headings

These are notes on long form animations used in the headings / page starter's for each page. They are usually longer then normal ones
and are as such bring more anticipation and aww.

## Text

Headings and important text animation opening use this pattern. Which was used for the opening of the about page

```
    animateText(
      { start: -64, end: 0, type: "chars", mask: "lines" },
      [{ element: subHeader }, { element: header }],
      {
        duration: 0.6,
        stagger: 0.03,
        easing: "power1.out",
        staggerEase: "power1.out",
        timeline: timeline,
      },
    );
```

Note the following

-- duration at 0.6
-- stagger at 0.03
-- easings at power1.out
-- start as the tallest letter
-- Animating char's

## Shape

While shape animation's if used in the opening look like so. Which was also used for the opening of the about page

```
    animateShapes({ start: 50, end: 0 }, [{ element: blocks }], {
      duration: 0.6,
      easing: "power1.out",
      staggerEase: "power1.out",
      offset: "-=0.25",
      stagger: 0.15,
      timeline: timeline,
    });
```

Note the following

-- Duration yet again at 0.6
-- stagger at 0.15 increased because of the few elements
-- Easing at power1.out
-- start of 50
