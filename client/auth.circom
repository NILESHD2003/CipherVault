// For circom 0.5.46 (no pragma needed)

template IsEqual() {
    signal input in[2];
    signal output out;
    
    signal inv;
    
    // Check if inputs are equal
    inv <-- in[0] != in[1] ? 1 : 0;
    
    // Verify constraint
    inv * (in[0] - in[1]) === 0;
    
    // Ensure inv is 0 or 1
    inv * (1 - inv) === 0;
    
    // Set output (1 if equal, 0 if not equal)
    out <== 1 - inv;
}

template Auth() {
    signal input passwordHash;
    signal input expectedHash;
    signal output isValid;
    
    component eq = IsEqual();
    eq.in[0] <== passwordHash;
    eq.in[1] <== expectedHash;
    
    isValid <== eq.out;
}

component main = Auth();