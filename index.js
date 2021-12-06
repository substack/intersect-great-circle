// https://www.edwilliams.org/intersect.htm
var normalize = require('gl-vec3/normalize')
var cross = require('gl-vec3/cross')
var ea = [0,0,0], eb = [0,0,0]
var sol0 = [0,0], sol1 = [0,0]
var vout = [0,0], v0 = [0,0], v1 = [0,0]
var epsilon = 1e-10

module.exports = function (out, p1, p2, p3, p4) {
  var lon1 = -p1[0]/180*Math.PI, lat1 = p1[1]/180*Math.PI
  var lon2 = -p2[0]/180*Math.PI, lat2 = p2[1]/180*Math.PI
  var lon3 = -p3[0]/180*Math.PI, lat3 = p3[1]/180*Math.PI
  var lon4 = -p4[0]/180*Math.PI, lat4 = p4[1]/180*Math.PI
  scross(ea, lon1, lat1, lon2, lat2)
  scross(eb, lon3, lat3, lon4, lat4)
  normalize(ea, ea)
  normalize(eb, eb)
  cross(ea, ea, eb)
  toLonLat(sol0, ea)
  sol1[0] = sol0[0] - Math.sign(sol0[0])*180
  sol1[1] = -sol0[1]

  var h0 = Math.min(Math.abs(p1[0]-sol0[0]), Math.abs(p2[0]-sol0[0]))
  var h1 = Math.min(Math.abs(p1[0]-sol1[0]), Math.abs(p2[0]-sol1[0]))
  if (h0 <= h1) {
    vout[0] = sol0[0]
    vout[1] = sol0[1]
  } else {
    vout[0] = sol1[0]
    vout[1] = sol1[1]
  }

  if (Math.max(hdist(vout,p1),hdist(vout,p2)) > hdist(p1,p2)) return null
  if (Math.max(hdist(vout,p3),hdist(vout,p4)) > hdist(p3,p4)) return null
  out[0] = vout[0]
  out[1] = vout[1]
  return out
}

function scross(out, ax, ay, bx, by) {
  out[0] = Math.sin(ay-by) * Math.sin((ax+bx)/2) * Math.cos((ax-bx)/2)
    - Math.sin(ay+by) * Math.cos((ax+bx)/2) * Math.sin((ax-bx)/2)
  out[1] = Math.sin(ay-by) * Math.cos((ax+bx)/2) * Math.cos((ax-bx)/2)
    + Math.sin(ay+by) * Math.sin((ax+bx)/2) * Math.sin((ax-bx)/2)
  out[2] = Math.cos(ay)*Math.cos(by)*Math.sin(ax-bx)
  return out
}

function toLonLat(out, p) {
  var q = Math.sqrt(p[0]*p[0]+p[1]*p[1])
  var lon = Math.atan2(p[1],p[0])*180/Math.PI
  var lat = Math.atan2(p[2],q)*180/Math.PI
  out[0] = lon
  out[1] = lat
  return out
}

function hdist(p1,p2) {
  var lon1 = p1[0]/180*Math.PI, lat1 = p1[1]/180*Math.PI
  var lon2 = p2[0]/180*Math.PI, lat2 = p2[1]/180*Math.PI
  var sy = Math.sin((lat1-lat2)/2)
  var sx = Math.sin((lon1-lon2)/2)
  return 2*Math.asin(Math.sqrt(sy*sy + Math.cos(lat1)*Math.cos(lat2)*sx*sx))
}
