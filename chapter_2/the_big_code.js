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

/**
 * Exercise 2. 1*/
function maker_rat(n, d) {
  const g = gcd(n, d);
  const isPositive = n * d >= 0;
  return isPositive ? pair(n / g, d / g) : pair(-(n / g), d / g);
}

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

/**
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

// function pair(p, q) {
//   function dispatch(action) {
//     return action === 0
//       ? p
//       : action === 1
//       ? q
//       : new Error(`expected action to be 0 or 1, but action=${action}`);
//   }
//   return dispatch;
// }
// function head(p) {
//   return p(0);
// }
// function tail(p) {
//   return p(1);
// }

/**
 * Exercise 2.4*/
// function pair(x, y) {
//   return (m) => m(x, y);
// }
// function head(p) {
//   return p((a, b) => a);
// }
// function tail(p) {
//   return p((a, b) => b);
// }

/**
 * Exercise 2.5*/
// function pair(x, y) {
//   return Math.pow(2, x) * Math.pow(3, y);
// }
// function head(p) {
//   return p % 2 === 0 ? head(p / 2) + 1 : 0;
// }
// function tail(p) {
//   return p % 3 === 0 ? tail(p / 2) + 1 : 0;
// }

/**
 * Exercise 2.6*/
// const one = (f) => (x) => f(x);
// const two = (f) => (x) => f(f(x));
// function plus(a, b) {
//   return (f) => (x) => a(f)(b(f)(x));
// }
// function church_to_number(c) {
//   return c((n) => n + 1)(0);
// }
// function test_2_6() {
//   console.log("one", church_to_number(one));
//   console.log("two", church_to_number(two));
//   console.log("three", church_to_number(plus(one, two)));
// }

function add_interval(x, y) {
  return make_interval(
    lower_bound(x) + lower_bound(y),
    upper_bound(x) + upper_bound(y)
  );
}
// function mul_interval(x, y) {
//   const p1 = lower_bound(x) * lower_bound(y);
//   const p2 = lower_bound(x) * upper_bound(y);
//   const p3 = upper_bound(x) * lower_bound(y);
//   const p4 = upper_bound(x) * upper_bound(y);
//   return make_interval(Math.min(p1, p2, p3, p4), Math.max(p1, p2, p3, p4));
// }
// function div_interval(x, y) {
//   return mul_interval(
//     x,
//     make_interval(
//       1 / upper_bound(y),
//
//       1 / lower_bound(y)
//     )
//   );
// }
/**
 * Exercise 2.7
 * the solution from Source Academy is wrong*/
function make_interval(x, y) {
  return pair(x, y);
}
function upper_bound(interval) {
  return head(interval) >= tail(interval) ? head(interval) : tail(interval);
}
function lower_bound(interval) {
  return head(interval) < tail(interval) ? head(interval) : tail(interval);
}

/**
 * Exercise 2.8*/
// sub_interval(x, y)
// the minimum value the difference could be is 'lower_bound(x) - upper_bound(y)'
// and for the maximum value, 'upper_bound(x) - lower_bound(y)'
function sub_interval(x, y) {
  return make_interval(
    lower_bound(x) - upper_bound(y),
    upper_bound(x) - lower_bound(y)
  );
}

/**
 * Exercise 2.9*/
function width_interval(interval) {
  return (upper_bound(interval) - lower_bound(interval)) / 2;
}
function test_2_9() {
  const a = make_interval(34, 90);
  const b = make_interval(22, 43);
  const a_width = width_interval(a);
  const b_width = width_interval(b);
  console.log("ADD:", a_width + b_width === width_interval(add_interval(a, b)));
  console.log("SUB:", a_width - b_width === width_interval(sub_interval(a, b)));
  console.log("MUL:", a_width * b_width === width_interval(mul_interval(a, b)));
  console.log("DIV:", a_width / b_width === width_interval(div_interval(a, b)));
  console.log("a_width:", a_width);
  console.log("b_width:", b_width);
  console.log(
    "a add b:",
    a_width + b_width,
    width_interval(add_interval(a, b))
  );
  console.log(
    "a sub b:",
    a_width - b_width,
    width_interval(sub_interval(a, b))
  );
  console.log(
    "a mul b:",
    a_width * b_width,
    width_interval(mul_interval(a, b))
  );
  console.log(
    "a div b:",
    a_width / b_width,
    width_interval(div_interval(a, b))
  );
}

/**
 * Exercise 2.10*/
function div_interval(x, y) {
  if (lower_bound(y) * upper_bound(y) <= 0)
    throw new Error("interval is crossing zero");
  return mul_interval(
    x,
    make_interval(
      1 / upper_bound(y),

      1 / lower_bound(y)
    )
  );
}
/**-*/

/**
 * Exercise 2.11*/
function mul_interval(x, y) {
  const xu = upper_bound(x);
  const xl = lower_bound(x);
  const yu = upper_bound(y);
  const yl = lower_bound(y);
  return xu >= 0 && xl >= 0 && yu >= 0 && yl >= 0
    ? make_interval(xu * yu, xl * yl)
    : xu >= 0 && xl >= 0 && yu >= 0 && yl < 0
    ? make_interval(xu * yu, xu * yl)
    : xu >= 0 && xl >= 0 && yu < 0 && yl < 0
    ? make_interval(xu * yu, xl * yl)
    : xu >= 0 && xl < 0 && yu >= 0 && yl >= 0
    ? make_interval(xu * yu, xl * yu)
    : xu >= 0 && xl < 0 && yu >= 0 && yl < 0
    ? make_interval(
        Math.max(xu * yu, xu * yl, xl * yu, xl * yl),
        Math.min(xu * yu, xu * yl, xl * yu, xl * yl)
      )
    : xu >= 0 && xl < 0 && yu < 0 && yl < 0
    ? make_interval(xu * yl, xl * yl)
    : xu < 0 && xl < 0 && yu >= 0 && yl >= 0
    ? make_interval(xl * yu, xu * yl)
    : xu < 0 && xl < 0 && yu >= 0 && yl < 0
    ? make_interval(xl * yu, xl * yl)
    : make_interval(xu * yu, xl * yl);
}

