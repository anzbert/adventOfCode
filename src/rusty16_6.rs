use std::collections::HashMap;

pub fn run() {
    let test = "eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar";

    // test answer: easter

    let input = match std::fs::read_to_string("./data/2016-puzzle6.txt") {
        Ok(content) => content,
        Err(err) => panic!("{:?}", err),
    };

    let to_array: Vec<&str> = input.lines().collect();

    // println!("{:?}", to_array);
    for i in 0..to_array[0].len() {
        let mut hash: HashMap<char, i32> = HashMap::new();
        for l in to_array.iter() {
            let characters: Vec<char> = l.chars().collect();
            let entry = hash.entry(characters[i]).or_insert(0);
            *entry += 1;
        }
        let max = hash.iter().max_by_key(|entry| entry.1).unwrap();

        println!("{:?}", max);
    }
    // umcvzsmw

    println!("\npart 2:\n");

    for i in 0..to_array[0].len() {
        let mut hash: HashMap<char, i32> = HashMap::new();
        for l in to_array.iter() {
            let characters: Vec<char> = l.chars().collect();
            let entry = hash.entry(characters[i]).or_insert(0);
            *entry += 1;
        }
        let max = hash.iter().min_by_key(|entry| entry.1).unwrap();

        println!("{:?}", max);
    }
    // rwqoacfz
}
