# Normal

These are the more normal operations and use cases of animating text and shape inside a page so generally faster then the openings. Being more
speedy to not wane on the user's attention while still being intresting and cool smoothing out the experiance.

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

-- Note medium duration and power-2 out
-- Same easing

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

-- The duration move up two places in the list(200ms up for a 600ms total)
-- Easing is smoother as a result of a longer animation
