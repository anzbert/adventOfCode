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
    println!("part one code is: {}", done); // RESULT ONE: d4cd2ee1

    // PART TWO
}

#[derive(Debug)]
struct Code {
    md: String,
    counter: usize,
    digit: char,
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
            };
        }
        counter += 1;
    }
}
