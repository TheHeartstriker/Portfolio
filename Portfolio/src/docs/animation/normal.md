# Normal

These are the more normal operations and use cases of animating text and shape inside a page so generally faster then the openings. Being more
speedy to not wane on the user's attention while still being intresting and cool smoothing out the experiance.

//
//
//
//
//

## Buttons

All text animations for normal animation opperations or similar in nature animations

### Normal button

Here is a example of a normal button animation

```
.skills-con-heading-left-control button {
  border: none;
  background-color: var(--dark-2);
  border-radius: var(--border-radius);
  cursor: pointer;
  height: var(--typo-size-48);
  aspect-ratio: 1 / 1;
  transition: background-color var(--motion-medium-2) var(--power-2-out);
}
```

Notice the difference's

-- Note medium duration
-- Power 2 out for snapper ani

### Decending button / list

Here is a example of a decending button used in the FAQ it's longer then normal as a result of being a larger action

```
.faq-con-ans-item p {
  font-size: var(--typo-size-14);
  color: var(--dark-3);
  max-height: 0;
  transition:
    max-height var(--motion-large-2) var(--power-1-out),
    margin-bottom var(--motion-large-2) var(--power-1-out);
}
```

While the animations till user's this for it quciker sections following normal behovior

```
.faq-con-ans-item-top svg path {
  stroke: var(--dark-3);
  transition:
    stroke var(--motion-medium-2) var(--power-2-out),
    transform var(--motion-medium-2) var(--power-2-out);
}
```

Notice the difference's

-- The duration move up two dobule so from a 300ms button to a 600ms
-- Easing lower to power-1 on the long animation
-- We still follow the button animation comon aka 400ms at power-2

//
//
//
//
//

## Text

All normal text opperations / timings.

### Skills page text change

This is largely just a text change nothing special really just animated

```
animateText(
  { start: 32, end: 0, type: "lines", mask: "lines" },
  [
    { element: newDetails },
    {
      element: newHeading,
      clip: true,
      clipAmount: {
        bottom: "0.1em",
        top: "0em",
        left: "0em",
        right: "0em",
      },
    },
  ],
  {
    duration: 0.3,
    easing: "power2.out",
    stagger: 0.06,
    staggerEase: "power2.out",
    timeline: revealTimeline,
    offset: "+=0",
  },
);
```

But notice the difference's

-- The easing is power-2 out longer hero text is power-1 out
-- The easing power-2 is the same as most normal animations
-- The duration is the same as the button's hover duration at 400ms

//
//
//
//
//

## Fades

Fades are slightly special in a sense. There is long form fade's and short

### Short form

This is a text fade it's largely the same as most normal animation's aka power-2

```
     opacity: 0,
      duration: 0.2,
      ease: "power2.out",
```

-- This is exactly half the duraction of it's child ani(the normal text ani)

### Long form

The long form is like so pretty much the same but the duration is doubled plus a but more

```
          autoAlpha: 0,
          duration: 0.45,
          ease: "power2.out",
```

-- This is almost double what came before plus some becuase this is used to encompase a large item(nav)
