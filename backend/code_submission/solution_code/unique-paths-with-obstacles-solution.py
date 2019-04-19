def unique_paths_with_obstacles(obstacle_grid):
    if obstacle_grid[0][0] == 1:
        return 0

    solutions = [[0 for _ in range(len(obstacle_grid[0]))] for _ in range(len(obstacle_grid))]
    solutions[0][0] = 1
    for i in range(len(obstacle_grid)):
        for j in range(len(obstacle_grid[0])):
            if obstacle_grid[i][j] != 1:
                if i-1 >= 0:
                    solutions[i][j] += solutions[i-1][j]

                if j-1 >= 0:
                    solutions[i][j] += solutions[i][j-1]

    return solutions[len(obstacle_grid)-1][len(obstacle_grid[0])-1]
