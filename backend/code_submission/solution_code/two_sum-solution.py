
def two_sum(l, v):
  """ 
  l is a list of numbers and v is the target value.
  """
  n = len(l)
  solution = []

  for i in range(n):
    for j in range(i+1, n):
      if l[i] + l[j] == v:
        solution.append((l[i], l[j]))

  return solution
