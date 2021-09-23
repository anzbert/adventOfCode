use regex::Regex;

#[allow(unused_variables)]
pub fn run() {
    let test = "rect 3x2\nrotate column x=1 by 1\nrotate row y=0 by 4\nrotate column x=1 by 1"; // answer 6

    let input = match std::fs::read_to_string("./data/2016-puzzle8.txt") {
        Ok(content) => content,
        Err(err) => panic!("{:?}", err),
    };

    let mut matrix: [[usize; 6]; 50] = [[0; 6]; 50]; // display: 50x6

    let to_array: Vec<&str> = input.lines().collect();

    let re_inst = Regex::new(r"rect|column|row").unwrap();
    let re_numbers = Regex::new(r"(\d+)").unwrap();

    let mut instructs: Vec<Instruction> = Vec::new();
    for line in to_array.iter() {
        let inst = re_inst.find(line).unwrap().as_str().to_string();

        let numbers: Vec<usize> = re_numbers
            .find_iter(line)
            .map(|x| x.as_str().parse().unwrap())
            .collect();

        instructs.push(Instruction {
            inst,
            x: numbers[0],
            y: numbers[1],
        });
    }
    // println!("{:?}", instructs);

    process_instr(&instructs, &mut matrix);

    println!("result: {}", count(&matrix)); // result part one: 123

    display_screen(&matrix); //// result part 2: AFBUPZBJPS
}

fn display_screen(matrix: &[[usize; 6]; 50]) {
    let mut output: String = String::new();
    for x in matrix.iter().rev() {
        for y in x {
            match *y {
                0 => output.push_str("-"),
                1 => output.push_str("*"),
                _ => panic!("crap!"),
            }
        }
        output.push_str("\n");
    }
    println!("{}", output)
}

fn count(matrix: &[[usize; 6]; 50]) -> usize {
    let mut counter = 0;
    for x in matrix.iter() {
        for y in x {
            if *y == 1 {
                counter += 1;
            }
        }
    }
    counter
}

fn process_instr(instructions: &Vec<Instruction>, matrix: &mut [[usize; 6]; 50]) {
    for i in instructions {
        println!("\ninst: {} {} by {}", i.inst, i.x, i.y);
        match &i.inst as &str {
            "rect" => {
                rect(i.x, i.y, matrix);
            }
            "column" => {
                column(i.x, i.y, matrix);
            }
            "row" => {
                row(i.x, i.y, matrix);
            }
            _ => panic!("arghh !! dodgy instruction!"),
        }
    }
}

fn column(col: usize, shift_by: usize, matrix: &mut [[usize; 6]; 50]) {
    let temp: [usize; 6] = matrix[col].clone();

    for i in 0..6 {
        let shift = (i + shift_by) % 6;
        matrix[col][shift] = temp[i];
    }
}

fn row(row: usize, shift_by: usize, matrix: &mut [[usize; 6]; 50]) {
    let temp = matrix.map(|x| x[row]);

    for i in 0..50 {
        let shift = (i + shift_by) % 50;
        matrix[shift][row] = temp[i];
    }
}

fn rect(x_rect: usize, y_rect: usize, matrix: &mut [[usize; 6]; 50]) {
    for x in 0..x_rect {
        for y in 0..y_rect {
            matrix[x][y] = 1;
        }
    }
}

#[derive(Debug)]
struct Instruction {
    inst: String,
    x: usize,
    y: usize,
}
