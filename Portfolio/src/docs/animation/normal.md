# Normal

These are the more normal operations and use cases of animating text and shape inside a page so generally faster then the openings. Being more
speedy to not wane on the user's attention while still being intresting and cool smoothing out the experiance.

## Text

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
