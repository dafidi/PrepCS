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
