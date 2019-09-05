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

    return seat_map

def allocate_seat(seat_map, user_list, strategy):
    pass

def allocate_random_seat(seat_map, group_user_list):
    # get user list
    # user_list = list(map(lambda x: x[0] + x[1], [(g, u) for g, u in group_user_list.items()]))
    pass

def allocate_max_discrete_seat(seat_map, group_user_list):
    pass

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
    print(allocate_seat_for_N(user_in_group_count_map_1, 'bygroup'))

