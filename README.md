# Suunto Ambit Interval App Generator
Simple application to generate interval-applications for Suunto Ambit watches.

The interval timer built in the watch only allows for either time or distance based intervals, with no target. Each interval needs to be of same distance/duration. This can be too limited, as you sometimes want to run intervals of different distances. For instance 1200m + 4x800m + 4x400m, at a given target such as 1200m @ 04:00/km pace, 800m @ 03:50/km pace and 400m @ 03:30/km pace.

This application lets you specify your interval set, and code generate two apps for the Suunto Ambit watch. One app will guide you on the duration of the intervall (for now, only distance based), and the other will guide you on target (for now, only pace based).

In the future I want to add duration based distances, and heart rate based targets.