function make_center_width(c, w) {
  return make_interval(c - w, c + w);
}
function center(i) {
  return (lower_bound(i) + upper_bound(i)) / 2;
}
function width(i) {
  return (upper_bound(i) - lower_bound(i)) / 2;
}

/**
 * Exercise 2.12*/
function make_center_percent(c, p) {
  return make_center_width(c, (c * p) / 100);
}
function percent(i) {
  return (width(i) / center(i)) * 100;
}

/**-
 * Exercise 2.13*/
// let x = make_center_percent(xc, xp);
//     y = make_center_percent(yc, yp);
// then, xl = xc - xc * xp / 100 = xc * (1 - xp / 100)
//       xu = xc + xc * xp / 100 = xc * (1 + xp / 100)
//       yl = yc - yc * yp / 100 = yc * (1 - yp / 100)
//       yu = yc + yc * yp / 100 = yc * (1 + yp / 100)
//
// xl * yl = xc * yc * (1 - xp / 100) * (1 - yp / 100)
//         = (xc * yc) * (1 - (xp + yp) / 100 + (xp * yp / 100) / 100)
//         = (xc * yc) * (1 - 99 * (xp * yp / 100) / 100)
// xu * yu = xc * yc * (1 + xp / 100) * (1 + yp / 100)
//         = (xc * yc) * (1 + (xp + yp) / 100 + (xp * yp / 100) / 100)
//         = (xc * yc) * (1 + 101 * (xp * yp / 100) / 100)
// therefore the tolerance of the product of intervals is roughly the result of the multiplication of the tolerances of the intervals

/**
 * Exercise 2.14*/
function par1(r1, r2) {
  return div_interval(mul_interval(r1, r2), add_interval(r1, r2));
}
function par2(r1, r2) {
  const one = make_interval(1, 1);
  return div_interval(
    one,
    add_interval(div_interval(one, r1), div_interval(one, r2))
  );
}
function test_2_14() {
  const a = make_center_width(1000, 1);
  const b = make_center_width(2500, 5);
  const aa = div_interval(a, a);
  const ab = div_interval(a, b);
  const ba = div_interval(b, a);
  const bb = div_interval(b, b);
  console.log("---center");
  console.log("aa", center(aa));
  console.log("ab", center(ab));
  console.log("ba", center(ba));
  console.log("bb", center(bb));
  console.log("---percentage");
  console.log("aa", percent(aa));
  console.log("ab", percent(ab));
  console.log("ba", percent(ba));
  console.log("bb", percent(bb));
}
/**-*/

/**
 * Exercise 2.15*/
// This question touches on the subject of identity. The reason that the two procedures return different results is because of the way interval division works. This is a somewhat hard problem in mathematics.
//
//     Of course, if you divide any regular number by itself, the result is always
//     . So if we have an interval
//     , we would expect
//
// to also be
//     .
//
//     The reason why this does not happen is because
//
// is a stateless function, that is, we do not have the information that the
// in the denominator and the
// in the numerator are in fact the same value. Because
// is an interval, for all we know, those two
// s could refer to different values within the same range. In other words, while
//     could refer to any given value within an interval, every instance of
// within the same function always refers to the same value. But there is no way to tell the function that, so it produces overly wide error margins.
//
//     This uncertainty increases proportionally to the number of instances of an uncertain interval like
// being divided by itself. Because par2 does not contain a division of an interval by itself, this is not an issue, and Eva is correct in saying that par2 will yield a more accurate result. Although this may or may not be a good thing, since it may be useful to reflect uncertainty in the result if it exists. So whether par2 is actually the better function depends entirely on the use case.
// from:https://www.timwoerner.de/posts/sicp/exercises/2/15/#answer

/**
 * Exercise 2.16*/
//this is too difficult
//https://stackoverflow.com/questions/14130878/sicp-2-16-interval-arithmetic-scheme

function list(...elements) {
  let theList = null;
  for (let i = elements.length - 1; i >= 0; i -= 1) {
    theList = pair(elements[i], theList);
  }
  return theList;
}
function display_sequence(lst) {
  if (lst === null) {
    return "null";
  } else if (Array.isArray(lst)) {
    const elements = lst.map(display_sequence);
    return `[${elements.join(", ")}]`;
  } else {
    return lst.toString();
  }
}

function list_ref(index, items) {
  return index === 0 ? head(items) : list_ref(index - 1, tail(items));
}

// redeclared at line 935
// recursive
// function length(items) {
//   return is_null(items) ? 0 : 1 + length(tail(items));
// }
// iterative
// function length(items) {
//   function iter(v, count) {
//     return is_null(v) ? count : iter(tail(v), count + 1);
//   }
//   return iter(items, 0);
// }
function is_null(v) {
  return v === null;
}

// redeclared at line 929
// function append(list1, list2) {
//   return is_null(list1) ? list2 : pair(head(list1), append(tail(list1), list2));
// }

/**
 * Exercise 2.17*/
function last_pair(items) {
  return is_null(tail(items)) ? items : last_pair(tail(items));
}

/**
 * Exercise 2.18*/
// redeclared at line 1010
// function reverse(items) {
//   return is_null(items)
//     ? null
//     : append(reverse(tail(items)), pair(head(items), null));
// }
// function reverse(items) {
//   function iter(arr, res) {
//     return is_null(arr) ? res : iter(tail(arr), pair(head(arr), res));
//   }
//   return iter(items, null);
// }

/**
 * Exercise 2.19*/
