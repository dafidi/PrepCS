class Permutation:
    def __init__(self, string):
        # create the boolean list/array that keeps track of whether a character 
        # has been used 
        self.used = {}
        for character in string:
            self.used[character] = False

        self.string = string
        self.permuted_string = ""
        self.do_permutation()

    def do_permutation(self):
        if len(self.permuted_string) == len(self.string):
            print (self.permuted_string)
            return
        else:
            for character in self.string:
                if self.used[character]:
                    continue
                self.permuted_string = self.permuted_string + character
                self.used[character] = True
                self.do_permutation()
                self.used[character] = False
                self.permuted_string = self.permuted_string[:len(self.permuted_string)-1]
