pub fn run() {
    #[allow(unused_variables)] // disable unused variable warning
    let input = match std::fs::read_to_string("./data/2016-puzzle2.txt") {
        Ok(content) => content,
        Err(err) => panic!("{:?}", err),
    };
    // println!("input: {}", input);

    let test = "ULLRRDDDLURDLUUUUD"; // result 5
    let start_pos = vec![1, 1]; // is number 5

    println!("test {}", grid_3x3_to_num(&start_pos));
    println!("final posi: {:?}", plot_direction(&test, &start_pos));
}

fn plot_direction(input: &str, input_pos: &Vec<i32>) -> i32 {
    let mut pos = input_pos;

    for dir in input.chars() {
        println!("char {}", dir);
    }

    grid_3x3_to_num(&pos)
}

fn grid_3x3_to_num(grid_pos: &Vec<i32>) -> i32 {
    let num = grid_pos[0] + 1 + grid_pos[1] * 3;
    num
}