const us_coins = list(50, 25, 10, 5, 1);
const us_coins_reverse = reverse(us_coins);
function count_change(amount, coins) {
  return cc(amount, coins);
}
// function cc(amount, kinds_of_coins) {
//   return amount === 0
//     ? 1
//     : amount < 0 || kinds_of_coins === 0
//     ? 0
//     : cc(amount, kinds_of_coins - 1) +
//       cc(amount - first_denomination(kinds_of_coins), kinds_of_coins);
// }
function cc(amount, coin_values) {
  return amount === 0
    ? 1
    : amount < 0 || no_more(coin_values)
    ? 0
    : cc(amount, except_first_denomination(coin_values)) +
      cc(amount - first_denomination(coin_values), coin_values);
}
function first_denomination(coin_values) {
  return head(coin_values);
}
function except_first_denomination(coin_values) {
  return tail(coin_values);
}
function no_more(coin_values) {
  return is_null(coin_values);
}
function test_2_19() {
  console.log(
    "Does the order of the coin_values affect the result of the function count_change? ->",
    count_change(100, us_coins) !== count_change(100, us_coins_reverse)
  );
  console.log(
    "The parameter coin_values is unordered list so that it doesn't affect the result"
  );
}

/**
 * Exercise 2.20*/
function plus_curried(x) {
  return (y) => x + y;
}
function brooks(curried_fn, items) {
  return is_null(items)
    ? curried_fn
    : brooks(curried_fn(head(items)), tail(items));
}
// we need to make certain that the length of the items is 2
function brooks_curried(params) {
  return brooks(head(params), tail(params));
}
function test_2_20() {
  console.log(brooks_curried(list(brooks_curried, list(plus_curried, 3, 4))));
  console.log(
    brooks_curried(
      list(brooks_curried(list(brooks_curried, list(plus_curried, 3, 4))))
    )
  );
}

// function scale_list(items, factor) {
//   return is_null(items)
//     ? null
//     : pair(head(items) * factor, scale_list(tail(items), factor));
// }

// redeclared at line 925
// function map(fn, items) {
//   return is_null(items) ? null : pair(fn(head(items)), map(fn, tail(items)));
// }
function scale_list(items, factor) {
  return map((x) => x * factor, items);
}

/**
 * Exercise 2.21*/
// function square_list(items) {
//   return is_null(items)
//     ? null
//     : pair(head(items) * head(items), square_list(tail(items)));
// }
function square_list(items) {
  return map(square, items);
}
function square(x) {
  return x * x;
}

/**
 * Exercise 2.22*/
// For the first implementation, he put squared elements from the bottom of the list.
// For the second one, the structure of nesting of the pair function is wrong.

/**
 * Exercise 2.23*/
function for_each(fn, items) {
  function iter(things) {
    fn(head(things));
    for_each(fn, tail(things));
  }
  return is_null(items) ? null : iter(items);
}

// redeclared at line 927
// function count_leaves(x) {
//   return is_null(x)
//     ? 0
//     : !is_pair(x)
//     ? 1
//     : count_leaves(head(x)) + count_leaves(tail(x));
// }

/**
 * Exercise 2.24*/
// Just draw it

/**
 * Exercise 2.25*/
function test_2_25() {
  const l1 = list(1, 3, list(5, 7), 9);
  const l2 = list(list(7));
  const l3 = list(1, list(2, list(3, list(4, list(5, list(6, 7))))));

  console.log("l1 = list(1, 3, list(5, 7), 9)");
  console.log(
    "-> head(tail(head(tail(tail(l1))))) = ",
    head(tail(head(tail(tail(l1)))))
  );
  console.log("l2 = list(list(7))");
  console.log("-> head(head(l2)) = ", head(head(l2)));
  console.log("l3 = list(1, list(2, list(3, list(4, list(5, list(6, 7))))))");
  console.log(
    "-> head(tail(head(tail(head(tail(head(tail(head(tail(head(tail(l3)))))))))))) = ",
    head(tail(head(tail(head(tail(head(tail(head(tail(head(tail(l3))))))))))))
  );
}

/**
 * Exercise 2.26*/
function test_2_26() {
  const x = list(1, 2, 3);
  const y = list(4, 5, 6);
  console.log("In list notation, ");
  console.log("append(x, y) = list(1, 2, 3, 4, 5, 6, null)");
  console.log("pair(x, y) = list(list(1, 2, 3, null), list(4, 5, 6, null))");
  console.log(
    "list(x, y) = list(list(1, 2, 3, null), list(4, 5, 6, null), null)"
  );
  console.log("In box notation,");
  console.log("append(x, y) = [1, [2, [3, [4, [5, [6, null]]]]]]");
  console.log("pair(x, y) = [[1, [2, [3, null]]], [4, [5, [6, null]]]]");
  console.log(
    "list(x, y) = [[1, [2, [3, null]]], [[4, [5, [6, null]]], null]]"
  );
}

/**
 * Exercise 2.27*/
function deep_reverse(items) {
  return is_null(items)
    ? null
    : is_pair(items)
    ? append(deep_reverse(tail(items)), list(deep_reverse(head(items))))
    : items;
}

/**
 * Exercise 2.28*/
function fringe(items) {
  return is_null(items)
    ? null
    : is_pair(items)
    ? append(fringe(head(items)), fringe(tail(items)))
    : list(items);
}

/**
 * Exercise 2.29*/
function make_mobile(left, right) {
  return list(left, right);
}
function make_branch(length, structure) {
  return list(length, structure);
}
// a
function left_branch(mobile) {
  return head(mobile);
}
function right_branch(mobile) {
  return head(tail(mobile));
}
function branch_length(branch) {
  return head(branch);
}
function branch_structure(branch) {
  return head(tail(branch));
}
// b
function total_weight(mobile) {
  const lb = left_branch(mobile);
  const rb = right_branch(mobile);
  const left_weight = is_pair(lb) ? total_weight(lb) : lb;
  const right_weight = is_pair(rb) ? total_weight(rb) : rb;
  return left_weight + right_weight;
}
// c
function is_mobile_balanced(mobile) {
  const lb = left_branch(mobile);
  const rb = right_branch(mobile);
  const left_length = branch_length(lb);
  const right_length = branch_length(rb);
  return left_length * total_weight(lb) === right_length * total_weight(rb);
}
// d
// If we change our constructors from using list to using pair, head(tail()) part of selectors should be changed into tail().

