# Embedded Systems Emulator

A visual **8-bit microcontroller** emulator built with a **C11 reference implementation** and an interactive **React + TypeScript** register/memory display. Load a tiny instruction program, step through instructions, and inspect accumulator, program counter, zero flag and RAM.

## Run React UI
```bash
cd web && npm install && npm run dev
```

## Build C emulator
```bash
cmake -S native -B build && cmake --build build
ctest --test-dir build --output-on-failure
./build/emulator
```

## Instruction set
| Opcode | Operands | Meaning |
|---|---|---|
| `10` | immediate byte | Load accumulator |
| `11` | immediate byte | Add to accumulator (8-bit) |
| `20` | address | Store accumulator in RAM |
| `21` | address | Load from RAM |
| `30` | address | Jump |
| `31` | address | Jump if zero flag |
| `FF` | none | Halt |

This is a **fictional educational CPU**, not a real ESP32/AVR hardware emulator. The web and C engines implement the same small ISA separately and can be compared.

GitHub repository spelling uses `embedded-sytems-emulator` because that is the existing repository name. MIT licensed.
