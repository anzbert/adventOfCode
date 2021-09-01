pub fn run() {
    let input = "R1, L4, L5, L5, R2, R2, L1, L1, R2, L3, R4, R3, R2, L4, L2, R5, L1, R5, L5, L2, L3, L1, R1, R4, R5, L3, R2, L4, L5, R1, R2, L3, R3, L3, L1, L2, R5, R4, R5, L5, R1, L190, L3, L3, R3, R4, R47, L3, R5, R79, R5, R3, R1, L4, L3, L2, R194, L2, R1, L2, L2, R4, L5, L5, R1, R1, L1, L3, L2, R5, L3, L3, R4, R1, R5, L4, R3, R1, L1, L2, R4, R1, L2, R4, R4, L5, R3, L5, L3, R1, R1, L3, L1, L1, L3, L4, L1, L2, R1, L5, L3, R2, L5, L3, R5, R3, L4, L2, R2, R4, R4, L4, R5, L1, L3, R3, R4, R4, L5, R4, R2, L3, R4, R2, R1, R2, L4, L2, R2, L5, L5, L3, R5, L5, L1, R4, L1, R1, L1, R4, L5, L3, R4, R1, L3, R4, R1, L3, L1, R1, R2, L4, L2, R1, L5, L4, L5";

    let test1 = "R2, L3"; // leaves you 2 blocks East and 3 blocks North, or 5 blocks away.
    let test2 = "R2, R2, R2"; // leaves you 2 blocks due South of your starting position, which is 2 blocks away.
    let test3 = "R5, L5, R5, R3"; // leaves you 12 blocks away.

    let vec: Vec<&str> = test1.split(", ").collect();
    // println!("{:?}", vec);

    let tuple_directions = split_it(vec);
    println!("{:?}", tuple_directions);
}

// work with tuples???
fn direction(dir: &str, facing: &str) -> String {
    match dir {
        "R" => match facing {
            "U" => return "R".to_string(),
        },
        "L" => match facing {},
        _ => panic!(),
    }
}

fn split_it(vec: Vec<&str>) -> Vec<(&str, u32)> {
    let mut output = Vec::new();
    for n in vec.iter() {
        let (turn, stepstring) = n.split_at(1);
        let steps: u32 = stepstring.parse().expect("my goodness!#$#$!");
        output.push((turn, steps));
    }
    output
}
