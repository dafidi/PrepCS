# This is a placeholder test file for the "TwoSum" problem.

def two_sum(l, v):
  num_items = len(l)
  ans = []
  for i in range(num_items):
    for j in range(i+1, num_items):
      if l[i] + l[j] == v:
        ans.append((l[i], l[j]))

  return ans
