var test = require('tape')
var intersect = require('../')

test('box', function (t) {
  var A = [1.5,1.5], B = [1.5,90]
  var P = [ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ] ]
  var results = []
  for (var i = 0; i < P.length; i++) {
    results.push(intersect([], P[i], P[(i+1)%P.length], A, B))
  }
  t.strictEqual(results[0], null) // 1,1 to 1,2
  t.equal(results[1][0].toFixed(1), '1.5')
  t.equal(results[1][1].toFixed(1), '2.0')
  t.strictEqual(results[2], null) // 2,2 to 2,1
  t.strictEqual(results[3], null) // 2,1 to 1,1
  t.end()
})

test('pole', function (t) {
  var p0 = intersect([],
    [+150.80347,+59.5638],
    [-147.71639,+64.83778],
    [-156.78872,+71.29058],
    [-156.78872,-90.00000]
  )
  t.equal(p0[0].toFixed(2), '-156.79')
  t.equal(p0[1].toFixed(2), '65.80')
  var p1 = intersect([],
    [+10.395060,+63.43049],
    [+30.314130,+59.93863],
    [-156.78872,+71.29058],
    [-156.78872,-90.00000]
  )
  t.strictEqual(p1, null)
  var p2 = intersect([],
    [-68.51449,+63.75059],
    [-51.72157,+64.18347],
    [-53.67350,+66.93946],
    [-53.67350,-90.00000]
  )
  t.ok(p2)
  t.end()
})
