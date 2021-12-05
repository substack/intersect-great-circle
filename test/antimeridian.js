var test = require('tape')
var geolerp = require('geolerp')
var hdistance = require('haversine-distance')
var intersect = require('../')

var suva = [+178.44149,-18.14161]
var nukuAlofa = [-175.20180,-21.13938]
var apia = [-171.76666,-13.83333]
var noumea = [+166.4572,-22.27631]
var honiara = [+159.95,-9.43333]
var auckland = [+174.76667,-36.86667]

test('antimeridian', function (t) {
  // nuku'alofa to honiara, noumea to apia
  var A = nukuAlofa, B = honiara, C = noumea, D = apia
  var computed = []
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
    t.ok(dx < 0.1, `dx=abs(${a[ai][0]}-(${c[0]}))=${dx}; dx < 0.1`)
    t.ok(dy < 0.1, `dy=abs(${a[ai][1]}-(${c[1]}))=${dy}; dy < 0.1`)
  })
  t.end()
})

test('no intersection', function (t) {
  t.strictEqual(intersect([],nukuAlofa,noumea,apia,honiara), null, 'null intersection 0')
  t.strictEqual(intersect([],noumea,apia,nukuAlofa,auckland), null, 'null intersection 1')
  t.end()
})
