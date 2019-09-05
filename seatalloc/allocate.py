from functools import reduce
import random as rdn

all_groups = []
user_in_group_count_map_1 = {'Dev 1': 3, 'Dev 2': 9, 'Dev 3': 2, 'Dev 4': 12, 'RTB 1': 7, 'HR': 4}

def allocate_seat_for_N(user_group_counts, strategy):
    # init for N
    # generate user list
    group_list = {}      # group->[user list]
    total_user = 0
    for g, c in user_group_counts.items():
        group_list[g] = [f'User {x+1}' for x in range(c)]
        total_user += c

    # calc seat count
    seat_count = total_user + rdn.randint(-5, 5)

    # init seat map
    seat_map = ['' for _ in range(seat_count)]

    # allocate by strategy
    if strategy == 'random':
        return allocate_random_seat(seat_map, group_list)
    elif strategy == 'bygroup':
        return allocate_seat_by_group(seat_map, group_list)

    return [], []

def allocate_seat(seat_map, user_list, strategy):
    pass

def allocate_random_seat(seat_map, group_user_list):
    # get user list
    user_list = reduce(lambda x, y: x + y, list(map(lambda x: [(x[0], y) for y in x[1]], group_user_list.items())))
    # print(user_list)

    user_not_allocated = []

    # allocate random
    # user_count = len(user_list)
    seat_count = len(seat_map)
    allocated = 0
    for u in user_list:
        if allocated < seat_count:
            while True:
                idx = rdn.randint(0, seat_count - 1)
                if seat_map[idx] == '':
                    break

            seat_map[idx] = f'{u[1]}@{u[0]}'
            allocated += 1
        else:
            user_not_allocated.append(f'{u[1]}@{u[0]}')

    # adjust seat to make sure max distance between team mates

    return seat_map, user_not_allocated

def allocate_seat_by_group(seat_map, group_user_list):
    seat_count = len(seat_map)
    cur_seat_idx = 0

    user_not_allocated = []

    for g, us in group_user_list.items():
        for u in us:
            ug = f'{u}@{g}'
            if cur_seat_idx < seat_count:
                seat_map[cur_seat_idx] = ug
                cur_seat_idx += 1
            else:
                user_not_allocated.append(ug)
    
    return seat_map, user_not_allocated
    
if __name__ == '__main__':
    print(allocate_seat_for_N(user_in_group_count_map_1, 'random'))
    