// function scale_tree(tree, factor) {
//   return is_null(tree)
//     ? null
//     : is_pair(tree)
//     ? pair(scale_tree(head(tree), factor), scale_tree(tail(tree), factor))
//     : tree * factor;
// }
function scale_tree(tree, factor) {
  return map(
    (sub_tree) =>
      is_pair(sub_tree) ? scale_tree(sub_tree, factor) : sub_tree * factor,
    tree
  );
}

/**
 * Exercise 2.30*/
// direct implementation
// function square_tree(tree) {
//   return is_null(tree)
//     ? null
//     : is_pair(tree)
//     ? pair(square_tree(head(tree)), square_tree(tail(tree)))
//     : square(tree);
// }
// using map
function square_tree(tree) {
  return map(
    (sub_tree) =>
      is_pair(sub_tree) ? square_tree(sub_tree) : square(sub_tree),
    tree
  );
}

/**
 * Exercise 2.31*/
function tree_map(fn, tree) {
  return map(
    (sub_tree) => (is_pair(sub_tree) ? tree_map(fn, sub_tree) : fn(sub_tree)),
    tree
  );
}

/**
 * Exercise 2.32*/
function subsets(s) {
  if (is_null(s)) {
    // If the set is empty, then its one and only subset is an empty set itself
    return list(null);
  } else {
    const rest = subsets(tail(s));
    return append(
      rest,
      map((e) => pair(head(s), e), rest)
    );
  }
}

// redeclared at line 884
// function sum_odd_squares(tree) {
//   return is_null(tree)
//     ? 0
//     : !is_pair(tree)
//     ? is_odd(tree)
//       ? square(tree)
//       : 0
//     : sum_odd_squares(head(tree)) + sum_odd_squares(tail(tree));
// }

function is_odd(v) {
  return v % 2 !== 0;
}

// redeclared at line 895
// function even_fibs(n) {
//   function next(k) {
//     if (k > n) {
//       return null;
//     }
//     const f = fib(k);
//     return is_even(f) ? pair(f, next(k + 1)) : next(k + 1);
//   }
//   return next(0);
// }

function fib(n) {
  return n === 0 ? 0 : n === 1 ? 1 : fib(n - 1) + fib(n - 2);
}

function is_even(v) {
  return v % 2 === 0;
}

function filter(predicate, sequence) {
  return is_null(sequence)
    ? null
    : predicate(head(sequence))
    ? pair(head(sequence), filter(predicate, tail(sequence)))
    : filter(predicate, tail(sequence));
}

function accumulate(operation, initial_value, sequence) {
  return is_null(sequence)
    ? initial_value
    : operation(
        head(sequence),
        accumulate(operation, initial_value, tail(sequence))
      );
}

function enumerate_interval(low, high) {
  return low > high ? null : pair(low, enumerate_interval(low + 1, high));
}

function enumerate_tree(tree) {
  return is_null(tree)
    ? null
    : !is_pair(tree)
    ? list(tree)
    : append(enumerate_tree(head(tree)), enumerate_tree(tail(tree)));
}

/**
 * enumerate -> filter -> map -> accumulate
 */
function sum_odd_squares(tree) {
  return accumulate(plus, 0, map(square, filter(is_odd, enumerate_tree(tree))));
}

function plus(a, b) {
  return a + b;
}

/**
 * enumerate -> map -> filter -> accumulate
 */
function even_fibs(n) {
  return accumulate(
    pair,
    null,
    filter(is_even, map(fib, enumerate_interval(0, n)))
  );
}

function list_fib_squares(n) {
  return accumulate(
    pair,
    null,
    map(square, map(fib, enumerate_interval(0, n)))
  );
}

function product_of_squares_of_odd_elements(sequence) {
  return accumulate(times, 1, map(square, filter(is_odd, sequence)));
}

function times(a, b) {
  return a * b;
}

/**
 * Exercise 2.33
 */
function map(f, sequence) {
  return accumulate((x, y) => pair(f(x), y), null, sequence);
}

function append(sequence1, sequence2) {
  return accumulate(pair, sequence2, sequence1);
}

function length(sequence) {
  return accumulate((x, y) => 1 + y, 0, sequence);
}

/**
 * Exercise 2.34
 */
function horner_eval(x, coefficient_sequence) {
  return accumulate(
    (this_coeff, higher_terms) => this_coeff + x * higher_terms,
    0,
    coefficient_sequence
  );
}

/**
 * Exercise 2.35
 */
// my solution
// function count_leaves(tree) {
//   return accumulate(
//     plus,
//     0,
//     map((x) => 1, enumerate_tree(tree))
//   );
// }

// solution from source academy
function count_leaves(tree) {
  return accumulate(
    plus,
    0,
    map((sub_tree) => (is_pair(sub_tree) ? count_leaves(sub_tree) : 1), tree)
  );
}

/**
 * Exercise 2.36
 */
function accumulate_n(op, init, seqs) {
  return is_null(head(seqs))
    ? null
    : pair(
        accumulate(
          op,
          init,
          map((seq) => head(seq), seqs)
        ),
        accumulate_n(
          op,
          init,
          map((seq) => tail(seq), seqs)
        )
      );
}

/**
 * Exercise 2.37
 */
function dot_product(v, w) {
  return accumulate(plus, 0, accumulate_n(times, 1, list(v, w)));
}

function matrix_times_vector(m, v) {
  return map((row) => dot_product(row, v), m);
}

function transpose(m) {
  return accumulate_n((x, y) => pair(x, y), null, m);
}

