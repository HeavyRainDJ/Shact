import time


class Hackathon:
    name: str
    address: str
    registration: str
    link: str

    def __init__(self, *, name: str, address: str, registration: str, link: str):
        self.name = name
        self.address = address
        self.registration = registration
        self.link = link


def parser(func):
    def wrapper(*args):
        try:
            print("-" * 60)
            start = time.time()
            elements_before = len(args[1])
            print(f"Starting Parsing [{args[0]}]...")
            func(*args)
            end = time.time()
            elements_after = len(args[1])
            print("Time passed: {:.2f} sec.".format(end - start))
            print(f"Added new storage elements: {elements_after - elements_before}")
            print("-" * 60)
        except Exception as e:
            print(f"Something went wrong...{e}")

    return wrapper
