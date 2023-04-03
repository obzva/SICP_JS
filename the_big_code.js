function identity(x) {
  return x;
}

function inc(x) {
  return x + 1;
}

function cube(x) {
  return x * x * x;
}

// function sum(term, a, next, b) {
//   return a > b ? 0 : term(a) + sum(term, next(a), next, b);
// }

function sum_cubes(a, b) {
  return sum(cube, a, inc, b);
}

function sum_integers(a, b) {
  return sum(identity, a, inc, b);
}

function pi_sum(a, b) {
  return sum(
    (x) => 1 / (x * (x + 2)),
    a,
    (x) => x + 4,
    b
  );
}

function integral(f, a, b, dx) {
  return sum(f, a + dx / 2, (x) => x + dx, b) * dx;
}

function is_even(x) {
  return x % 2 === 0;
}

function expmod(base, exp, m) {
  if (exp === 0) {
    return 1;
  } else {
    if (is_even(exp)) {
      const half_expmod = expmod(base, exp / 2, m);
      return square(half_expmod) % m;
    } else {
      return (base * expmod(base, exp - 1, m)) % m;
    }
  }
}

function search(f, neg_point, pos_point) {
  const midpoint = average(neg_point, pos_point);
  if (close_enough(neg_point, pos_point)) {
    return midpoint;
  } else {
    const test_value = f(midpoint);
    return positive(test_value)
      ? search(f, neg_point, midpoint)
      : negative(test_value)
      ? search(f, midpoint, pos_point)
      : midpoint;
  }
}

function average(x, y) {
  return (x + y) / 2;
}

function positive(x) {
  return x > 0;
}

function negative(x) {
  return x < 0;
}

function close_enough(x, y) {
  return abs(x - y) < 0.001;
}

function abs(x) {
  return x >= 0 ? x : -x;
}

function half_interval_method(f, x, y) {
  const x_value = f(x);
  const y_value = f(y);
  return positive(x_value) && negative(y_value)
    ? search(f, y, x)
    : negative(x_value) && positive(y_value)
    ? search(f, x, y)
    : console.log("values are not of opposite sign");
}

function fixed_point(f, first_guess) {
  const tolerance = 0.00001;
  function close_enough(x, y) {
    return abs(x - y) < tolerance;
  }
  function try_with(guess) {
    const next = f(guess);
    return close_enough(guess, next) ? next : try_with(next);
  }
  return try_with(first_guess);
}

// function sqrt(x) {
//   return fixed_point((y) => average(y, x / y), 1);
// }

function is_charmichael(x) {
  function iter(test, n) {
    return test === n
      ? true
      : expmod(test, n, n) === test
      ? iter(test + 1, n)
      : false;
  }
  return iter(1, x);
}

function fermat_test(n) {
  function try_it(a) {
    return expmod(a, n, n) === a;
  }
  return try_it(1 + Math.floor(Math.random() * (n - 1)));
}

function miller_rabin(n) {
  function try_it(a) {
    return expmod_checked(a, n - 1, n) === 1;
  }
  return try_it(1 + Math.floor(Math.random() * (n - 1)));
}

function is_non_trivial_sqrt(x, m) {
  return !(x === 1 || x === m - 1) && square(x) % m === 1 ? 0 : square(x) % m;
}

function expmod_checked(base, exp, m) {
  if (exp === 0) {
    return 1;
  } else {
    if (is_even(exp)) {
      const half_expmod = expmod(base, exp / 2, m);
      return is_non_trivial_sqrt(half_expmod);
    } else {
      return (base * expmod(base, exp - 1, m)) % m;
    }
  }
}

function average_damp(f) {
  return (x) => average(x, f(x));
}

function square(x) {
  return x * x;
}

// function sqrt(x) {
//   return fixed_point(
//     average_damp((y) => x / y),
//     1
//   );
// }

function cube_root(x) {
  return fixed_point(
    average_damp((y) => x / square(y)),
    1
  );
}

function deriv(g) {
  const dx = 0.00001;
  return (x) => (g(x + dx) - g(x)) / dx;
}

function newton_transfrom(g) {
  return (x) => x - g(x) / deriv(g)(x);
}

function newton_method(g, guess) {
  return fixed_point(newton_transfrom(g), guess);
}

// function sqrt(x) {
//   return newton_method((y) => square(y) - x, 1);
// }

function fixed_point_of_transform(g, transform, guess) {
  return fixed_point(transform(g), guess);
}

// function sqrt(x) {
//   return fixed_point_of_transform((y) => y / x, average_damp, 1);
// }

function sqrt(x) {
  return fixed_point_of_transform((y) => square(y) - x, newton_transfrom, 1);
}

/* ----------------
 * exercise 1-29
 * */
function simpson_rule(f, a, b, n) {
  return simpson_rule_iter(f, a, b, n, 0);
}
function simpson_rule_iter(f, a, b, n, iter) {
  if (iter === n + 1) {
    return 0;
  } else {
    const h = (b - a) / n;
    const y = f(a + iter * h);
    return iter === 0 || iter === n
      ? (h / 3) * y + simpson_rule_iter(f, a, b, n, iter + 1)
      : is_even(iter)
      ? (h / 3) * 2 * y + simpson_rule_iter(f, a, b, n, iter + 1)
      : (h / 3) * 4 * y + simpson_rule_iter(f, a, b, n, iter + 1);
  }
}

