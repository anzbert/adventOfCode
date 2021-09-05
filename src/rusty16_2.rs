pub fn run() {
    #[allow(unused_variables)] // disable unused variable warning
    let input = match std::fs::read_to_string("./data/2016-puzzle2.txt") {
        Ok(content) => content,
        Err(err) => panic!("{:?}", err),
    };

    // RESULT PART ONE: 44558 (5 digits)
    // RESULT PART TWO: 6BBAD (5 digits)

    let test = "ULL\nRRDDD\nLURDL\nUUUUD"; // result part one: 1985 // part two: 5DB3
                                           // println!("end of input: {:?}", plot_direction(&input));
    println!("end of input_part2: {:x}", plot_direction_part2(&input));
}

fn plot_direction(input: &str) -> i32 {
    let mut x = 1;
    let mut y = 1;

    for dir in input.chars() {
        match dir {
            'U' => y -= 1,
            'D' => y += 1,
            'L' => x -= 1,
            'R' => x += 1,
            '\n' => {
                println!("end of instruction: {}\n", grid_3x3_to_num(x, y));
            }
            ' ' => {
                println!("empty space?!: {:?}", dir)
            }
            _ => {
                println!("cant parse: {:?}", dir);
            }
        }
        if x < 0 {
            x = 0;
        }
        if x > 2 {
            x = 2;
        }
        if y < 0 {
            y = 0;
        }
        if y > 2 {
            y = 2;
        }
    }

    grid_3x3_to_num(x, y)
}

fn grid_3x3_to_num(a: i32, b: i32) -> i32 {
    let num = a + 1 + b * 3;
    num
}

fn plot_direction_part2(input: &str) -> i32 {
    let mut x = 0;
    let mut y = 2;

    for dir in input.chars() {
        match dir {
            'U' => {
                if check5(x, y - 1) == true {
                    y -= 1;
                }
            }
            'D' => {
                if check5(x, y + 1) == true {
                    y += 1;
                }
            }
            'L' => {
                if check5(x - 1, y) == true {
                    x -= 1;
                }
            }
            'R' => {
                if check5(x + 1, y) == true {
                    x += 1;
                }
            }
            '\n' => {
                println!("end of instruction part2: {:x}\n", grid_5x5_to_num(x, y));
            }
            ' ' => {
                println!("empty space?!_p2: {:?}", dir)
            }
            _ => {
                println!("cant parse_p2: {:?}", dir);
            }
        }
        // println!("newpos-x: {} / y: {}", x, y);
    }

    grid_5x5_to_num(x, y)
}

fn grid_5x5_to_num(a: i32, b: i32) -> i32 {
    match (a, b) {
        (2, 0) => 1,
        (x, 1) => x + 1,
        (x, 2) => x + 5,
        (x, 3) => x + 9,
        (2, 4) => 13,
        _ => panic!("ERROR"),
    }
}

fn check5(a: i32, b: i32) -> bool {
    if a < 0 || a > 4 {
        return false;
    }
    if b < 0 || b > 4 {
        return false;
    }
    let tupl = (a, b);
    match tupl {
        (0, 0)
        | (1, 0)
        | (3, 0)
        | (4, 0)
        | (0, 1)
        | (4, 1)
        | (0, 3)
        | (4, 3)
        | (0, 4)
        | (1, 4)
        | (3, 4)
        | (4, 4) => {
            // println!("C5-invalid: {} / {}", a, b);
            return false;
        }
        _ => {
            // println!("C5-good one! {} / {}", a, b)
        }
    };
    true
}
