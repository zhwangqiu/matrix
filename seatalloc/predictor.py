import math
import random as rdn
import statistics 

total_days_a_year = 365 - 52 *  2 - 10

possi_config_1 = {1: 0.1, 2: 0.15, 3: 0.05, 4: 0.05, 5: 0.1, 6: 0.1, 7: 0.1, 8: 0.1, 9: 0.05, 10: 0.15, 11: 0.05, 12: 0.05}
possi_config_2 = {1: 2/15, 2: 2/15, 3: 2/15, 4: 1/15, 5: 1/15, 6: 1/15, 7: 1/15, 8: 1/15, 9: 1/15, 10: 1/15, 11: 1/15, 12: 1/15}

def seat_count_predict(simulate_times, employee_count, total_days, leave_days, **kwargs):
    # run all simulates
    simulates = [simulate_year_leaves(idx, employee_count, total_days, leave_days) for idx in range(simulate_times)]
    
    # calc result
    max_leave_count_avg = statistics.mean([x[0] for x in simulates])
    mean_leave_count_avg = statistics.mean([x[1] for x in simulates])
    min_leave_count_avg = statistics.mean([x[2] for x in simulates])

    return (employee_count - max_leave_count_avg, employee_count - mean_leave_count_avg, employee_count - min_leave_count_avg)

def simulate_year_leaves(idx, employee_count, total_days, leave_days):
    year_leave_stat = run_employee_plans(employee_count, total_days, leave_days)

    # add to stat (max, mean, min)
    return (max(year_leave_stat), statistics.mean(year_leave_stat), min(year_leave_stat))


def build_random_leave_plan(total_days, leave_days):
    plan = []
    c = 0
    while c < leave_days:
        idx = math.floor(rdn.random() * (total_days + 1))
        if not idx in plan:
            plan.append(idx)
            c += 1

    return plan

def build_month_leave_plan(possi_config, total_days, leave_days, base_value=100):
    # build month possi distribution (100 based)    
    month_dist = []
    cur_p = 1
    for m in range(12):
        start = cur_p
        end = (cur_p + math.floor(possi_config[m + 1] * base_value)  - 1) if m < 11 else base_value
        month_dist.append((start, end))
        cur_p = end + 1

    # print(month_dist)

    # build plan
    days_per_month = math.ceil(total_days / 12)
    plan = []
    c = 0
    while c < leave_days:
        rand_val = math.floor(rdn.random() * base_value) + 1
        month_idx = [x[1] >= rand_val >= x[0] for x in month_dist].index(True)

        day_idx = days_per_month * month_idx + math.floor(rdn.random() * days_per_month)
        if day_idx < total_days and not day_idx in plan:
            plan.append(day_idx)
            c += 1

    # print(plan)
    return plan

def run_employee_plans(employee_count, total_days, leave_days):
    # init statistic list
    by_day_leave_stat = [0 for _ in range(total_days)]

    # get all employees' leave plan and add to statistic
    for _ in range(employee_count):
        # p = build_random_leave_plan(total_days, leave_days)
        p = build_month_leave_plan(possi_config_2, total_days, leave_days)
        # print(p)
        # add to statics
        for x in p:
            by_day_leave_stat[x - 1] += 1

    # print(by_day_leave_stat)
    return by_day_leave_stat

def test():
    print('test')
    # print(sorted(build_random_leave_plan(total_days_a_year, 20)))
    # print(sorted(build_month_leave_plan(possi_config_1, total_days_a_year, 20)))
    s = seat_count_predict(1000, 150, total_days_a_year, 20)
    print(s)

if __name__ == '__main__':
    test()
