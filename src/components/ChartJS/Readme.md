### Line Chart Advanced Config

```
{
    label: "Earning",
    data: [43, 30, 48, 47, 70, 30, 43, 30, 48, 47, 70, 30],
    fill: true,
    shadowOffsetX: 3,
    shadowOffsetY: 3,
    shadowBlur: 10,
    shadowColor: "rgba(103, 116, 132, 0.5)",
    pointRadius: 4,
    pointBevelWidth: 3,
    pointHoverRadius: 6,
    pointHoverBevelWidth: 4.5,
    pointHoverInnerGlowWidth: 20,
    pointHoverInnerGlowColor: `rgba(103, 116, 132, 0.5)`,
    gradientStroke: [
        { stop: 0, color: colors.blue.base },
        { stop: 0.5, color: colors.teal.base }
    ],
    gradientFill: [
        { stop: 0, color: colors.blue.lighten5 },
        { stop: 0.5, color: colors.teal.lighten5 }
    ],
    linearStroke: [500, 0, 100, 0]
}
```
