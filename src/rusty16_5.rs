use md5;
pub fn run() {
    let input = "ugkcyxxp";

    let _test = "abc";

    let mut final_code: Vec<char> = Vec::new();
    let mut memory = 0;
    for _i in 0..8 {
        let next = get_next(input, &memory);
        println!("found: {:?}", next);
        memory = next.counter + 1;
        final_code.push(next.digit);
    }

    let done: String = final_code.iter().collect();
    println!("part one code is: {}\n", done); // RESULT ONE: d4cd2ee1

    // PART TWO
    let mut final_code2: Vec<char> = vec!['_'; 8];
    let mut memory2 = 0;
    while final_code2.contains(&'_') {
        let next = get_next2(input, &memory2);
        println!("found: {:?}", next);
        memory2 = next.counter + 1;
        if final_code2[next.position] == '_' {
            final_code2[next.position] = next.digit;
        }
    }

    let done2: String = final_code2.iter().collect();
    println!("part one code is: {}", done2); // RESULT TWO: f2c730e5
}

#[derive(Debug)]
struct Code {
    md: String,
    counter: usize,
    digit: char,
    position: usize, // for part 2
}

fn get_next2(input: &str, start: &usize) -> Code {
    let mut counter = *start;

    loop {
        let test = format!("{}{}", input, counter);
        // println!("input :{:?}", test);

        let digest = format!("{:?}", md5::compute(&test));
        // println!("hash :{:?}\n", digest);

        let ooff = digest.chars().take(5).all(|x| '0'.eq(&x));
        if ooff {
            let dig: Vec<char> = digest.chars().collect();
            let posi = usize::from_str_radix(&dig[5].to_string(), 16).unwrap();
            if posi < 8 {
                return Code {
                    md: digest,
                    counter: counter,
                    digit: dig[6],
                    position: dig[5].to_string().parse().unwrap(), // only for part 2
                };
            };
        }
        counter += 1;
    }
}

fn get_next(input: &str, start: &usize) -> Code {
    let mut counter = *start;

    loop {
        let test = format!("{}{}", input, counter);
        // println!("input :{:?}", test);

        let digest = format!("{:?}", md5::compute(&test));
        // println!("hash :{:?}\n", digest);

        let ooff = digest.chars().take(5).all(|x| '0'.eq(&x));
        if ooff {
            let dig: Vec<char> = digest.chars().collect();
            return Code {
                md: digest,
                counter: counter,
                digit: dig[5],
                position: 0, // only for part 2
            };
        }
        counter += 1;
    }
}
