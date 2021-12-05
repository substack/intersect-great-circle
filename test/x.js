var test = require('tape')
var geolerp = require('geolerp')
var hdistance = require('haversine-distance')
var intersect = require('../')

var seattle = [-122.33,+47.61]
var chicago = [-87.65,+41.85]
var denver = [-104.98,+39.74]
var calgary = [-114.09,+51.05]

test('verify result against exaustive search', function (t) {
  var computed = []
  computed.push(intersect([],seattle,chicago,denver,calgary))
  computed.push(intersect([],chicago,seattle,denver,calgary))
  computed.push(intersect([],seattle,chicago,calgary,denver))
  computed.push(intersect([],chicago,seattle,calgary,denver))
  computed.push(intersect([],denver,calgary,seattle,chicago))
  computed.push(intersect([],denver,calgary,chicago,seattle))
  computed.push(intersect([],calgary,denver,seattle,chicago))
  computed.push(intersect([],calgary,denver,chicago,seattle))
  var n = 250
  var a = [], b = []
  for (var i = 0; i < n; i++) {
    var ti = i/(n-1)
    a.push(geolerp([],seattle,chicago,ti))
    b.push(geolerp([],denver,calgary,ti))
  }
  var minD = Infinity, ai = -1, bi = -1
  for (var i = 0; i < a.length; i++) {
    for (var j = 0; j < b.length; j++) {
      var d = hdistance(a[i], b[j])
      if (d < minD) {
        minD = d
        ai = i
        bi = j
      }
    }
  }
  computed.forEach(function (c) {
    var dx = Math.abs(a[ai][0]-c[0])
    var dy = Math.abs(a[ai][1]-c[1])
    t.ok(dx < 0.1, `dx=abs(${a[ai][0]}-(${c[0]}))=${dx}; dx < 0.1`)
    t.ok(dy < 0.1, `dy=abs(${a[ai][1]}-(${c[1]}))=${dy}; dy < 0.1`)
  })
  t.end()
})

test('no intersection', function (t) {
  var computed = intersect([],seattle,calgary,denver,chicago)
  t.strictEqual(computed, null, 'null intersection')
  t.end()
})
