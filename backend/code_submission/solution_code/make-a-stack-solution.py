class Stack:
	def __init__(self):
	    self.items = []
	def is_empty(self):
	    return self.items == []
	def push(self, item):
	    self.items.append(item)
	def pop(self):
		if self.is_empty():
			raise StackEmptyException
		else:
			item_to_del = self.items.pop()
		return item_to_del
	
	def peek(self):
		  if self.is_empty():
			    raise StackEmptyException
		  else:
			    return self.items[-1]
	def __str__(self):
		for i in range(0, len(self.items)):
			print(self.items[i], "", end = "")
		return ""

class StackEmptyException(Exception):
	pass
