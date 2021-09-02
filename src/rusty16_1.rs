pub fn run() {
    let input = "R1, L4, L5, L5, R2, R2, L1, L1, R2, L3, R4, R3, R2, L4, L2, R5, L1, R5, L5, L2, L3, L1, R1, R4, R5, L3, R2, L4, L5, R1, R2, L3, R3, L3, L1, L2, R5, R4, R5, L5, R1, L190, L3, L3, R3, R4, R47, L3, R5, R79, R5, R3, R1, L4, L3, L2, R194, L2, R1, L2, L2, R4, L5, L5, R1, R1, L1, L3, L2, R5, L3, L3, R4, R1, R5, L4, R3, R1, L1, L2, R4, R1, L2, R4, R4, L5, R3, L5, L3, R1, R1, L3, L1, L1, L3, L4, L1, L2, R1, L5, L3, R2, L5, L3, R5, R3, L4, L2, R2, R4, R4, L4, R5, L1, L3, R3, R4, R4, L5, R4, R2, L3, R4, R2, R1, R2, L4, L2, R2, L5, L5, L3, R5, L5, L1, R4, L1, R1, L1, R4, L5, L3, R4, R1, L3, R4, R1, L3, L1, R1, R2, L4, L2, R1, L5, L4, L5";

    let test1 = "R2, L3"; // leaves you 2 blocks East and 3 blocks North, or 5 blocks away.
    let test2 = "R2, R2, R2"; // leaves you 2 blocks due South of your starting position, which is 2 blocks away.
    let test3 = "R5, L5, R5, R3"; // leaves you 12 blocks away.
                                  // PART TWO:
    let test4 = "R8, R4, R4, R8"; // the first location you visit twice is 4 blocks away, due East.
                                  // needs a WALKING by single step function !!!

    let vec: Vec<&str> = input.split(", ").collect();
    // println!("{:?}", vec);

    let tuple_directions = split_it(vec);
    // println!("{:?}", tuple_directions);

    let posi = plot_direction(tuple_directions);
    // println!("posi: {:?}", posi);

    let distance = get_distance(posi);
    println!("final distance: {}", distance); // result part one: 230
}

fn get_distance(pos: Vec<i32>) -> i32 {
    let dist: i32 = pos[0].abs() + pos[1].abs();
    dist
}

fn plot_direction(vec: Vec<(&str, i32)>) -> Vec<i32> {
    let mut x: i32 = 0;
    let mut y: i32 = 0;
    let mut memory = vec![(x, y)];
    let mut direction = "UP";

    for (turn, steps) in vec {
        match turn {
            "R" => match direction {
                "UP" => direction = "RIGHT",
                "RIGHT" => direction = "DOWN",
                "DOWN" => direction = "LEFT",
                "LEFT" => direction = "UP",
                _ => panic!(),
            },
            "L" => match direction {
                "UP" => direction = "LEFT",
                "RIGHT" => direction = "UP",
                "DOWN" => direction = "RIGHT",
                "LEFT" => direction = "DOWN",
                _ => panic!(),
            },
            _ => {
                panic!()
            }
        }
        // println!("direction: {}", direction);
        // WALK:

        for _s in 0..steps {
            match direction {
                "UP" => y += 1,
                "RIGHT" => x += 1,
                "DOWN" => y -= 1,
                "LEFT" => x -= 1,
                _ => panic!(),
            }
            let posi = (x, y);
            memory.push(posi);

            for (i, (a, b)) in memory.iter().enumerate() {
                if *a == x && *b == y && i > 0 && i < memory.len() - 1 {
                    // println!("a:{}  b:{} / x:{}  y:{}", a, b, x, y);
                    // println!("match @ {}/{}", x, y);
                    println!("overlap: {}", get_distance(vec![x, y]))
                }
            }
        }
    }

    let grid_vec = vec![x, y];
    grid_vec
}

fn split_it(vec: Vec<&str>) -> Vec<(&str, i32)> {
    let mut output = Vec::new();
    for n in vec.iter() {
        let (turn, stepstring) = n.split_at(1);
        let steps: i32 = stepstring.parse().expect("my goodness!#$#$!");
        output.push((turn, steps));
    }
    output
}