function matrix_times_matrix(m, n) {
  const cols = transpose(n);
  return map((row) => matrix_times_vector(cols, row), m);
}

/**
 * Exercise 2.38
 */
function fold_left(op, initial, sequence) {
  function iter(result, rest) {
    return is_null(rest) ? result : iter(op(result, head(rest)), tail(rest));
  }
  return iter(initial, sequence);
}
function divide(a, b) {
  return a / b;
}
function fold_right(op, init, seq) {
  return accumulate(op, init, seq);
}
const r1 = fold_right(divide, 1, list(1, 2, 3));
const r2 = fold_left(divide, 1, list(1, 2, 3));
const r3 = fold_right(list, null, list(1, 2, 3));
const r4 = fold_left(list, null, list(1, 2, 3));

const r5 = fold_right(plus, 1, list(1, 2, 3));
const r6 = fold_left(plus, 1, list(1, 2, 3));
// op should be communitative and associative

/**
 * Exercise 2.39
 */
// function reverse(sequence) {
//   return fold_right((x, y) => append(y, list(x)), null, sequence);
// }
function reverse(sequence) {
  return fold_left((x, y) => pair(y, x), null, sequence);
}

function flatmap(f, seq) {
  return accumulate(append, null, map(f, seq));
}

function is_prime_sum(p) {
  return is_prime(head(p) + tail(p));
}

function is_prime(x) {
  return x === smallest_divisor(x);
}

function smallest_divisor(x) {
  return find_divisor(x, 2);
}

function find_divisor(x, test_divisor) {
  return square(test_divisor) > x
    ? x
    : divides(test_divisor, x)
    ? test_divisor
    : find_divisor(x, test_divisor + 1);
}

function divides(x, y) {
  return y % x === 0;
}

function make_pair_sum(p) {
  return list(head(p), tail(head(p)), head(p) + tail(head(p)));
}

// redeclared at line 1097
// function prime_sum_pairs(n) {
//   return map(
//     make_pair_sum,
//     filter(
//       is_prime_sum,
//       flatmap(
//         (x) => map((y) => list(x, y), enumerate_interval(1, x - 1)),
//         enumerate_interval(1, n)
//       )
//     )
//   );
// }

function permutations(s) {
  return is_null(s)
    ? list(null)
    : flatmap((x) => map((p) => pair(x, p), permutations(remove(x, s))), s);
}

function remove(x, s) {
  return filter((e) => e !== x, s);
}

/**
 * Exercise 2.40
 */
function unique_pairs(n) {
  return flatmap(
    (i) => map((j) => pair(j, i), enumerate_interval(1, i - 1)),
    enumerate_interval(1, n)
  );
}

function prime_sum_pairs(n) {
  return map(make_pair_sum, filter(is_prime_sum, unique_pairs(n)));
}

/**
 * Exercise 2.41
 */
function unique_triples(n) {
  return flatmap(
    (i) =>
      flatmap(
        (j) => map((k) => list(k, j, i), enumerate_interval(1, j - 1)),
        enumerate_interval(1, i - 1)
      ),
    enumerate_interval(1, n)
  );
}

function three_sum(s, n) {
  return filter(
    (triple) => accumulate(plus, 0, triple) === s,
    unique_triples(n)
  );
}

/**
 * Exercise 2.42
 */
function adjoin_position(row, col, rest) {
  return pair(pair(row, col), rest);
}

const empty_board = null;

function is_safe(positions) {
  const first_row = head(head(positions));
  const first_col = tail(head(positions));
  return accumulate(
    (pos, next_pos) => {
      const row = head(head(pos));
      const col = tail(head(pos));
      return (
        first_row !== row &&
        first_row + first_col !== row + col &&
        first_row - first_col !== row - col &&
        next_pos
      );
    },
    true,
    tail(positions)
  );
}

/**
 * Exercise 2.43
 */
// In Louis' solution, it re-evaluates queen_cols(k - 1) every column in the row.
// In each queen_cols call(k - 1), it also re-evaluates queen_cols(k - 2) recursively.
// Therefore, in rough estimation, Louis's solution will take (n^n)*T.

/**
 * Exercise 2.44
 */
function up_split(painter, n) {
  if (n === 0) {
    return painter;
  }
  const smaller = up_split(painter, n - 1);
  return below(painter, beside(smaller, smaller));
}

function square_of_four(tl, tr, bl, br) {
  return function (painter) {
    const top = beside(tl(painter), tr(painter));
    const bottom = beside(bl(painter), br(painter));
    return below(bottom, top);
  };
}

/**
 * Exercise 2.45
 */
function split(f, g) {
  return function (painter, n) {
    if (n === 0) {
      return painter;
    }
    const smaller = split(f, g)(painter, n - 1);
    return f(painter, g(smaller, smaller));
  };
}

function frame_coord_map(frame) {
  return (v) =>
    add_vect(
      origin_frame(frame),
      add_vect(
        scale_vect(xcor_vect(v), edge1_frame(frame)),
        scale_vect(ycor_vect(v), edge2_frame(frame))
      )
    );
}

/**
 * Exercise 2.46
 */
function make_vect(x, y) {
  return pair(x, y);
}

function xcor_vect(v) {
  return head(v);
}

function ycor_vect(v) {
  return tail(v);
}

function add_vect(v1, v2) {
  return make_vect(
    xcor_vect(v1) + xcor_vect(v2),
    ycor_vect(v1) + ycor_vect(v2)
  );
}

function sub_vect(v1, v2) {
  return make_vect(
    xcor_vect(v1) - xcor_vect(v2),
    ycor_vect(v1) - ycor_vect(v2)
  );
}

function scale_vect(s, v) {
  return make_vect(s * xcor_vect(v), s * ycor_vect(v));
}

/**
 * Exercise 2.47
 */
