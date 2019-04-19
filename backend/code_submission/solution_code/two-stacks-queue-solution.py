class MyQueueUsingStacks:
    def __init__(self):
        self.new_elements = Stack()
        self.old_elements = Stack()
    
    def enqueue(self, element):
        self.new_elements.push(element)
    
    def dequeue(self, element):
        if self.old_elements.is_empty():
            self.move_elements()
        return self.old_elements.pop()

    def move_elements(self):
        while not self.new_elements.is_empty(): #If not equal to False
            element = self.new_elements.pop()
            self.old_elements.push(element)


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
