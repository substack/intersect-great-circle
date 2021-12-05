var test = require('tape')
var geolerp = require('geolerp')
var hdistance = require('haversine-distance')
var intersect = require('../')

var seattle = [-122.33,+47.61]
var chicago = [-87.65,+41.85]
var denver = [-104.98,+39.74]
var calgary = [-114.09,+51.05]

var tokyo = [+139.69171,+35.6895]
var losAngeles = [-118.24368,+34.05223]
var fairbanks = [-147.71639,+64.83778]
var auckland = [+174.76667,-36.86667]
var hilo = [-155.09,+19.72972]

var tolerance = 0.2

test('verify result against exaustive search (1)', function (t) {
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
    t.ok(dx < tolerance, `dx=abs(${a[ai][0]}-(${c[0]}))=${dx}; dx < ${tolerance}`)
    t.ok(dy < tolerance, `dy=abs(${a[ai][1]}-(${c[1]}))=${dy}; dy < ${tolerance}`)
  })
  t.end()
})

test('verify result against exaustive search (2)', function (t) {
  var computed = []
  var A = tokyo, B = losAngeles, C = fairbanks, D = auckland
  computed.push(intersect([],A,B,C,D))
  computed.push(intersect([],B,A,C,D))
  computed.push(intersect([],A,B,D,C))
  computed.push(intersect([],B,A,D,C))
  computed.push(intersect([],C,D,A,B))
  computed.push(intersect([],C,D,B,A))
  computed.push(intersect([],D,C,A,B))
  computed.push(intersect([],D,C,B,A))
  var n = 250
  var a = [], b = []
  for (var i = 0; i < n; i++) {
    var ti = i/(n-1)
    a.push(geolerp([],A,B,ti))
    b.push(geolerp([],C,D,ti))
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
    t.ok(dx < tolerance, `dx=abs(${a[ai][0]}-(${c[0]}))=${dx}; dx < ${tolerance}`)
    t.ok(dy < tolerance, `dy=abs(${a[ai][1]}-(${c[1]}))=${dy}; dy < ${tolerance}`)
  })
  t.end()
})

test('verify result against exaustive search (3)', function (t) {
  var computed = []
  var A = tokyo, B = losAngeles, C = fairbanks, D = hilo
  computed.push(intersect([],A,B,C,D))
  computed.push(intersect([],B,A,C,D))
  computed.push(intersect([],A,B,D,C))
  computed.push(intersect([],B,A,D,C))
  computed.push(intersect([],C,D,A,B))
  computed.push(intersect([],C,D,B,A))
  computed.push(intersect([],D,C,A,B))
  computed.push(intersect([],D,C,B,A))
  var n = 250
  var a = [], b = []
  for (var i = 0; i < n; i++) {
    var ti = i/(n-1)
    a.push(geolerp([],A,B,ti))
    b.push(geolerp([],C,D,ti))
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
    t.ok(dx < tolerance, `dx=abs(${a[ai][0]}-(${c[0]}))=${dx}; dx < ${tolerance}`)
    t.ok(dy < tolerance, `dy=abs(${a[ai][1]}-(${c[1]}))=${dy}; dy < ${tolerance}`)
  })
  t.end()
})

test('no intersection', function (t) {
  var computed = intersect([],seattle,calgary,denver,chicago)
  t.strictEqual(computed, null, 'null intersection')
  t.end()
})