// function make_frame(origin, edge1, edge2) {
//   return list(origin, edge1, edge2);
// }
//
// function origin_frame(frame) {
//   return head(frame);
// }
//
// function edge1_frame(frame) {
//   return head(tail(frame));
// }
//
// function edge2_frame(frame) {
//   return head(tail(tail(frame)));
// }

function make_frame(origin, edge1, edge2) {
  return pair(origin, pair(edge1, edge2));
}

function origin_frame(frame) {
  return head(frame);
}

function edge1_frame(frame) {
  return head(tail(frame));
}

function edge2_frame(frame) {
  return tail(tail(frame));
}

function segments_to_painter(segment_list) {
  return (frame) =>
    for_each(
      (segment) =>
        draw_line(
          frame_coord_map(frame)(start_segment(segment)),
          frame_coord_map(frame)(end_segment(segment))
        ),
      segment_list
    );
}

function draw_line(p1, p2) {}

/**
 * Exercise 2.48
 */
// we can use make_segment, start_segment, and end_segment from Exercise 2.2.
function test_2_48() {
  const example_vector_1 = make_vect(1, 2);
  const example_vector_2 = make_vect(3, 4);
  const example_segment = make_segment(example_vector_1, example_vector_2);
  const example_start_segment = start_segment(example_segment);
  const example_end_segment = end_segment(example_segment);
  console.log("seg", example_segment);
  console.log("start_seg", example_start_segment);
  console.log("end_seg", example_end_segment);
}

/**
 * Exercise 2.49
 */
/**
 * a
 */
const tl = make_vect(0, 1);
const tr = make_vect(1, 1);
const bl = make_vect(0, 0);
const br = make_vect(1, 0);
const outline_segment_1 = make_segment(bl, br);
const outline_segment_2 = make_segment(br, tr);
const outline_segment_3 = make_segment(tr, tl);
const outline_segment_4 = make_segment(tl, bl);
const outline_segment_list = list(
  outline_segment_1,
  outline_segment_2,
  outline_segment_3,
  outline_segment_4
);
const outline_painter = segments_to_painter(outline_segment_list);
/**
 * b
 */
const x_segment_1 = make_segment(tl, br);
const x_segment_2 = make_segment(tr, bl);
const x_segment_list = list(x_segment_1, x_segment_2);
const x_painter = segments_to_painter(x_segment_list);
/**
 * c
 */
const tm = make_vect(0.5, 1);
const rm = make_vect(1, 0.5);
const bm = make_vect(0.5, 0);
const lm = make_vect(0, 0.5);
const dia_segment_1 = make_segment(tm, rm);
const dia_segment_2 = make_segment(rm, bm);
const dia_segment_3 = make_segment(bm, lm);
const dia_segment_4 = make_segment(lm, tm);
const dia_segment_list = list(
  dia_segment_1,
  dia_segment_2,
  dia_segment_3,
  dia_segment_4
);
const dia_painter = segments_to_painter(dia_segment_list);
/**
 * d
 */
const wave_segment_list = list(
  make_segment(make_vect(0.25, 0), make_vect(0.35, 0.5)),
  make_segment(make_vect(0.35, 0.5), make_vect(0.3, 0.6)),
  make_segment(make_vect(0.3, 0.6), make_vect(0.15, 0.4)),
  make_segment(make_vect(0.15, 0.4), make_vect(0, 0.65)),
  make_segment(make_vect(0, 0.65), make_vect(0, 0.85)),
  make_segment(make_vect(0, 0.85), make_vect(0.15, 0.6)),
  make_segment(make_vect(0.15, 0.6), make_vect(0.3, 0.65)),
  make_segment(make_vect(0.3, 0.65), make_vect(0.4, 0.65)),
  make_segment(make_vect(0.4, 0.65), make_vect(0.35, 0.85)),
  make_segment(make_vect(0.35, 0.85), make_vect(0.4, 1)),
  make_segment(make_vect(0.4, 1), make_vect(0.6, 1)),
  make_segment(make_vect(0.6, 1), make_vect(0.65, 0.85)),
  make_segment(make_vect(0.65, 0.85), make_vect(0.6, 0.65)),
  make_segment(make_vect(0.6, 0.65), make_vect(0.75, 0.65)),
  make_segment(make_vect(0.75, 0.65), make_vect(1, 0.35)),
  make_segment(make_vect(1, 0.35), make_vect(1, 0.15)),
  make_segment(make_vect(1, 0.15), make_vect(0.6, 0.45)),
  make_segment(make_vect(0.6, 0.45), make_vect(0.75, 0)),
  make_segment(make_vect(0.75, 0), make_vect(0.6, 0)),
  make_segment(make_vect(0.6, 0), make_vect(0.5, 0.3)),
  make_segment(make_vect(0.5, 0.3), make_vect(0.4, 0)),
  make_segment(make_vect(0.4, 0), make_vect(0.25, 0))
);
const wave = segments_to_painter(wave_segment_list);

function transform_painter(painter, origin, corner1, corner2) {
  return (frame) => {
    const m = frame_coord_map(frame);
    const new_origin = m(origin);
    const new_corner1 = m(corner1);
    const new_corner2 = m(corner2);
    return painter(
      make_frame(
        new_origin,
        sub_vect(new_corner1, new_origin),
        sub_vect(new_corner2, new_origin)
      )
    );
  };
}

function flip_vert(painter) {
  return transform_painter(
    painter,
    make_vect(0, 1),
    make_vect(1, 1),
    make_vect(0, 0)
  );
}

function shrink_to_upper_right(painter) {
  return transform_painter(
    painter,
    make_vect(0, 0),
    make_vect(0.5, 0),
    make_vect(0, 0.5)
  );
}

function rotate90(painter) {
  return transform_painter(
    painter,
    make_vect(1, 0),
    make_vect(1, 1),
    make_vect(0, 0)
  );
}

function squash_inwards(painter) {
  return transform_painter(
    painter,
    make_vect(0, 0),
    make_vect(0.65, 0.35),
    make_vect(0.35, 0.65)
  );
}

