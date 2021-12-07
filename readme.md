# intersect-great-circle

calculate the intersection of two great circle arcs

if there is no intersection, return null

algorithm based on https://www.edwilliams.org/intersect.htm

# example

``` js
var intersect = require('intersect-great-circle')
var seattle = [-122.33,+47.61]
var chicago = [-87.65,+41.85]
var denver = [-104.98,+39.74]
var calgary = [-114.09,+51.05]

console.log(intersect([],seattle,chicago,denver,calgary))
```

output:

```
[ -110.25059713305886, 46.91934833795278 ]
```

# api

```
var intersect = require('great-circle-intersect')
```

## intersect(out, A, B, C, D, epsilon=1e-8)

Calculate the intersection of 2 arcs defined by the points `A`, `B`, `C`, and `D`,
storing the result in `out`.

The first arc is defined by points A and B. The second arc is defined by points C and D.

Each point is a 2-element array `[lon,lat]` in decimal degrees.

If there is no intersection, returns null. Otherwise returns `out`.

Optionally provide an `epsilon` to control tolerance for rounding errors to decide when there is an
intersection.

# install

npm install great-circle-intersect

# license

bsd