/* ----------------
 * exercise 1-30
 * */
function sum(term, a, next, b) {
  function iter(x, y) {
    return x > b ? y : iter(next(x), y + term(x));
  }
  return iter(a, 0);
}

/* ----------------
 * exercise 1-31
 * */
function product(term, a, next, b) {
  function iter(x, y) {
    return x > b ? y : iter(next(x), y * term(x));
  }
  return iter(a, 1);
}

// function product(term, a, next, b) {
//   return a > b ? 1 : term(a) * product(term, next(a), next, b);
// }

function factorial(n) {
  return product((x) => x, 1, inc, n);
}

function pi_product(precision) {
  return product(
    (x) => (2 * x * 2 * (x + 1)) / square(2 * x + 1),
    1,
    inc,
    precision
  );
}

// console.log("             pi / 4:", Math.PI / 4);
// console.log("   approximation_10:", pi_product(10));
// console.log("  approximation_100:", pi_product(100));
// console.log(" approximation_1000:", pi_product(1000));
// console.log(" approximation_5000:", pi_product(5000));

/* ----------------
 * exercise 1-32
 * */
// function accumulate(combiner, null_value, term, a, next, b) {
//   function iter(x, y) {
//     return x > b ? y : iter(next(x), combiner(term(x), y));
//   }
//   return iter(a, null_value);
// }

function accumulate(combiner, null_value, term, a, next, b) {
  return a > b
    ? null_value
    : combiner(
        term(a),
        accumulate(combiner, null_value, term, next(a), next, b)
      );
}

/* ----------------
 * exercise 1-33
 * */
function filtered_accumulate(filter, combiner, null_value, term, a, next, b) {
  return a > b
    ? null_value
    : combiner(
        filter(term(a)) ? term(a) : null_value,
        accumulate(combiner, null_value, term, next(a), next, b)
      );
}

/* ----------------
 * exercise 1-34
 * */
function f(g) {
  return g(2);
}
// f(f) = f(2)
//      = 2(2) <- Error: 2 is not a function

/* ----------------
 * exercise 1-35
 * */
// console.log(fixed_point((x) => 1 + 1 / x, 1));

/* ----------------
 * exercise 1-36
 * */
function printing_fixed_point(f, first_guess) {
  const tolerance = 0.00001;
  function close_enough(x, y) {
    return abs(x - y) < tolerance;
  }
  let count = 1;
  function try_with(guess) {
    const next = f(guess);
    console.log(
      `count ${count}| guess: ${guess}, diff: ${Math.abs(
        guess - next
      )}, f(guess): ${next}`
    );
    count++;
    return close_enough(guess, next) ? next : try_with(next);
  }
  return try_with(first_guess);
}
function test(n) {
  console.log("w/o average damping");
  printing_fixed_point((x) => Math.log(1000) / Math.log(x), n);
  console.log("w/ average damping");
  printing_fixed_point(
    average_damp((x) => Math.log(1000) / Math.log(x)),
    n
  );
}
// without average-damping, it takes about three times more steps to operate it

/* ----------------
 * exercise 1-37
 * */

// iterative
function cont_frac(n, d, k) {
  function iter(i, prev) {
    return i === 0 ? prev : iter(i - 1, n(i) / (d(i) + prev));
  }
  return iter(k, 0);
}

// recursive
// function cont_frac(n, d, k) {
//   function recur(i, k) {
//     return i > k ? 0 : n(i) / (d(i) + recur(i + 1, k));
//   }
//   return recur(1, k);
// }

function test_1_37(n) {
  console.log(`test | ${n} --------`);
  console.log(`1 / (the_golden_ratio) : 0.6180`);
  console.log(
    `cont_frac_approximation: ${cont_frac(
      (i) => 1,
      (i) => 1,
      n
    )}`
  );
}
// K must be larger than 10 in order to get an approximation that is accurate to 4 decimal places

/* ----------------
 * exercise 1-38
 * */
function test_1_38(n) {
  console.log(`test | ${n} --------`);
  console.log(`the Euler number - 2   : 0.71828`);
  console.log(
    `cont_frac_approximation: ${cont_frac(
      (x) => 1,
      (x) => (x % 3 === 2 ? Math.ceil(x / 3) * 2 : 1),
      n
    )}`
  );
}

/* ----------------
 * exercise 1-39
 * */
function tan_cf(x, k) {
  return cont_frac(
    (i) => (i === 1 ? x : -square(x)),
    (i) => 2 * i - 1,
    k
  );
}

function test_1_39(n) {
  console.log(`test | n = ${n} --------`);
  console.log(`tan(PI/6)              : 0.57735026919`);
  console.log(`cont_frac_approximation: ${tan_cf(Math.PI / 6, n)}`);
}