function beside(painter1, painter2) {
  const split_point = make_vect(0.5, 0);
  const paint_left = transform_painter(
    painter1,
    make_vect(0, 0),
    split_point,
    make_vect(0, 1)
  );
  const paint_right = transform_painter(
    painter2,
    split_point,
    make_vect(1, 0),
    make_vect(0.5, 1)
  );
  return (frame) => {
    paint_left(frame);
    paint_right(frame);
  };
}

/**
 * Exercise 2.50
 */
function flip_horiz(painter) {
  return transform_painter(
    painter,
    make_vect(1, 0),
    make_vect(0, 0),
    make_vect(1, 1)
  );
}

function rotate180(painter) {
  return transform_painter(
    painter,
    make_vect(1, 1),
    make_vect(0, 1),
    make_vect(1, 0)
  );
}

function rotate270(painter) {
  return transform_painter(
    painter,
    make_vect(0, 1),
    make_vect(0, 0),
    make_vect(1, 1)
  );
}

/**
 * Exercise 2.51
 */
// function below(painter1, painter2) {
//   const split_point = make_vect(0, 0.5);
//   const paint_bottom = transform_painter(
//     painter1,
//     make_vect(0, 0),
//     make_vect(1, 0),
//     split_point
//   );
//   const paint_top = transform_painter(
//     painter2,
//     split_point,
//     make_vect(1, 0.5),
//     make_vect(0, 1)
//   );
//   return (frame) => {
//     paint_top(frame);
//     paint_bottom(frame);
//   };
// }
function below(painter1, painter2) {
  return rotate90(beside(rotate270(painter1), rotate270(painter2)));
}

/**
 * Exercise 2.52
 */
// I'll skip this.

function member(item, x) {
  return is_null(x) ? null : item === head(x) ? x : member(item, tail(x));
}

/**
 * Exercise 2.53
 */
// list("a", "b", "c")
// -> box: ["a", ["b", ["c", null]]]
// list(list("george"))
// -> box: [["george", null], null]
// tail(list(list("x1", "x2"), list("y1", "y2")))
// -> box: [["y1", ["y2", null]], null]
// tail(head(list(list("x1", "x2"), list("y1", "y2"))))
// -> box: ["x2", null]
// member("red", list("blue", "shoes", "yellow", "socks"))
// -> null
// member("red", list("red", "shoes", "blue", "socks"))
// -> list: list("red", "shoes", "blue", "socks")list("red", "shoes", "blue", "socks")
// -> box: ["red", ["shoes", ["blue", ["socks", null]]]]

/**
 * Exercise 2.54
 */
function equal(a, b) {
  if (is_pair(a) && is_pair(b)) {
    return equal(head(a), head(b)) && equal(tail(a), tail(b));
  }
  if (!is_pair(a) && !is_pair(b)) {
    return a === b;
  }
  return false;
}

/**
 * Exercise 2.55
 */
// '"' === ""
// false

// refactored at Exercise 2.56
// function deriv(expression, variable) {
//   return is_number(expression)
//     ? 0
//     : is_variable(expression)
//     ? is_same_variable(expression, variable)
//       ? 1
//       : 0
//     : is_sum(expression)
//     ? make_sum(
//         deriv(addend(expression), variable),
//         deriv(augend(expression), variable)
//       )
//     : is_product(expression)
//     ? make_sum(
//         make_product(
//           multiplier(expression),
//           deriv(multiplicand(expression), variable)
//         ),
//         make_product(
//           deriv(multiplier(expression), variable),
//           multiplicand(expression)
//         )
//       )
//     : error(expression, "unknown expression type -- deriv");
// }

function is_number(v) {
  return typeof v === "number";
}

function is_variable(exp) {
  return is_string(exp);
}

function is_string(v) {
  return typeof v === "string";
}

function is_same_variable(v1, v2) {
  return is_string(v1) && is_string(v2) && v1 === v2;
}

// improved at line 1613
// function make_sum(a1, a2) {
//   return list("+", a1, a2);
// }

// improved at line 1628
// function make_product(m1, m2) {
//   return list("*", m1, m2);
// }

function is_sum(exp) {
  return is_pair(exp) && head(exp) === "+";
}

function addend(s) {
  return head(tail(s));
}

// refactored at Exercise 2.57
// function augend(s) {
//   return head(tail(tail(s)));
// }

function is_product(exp) {
  return is_pair(exp) && head(exp) === "*";
}

function multiplier(s) {
  return head(tail(s));
}

// refactored at Exercise 2.57
// function multiplicand(s) {
//   return head(tail(tail(s)));
// }

function make_sum(a1, a2) {
  return number_equal(a1, 0)
    ? a2
    : number_equal(a2, 0)
    ? a1
    : is_number(a1) && is_number(a2)
    ? a1 + a2
    : list("+", a1, a2);
}

function number_equal(exp, number) {
  return is_number(exp) && exp === number;
}

function make_product(m1, m2) {
  return number_equal(m1, 0) || number_equal(m2, 0)
    ? 0
    : number_equal(m1, 1)
    ? m2
    : number_equal(m2, 1)
    ? m1
    : is_number(m1) && is_number(m2)
    ? m1 * m2
    : list("*", m1, m2);
}

/**
 * Exercise 2.56
 */
function deriv(expression, variable) {
  return is_number(expression)
    ? 0
    : is_variable(expression)
    ? is_same_variable(expression, variable)
      ? 1
      : 0
    : is_sum(expression)
    ? make_sum(
        deriv(addend(expression), variable),
        deriv(augend(expression), variable)
      )
    : is_product(expression)
    ? make_sum(
        make_product(
          multiplier(expression),
          deriv(multiplicand(expression), variable)
        ),
        make_product(
          deriv(multiplier(expression), variable),
          multiplicand(expression)
        )
      )
    : is_exp(expression)
    ? make_product(
        make_product(
          exponent(expression),
          make_exp(base(expression), make_sum(exponent(expression), -1))
        ),
        deriv(base(expression), variable)
      )
    : error(expression, "unknown expression type -- deriv");
}

