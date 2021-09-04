pub fn run() {
    #[allow(unused_variables)] // disable unused variable warning
    let input = match std::fs::read_to_string("./data/2016-puzzle2.txt") {
        Ok(content) => content,
        Err(err) => panic!("{:?}", err),
    };
    // println!("input: {}", input);

    // RESULT PART ONE: 44558

    let test = "ULL
    RRDDD
    LURDL
    UUUUD"; // result 1985
    println!("final posi: {:?}", plot_direction(&input));
    // 8 is wrong
}

fn plot_direction(input: &str) -> i32 {
    let mut x = 1;
    let mut y = 1;

    for dir in input.chars() {
        // println!("char {}", dir);
        match dir {
            'U' => y -= 1,
            'D' => y += 1,
            'L' => x -= 1,
            'R' => x += 1,
            '\n' => {
                println!(" end of line: {}\n", grid_3x3_to_num(x, y));
            }
            _ => {
                println!("cant parse: {:?}", dir);
                // panic!("aarrghh");
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
        // println!("x:{} / y:{}\n", x, y)
    }

    grid_3x3_to_num(x, y)
}

fn grid_3x3_to_num(a: i32, b: i32) -> i32 {
    let num = a + 1 + b * 3;
    num
}
