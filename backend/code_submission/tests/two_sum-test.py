import submission

# Use table tests.
# map input to expected output.
TESTS = [
   (
     # Test case 1.
     ([1, 2, 3, 4, 5, 6], 6), [(2, 4), (1, 5)]
  )
]


def run_tests():
  # Implement tests here.
  all_tests_passed = True
  num_tests_passed = 0
  num_tests_run = 0
  for test in TESTS:
    ans = submission.two_sum(test[0][0], test[0][1])
    if set(ans) == set(test[1]):
      print("test", num_tests_run, "passed.")
      num_tests_passed += 1
    num_tests_run += 1
  return num_tests_run, num_tests_passed


def main():
    num_tests_run, num_tests_passed = run_tests()
    print(num_tests_run, "tests run;", num_tests_passed, "tests passed.")


if __name__ == "__main__":
    main()
