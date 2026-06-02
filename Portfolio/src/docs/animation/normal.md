# Normal

These are the more normal operations and use cases of animating text and shape inside a page so generally faster then the openings. Being more
speedy to not wane on the user's attention while still being intresting and cool smoothing out the experiance.

## Text

All text animations for normal animation opperations

### Large normal text

Here is a example of a longish piece of text animated in a normal fashion.

```
    animateText(
      { start: -64, end: 0, type: "words", mask: "words" },
      [{ element: footerHeadingText1 }, { element: footerHeadingText2 }],
      {
        duration: 0.5,
        stagger: 0.09,
        easing: "power1.out",
        staggerEase: "power1.out",
        timeline: timeline,
      },
    );
```

Notice the difference's

-- Duration 0.5 decreased from heading ani's of 0.5
-- Same easing
-- Stagger tripled to roughly equal char stagger on headings for a word stagger

### Short normal text

Here is a example of short text animations

```
    animateText(
      { start: 12, end: 0, type: "lines", mask: "lines" },
      [{ element: footerTextItems }],
      {
        duration: 0.4,
        easing: "power1.out",
        staggerEase: "power1.out",
        timeline: timeline,
        stagger: 0.03,
        offset: "<+=0.5",
      },
    );
```

These are the main differences

-- Duration decreased to 0.5
-- Same easing
-- Stagger at 0.03 for lines. Considering heading char's get 0.03 and normal word ani's get 0.09 this visually is vastly less.

## Shape

Normal shape animations look like so this was used for a large block in the skills section

```
      animateShapes(
        { start: 50, end: 0 },
        [{ element: mainCardBody }],
        {
          duration: 0.5,
          easing: "power1.out",
          timeline: timeline1,
        },
        {
          start: "top 85%",
        },
      );
```

Again note the following

-- Duration 0.5 decreased from the openings by 1s
-- Same easing
-- Same 50px movement

This is a smaller section of shapes used in the skills section

```
      animateShapes(
        { start: 50, end: 0 },
        [{ element: smallBlocks }],
        {
          duration: 0.4,
          stagger: 0.06,
          easing: "power1.out",
          staggerEase: "power1.out",
          timeline: timeline2,
        },
        {
          start: "top 85%",
        },
```

Again the main notes are

-- Duration decreased by 1s
-- Stagger at 0.6
