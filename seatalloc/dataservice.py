import pandas as pd
from functools import reduce

def load_employee_data(group_count_map=None):
    # read employee names
    df = pd.read_csv('.\\employeedata.csv')

    # print(df.head())
    # convert to 'name', 'group'
    empl_names = df['first_name'].values + ' ' + df['last_name'].values
    
    # map with groups
    if group_count_map is None: 
        groups = df['state'].values
        # connect
        name_groups = list(zip(empl_names, groups))
    else:
        # total count
        total_count = sum(group_count_map.values())

        empl_names = empl_names[:total_count]
        groups = reduce(lambda a, b: a + b, [[x] * y for x, y in group_count_map.items()])
        # print(empl_names)
        name_groups = list(zip(empl_names, groups))

    # print(name_groups)
        
    return name_groups

if __name__ == '__main__':
    load_employee_data({'DEV': 5, 'RTB': 10})
