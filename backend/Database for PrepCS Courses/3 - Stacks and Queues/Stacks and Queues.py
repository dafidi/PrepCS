"""
===================================================================================
                                      EASY
===================================================================================
"""
#########################################
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
#########################################
# a = Stack()
# a.push("Bob")
# print(a)
#########################################
class Queue:
	def __init__(self):
		self.items = []
	def enqueue(self, item):
		self.items.append(item)
	def dequeue(self):
		item_to_del = self.items[0]
		del self.items[0]
		return item_to_del
	def __str__(self):
		for i in range (0, len(self.items)):
			print(self.items[i], "", end = "")
		return ""
#########################################
class Queue2:
	def __init__(self):
		self.items = []
	def enqueue(self, item):
		self.items.insert(0, item)
	def dequeue(self):
		return self.items.pop()
	def __str__(self):
		for i in range(0, len(self.items)):
			print(self.items[i], "", end = "")
		return ""
#########################################
# a = Queue()
# a.enqueue("Bob")
# a.enqueue("Lucy")
# print(a)
# a.dequeue()
# print(a)

"""
===================================================================================
                                     MEDIUM
===================================================================================
"""
#########################################
"""
How would you design a stack which, in addition to push and pop, also has a function
min which returns the minimum element? Push, pop and min should all operate in
O(1) time.
"""
class StackWithMin(object):
    def __init__(self):
        self.items = []
        self.min_items = []

    def min(self):
        return self.min_items[-1]

    def push(self, value):
        if value <= self.min():
            self.min_items.append(value)

        self.items.append(value)

    def pop(self):
        value = self.items.pop()
        if value == self.min():
            self.min_items.pop()

        return value

#########################################
"""
Implement a Queue class which implements a queue using two stacks.
"""
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
"""
===================================================================================
                                      HARD
===================================================================================
"""

#########################################
"""
Given a string containing just the characters '(', ')', '{', '}', '[', ']',
determine if the input string is valid.
The brackets must close in the correct order, "()" and "()[]{}" are all valid 
but "(]" and "([)]" are not.
"""
def is_valid_parentheses(input_string):
    character_map = {'(':')', '{':'}', '[':']'}
    stack = []
    string_list = list(input_string)
    for character in string_list:
        if character == '(' or character == '{' or character == '[':
            stack.append(character)
        else:
            if len(stack) == 0:
                return False
            
            top = stack.pop()
            if character_map[top] != character:
                return False
            
    
    if len(stack) != 0:
        return False
    
    return True

# if __name__ == '__main__':
#     print (is_valid_parentheses("{{}}"))
#     print (is_valid_parentheses("[[{]]{"))
#     print (is_valid_parentheses("["))
#########################################