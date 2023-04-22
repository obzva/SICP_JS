import { gcd } from "../chapter_1/the_big_code.js";

function add_rat(x, y) {
  return make_rat(
    numer(x) * denom(y) + numer(y) * denom(x),
    denom(x) * denom(y)
  );
}
function sub_rat(x, y) {
  return make_rat(
    numer(x) * denom(y) - numer(y) * denom(x),
    denom(x) * denom(y)
  );
}
function mul_rat(x, y) {
  return make_rat(numer(x) * numer(y), denom(x) * denom(y));
}
function div_rat(x, y) {
  return make_rat(numer(x) * denom(y), denom(x) * numer(y));
}
function equal_rat(x, y) {
  return numer(x) * denom(y) === numer(y) * denom(x);
}

function pair(x, xs) {
  return [x, xs];
}

function is_pair(x) {
  return array_test(x) && x.length === 2;
}

function array_test(x) {
  return Array.isArray(x);
}

function head(xs) {
  if (is_pair(xs)) {
    return xs[0];
  } else {
    throw new Error(
      "head(xs) expects a pair as argument xs, but xs is not a pair"
    );
  }
}

function tail(xs) {
  if (is_pair(xs)) {
    return xs[1];
  } else {
    throw new Error(
      "tail(xs) expects a pair as argument xs, but xs is not a pair"
    );
  }
}

// function make_rat(n, d) {
//   return pair(n, d);
// }

function numer(x) {
  return head(x);
}

function denom(x) {
  return tail(x);
}

function display(x) {
  console.log(x);
  return x;
}

function print_rat(x) {
  return display(String(numer(x)) + "/" + String(denom(x)));
}

// function make_rat(n, d) {
//   const g = gcd(n, d);
//   return pair(n / g, d / g);
// }

/*----------------
 * Exercise 2. 1*/
function maker_rat(n, d) {
  const g = gcd(n, d);
  const isPositive = n * d >= 0;
  return isPositive ? pair(n / g, d / g) : pair(-(n / g), d / g);
}
/*----------------*/

/* ----------------
 * Exercise 2. 2*/
function make_segment(a, b) {
  return pair(a, b);
}

function start_segment(s) {
  return head(s);
}

function end_segment(s) {
  return tail(s);
}

function make_point(x, y) {
  return pair(x, y);
}

function x_point(p) {
  return head(p);
}

function y_point(p) {
  return tail(p);
}

function midpoint_segment(s) {
  return make_point(
    (x_point(start_segment(s)) + x_point(end_segment(s))) / 2,
    (y_point(start_segment(s)) + y_point(end_segment(s))) / 2
  );
}

function print_point(p) {
  return display("(" + String(x_point(p)) + ", " + String(y_point(p)) + ")");
}

function test_2_2() {
  const a = make_point(4, 4);
  const b = make_point(10, 10);
  const s = make_segment(a, b);
  console.log(midpoint_segment(s));
}
/*----------------*/

/*----------------
 * Exercise 2. 3*/

function peri_rect(rect) {
  return 2 * (get_width(rect) + get_height(rect));
}
function area_rect(rect) {
  return get_width(rect) * get_height(rect);
}
function make_rect_1(p1, p2, p3) {
  return pair(pair(p1, p2), p3);
}
// for make_rect_1
// function get_width(rect) {
//   const p2 = tail(head(rect));
//   const p3 = tail(rect);
//   const segment = make_segment(p2, p3);
//   return len_segment(segment);
// }
// function get_height(rect) {
//   const p1 = head(head(rect));
//   const p2 = tail(head(rect));
//   const segment = make_segment(p1, p2);
//   return len_segment(segment);
// }
function make_rect_2(width, height, angle, point) {
  return pair(pair(width, height), pair(angle, point));
}
function get_width(rect) {
  return head(head(rect));
}
function get_height(rect) {
  return tail(head(rect));
}
function len_segment(seg) {
  const p = head(seg);
  const q = tail(seg);
  const x1 = head(p);
  const y1 = tail(p);
  const x2 = head(q);
  const y2 = tail(q);
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
/*----------------*/
