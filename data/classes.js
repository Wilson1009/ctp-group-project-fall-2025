const classes = {
    // simple lists already used elsewhere in the app
    CSCI: ["111", "211", "313"],
    MATH: ["141", "142", "143"],

    // Bachelor of Science (CSCI-BS) curriculum / prerequisite set (from the attached diagram)
    CSCI_BS: [
        "111", // Intro to Algorithmic Problem Solving
        "211", // OOP in C++
        "212", // OOP in Java
        "220", // Discrete Structures
        "240", // Comp Org & Assem Lang
        "313", // Data Structures
        "320", // Theory of Comp
        "316", // Principles of PLs
        "323", // Design & Analysis of Algorithms (elective)
        "331", // Database (elective)
        "340", // Operating Systems
        "343", // Computer Architecture
        "370", // Software Engineering
    ],

    // Additional math courses referenced in the diagram
    MATH_EXTRA: [
        "120", // Discrete Math
        "122", // Pre-Calculus
        "141", // Calculus I
        "151", // Calculus (alternate)
        "231", // Linear Algebra
        "142", // Calculus II
        "152", // Calculus II (alternate)
        "143", // Calculus III
        "241", // Probability & Statistics
    ],
};

export default classes;