function is_exp(exp) {
  return is_pair(exp) && head(exp) === "**";
}

function make_exp(base, exponent) {
  return number_equal(exponent, 0)
    ? 1
    : number_equal(exponent, 1)
    ? base
    : list("**", base, exponent);
}

function base(exp) {
  return head(tail(exp));
}

function exponent(exp) {
  return head(tail(tail(exp)));
}

/**
 * Exercise 2.57
 */
function augend(s) {
  return accumulate(make_sum, 0, tail(s));
}

function multiplicand(m) {
  return accumulate(make_product, 1, tail(m));
}

/**
 * Exercise 2.58
 */
/**
 * a
 */
// You only need to change these functions to work with 'infix' notation.
// is_sum, addend, augend, is_product, multiplier, and multiplicand

/**
 * b
 */
function items_before_first(op, s) {
  console.log("ibf", op, s);
  console.log(s);
  const res =
    head(s) === op ? null : pair(head(s), items_before_first(op, tail(s)));
  console.log("res", res);
  return res;
}

function items_after_first(op, s) {
  console.log("iaf");
  console.log(s);
  const res = head(s) === op ? tail(s) : items_after_first(op, tail(s));
  console.log("res", res);
  return res;
}

function infix_make_sum(a1, a2) {
  return number_equal(a1, 0)
    ? a2
    : number_equal(a2, 0)
    ? a1
    : is_number(a1) && is_number(a2)
    ? a1 + a2
    : list(a1, "+", a2);
}

function infix_is_sum(s) {
  return is_pair(s) && member("+", s);
}

function infix_addend(s) {
  return items_before_first("+", s);
}

function infix_augend(s) {
  return items_after_first("+", s);
}

function infix_make_product(m1, m2) {
  return number_equal(m1, 0) || number_equal(m2, 0)
    ? 0
    : number_equal(m1, 1)
    ? m2
    : number_equal(m2, 1)
    ? m1
    : is_number(m1) && is_number(m2)
    ? m1 * m2
    : list(m1, "*", m2);
}

function infix_is_product(s) {
  return is_pair(s) && !member("+", s);
}

function infix_multiplier(s) {
  return items_before_first("*", s);
}

function infix_multiplicand(s) {
  return items_after_first("*", s);
}

function infix_deriv(expression, variable) {
  return is_number(expression)
    ? 0
    : is_variable(expression)
    ? is_same_variable(expression, variable)
      ? 1
      : 0
    : infix_is_sum(expression)
    ? infix_make_sum(
        infix_deriv(infix_addend(expression), variable),
        infix_deriv(infix_augend(expression), variable)
      )
    : infix_is_product(expression)
    ? infix_make_sum(
        infix_make_product(
          infix_multiplier(expression),
          infix_deriv(infix_multiplicand(expression), variable)
        ),
        infix_make_product(
          infix_deriv(infix_multiplier(expression), variable),
          infix_multiplicand(expression)
        )
      )
    : "error";
}

// refactored at line 1862
// function is_element_of_set(x, set) {
//   return is_null(set)
//     ? false
//     : equal(x, head(set))
//     ? true
//     : is_element_of_set(x, tail(set));
// }

// refactored at line 1891
// function adjoin_set(x, set) {
//   return is_element_of_set(x, set) ? set : pair(x, set);
// }

// refactored at line 1873
// function inetersection_set(set1, set2) {
//   return is_null(set1) || is_null(set2)
//     ? null
//     : is_element_of_set(head(set1), set2)
//     ? pair(head(set1), inetersection_set(tail(set1), set2))
//     : inetersection_set(tail(set1), set2);
// }

/**
 * Exercise 2.59
 */
function union_set(set1, set2) {
  return is_null(set1)
    ? set2
    : adjoin_set(head(set1), union_set(tail(set1), set2));
}

/**
 * Exercise 2.60
 */
// is_element_of_set and intersection_set remain still
// time complexity of adjoin_set drops from O(n) to O(1)
// function adjoin_set(x, set) {
//   return pair(x, set);
// }
// time complexity of union_set drops from O(mn) to O(n) where n is the size of set1 and m the size of set 2
// function union_set(set1, set2) {
//   return append(set1, set2);
// }

function is_element_of_set(x, set) {
  return is_null(set)
    ? false
    : x === head(set)
    ? true
    : x < head(set)
    ? false
    : is_element_of_set(x, tail(set));
}

function intersection_set(set1, set2) {
  if (is_null(set1) || is_null(set2)) {
    return null;
  } else {
    const x1 = head(set1);
    const x2 = head(set2);
    return x1 === x2
      ? pair(x1, intersection_set(tail(set1), tail(set2)))
      : x1 < x2
      ? intersection_set(tail(set1), set2)
      : intersection_set(set1, tail(set2));
  }
}

/**
 * Exercise 2.61
 */
function adjoin_set(x, set) {
  return is_null(set)
    ? list(x)
    : x === head(set)
    ? set
    : x < head(set)
    ? pair(x, set)
    : pair(head(set), adjoin_set(x, tail(set)));
}

/**
 * Exercise 2.62
 */
function union_set(set1, set2) {
  if (is_null(set1) && is_null(set2)) {
    return null;
  } else {
    if (is_null(set1)) {
      return set2;
    } else {
      if (is_null(set2)) {
        return set1;
      } else {
        const x1 = head(set1);
        const x2 = head(set2);
        return x1 === x2
          ? pair(x1, union_set(tail(set1), tail(set2)))
          : x1 < x2
          ? pair(x1, union_set(tail(set1), set2))
          : pair(x2, union_set(set1, tail(set2)));
      }
    }
  }
}
