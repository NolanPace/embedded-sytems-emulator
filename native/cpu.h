#pragma once
#include <stdint.h>
#include <stddef.h>
typedef struct {uint8_t ram[256];uint8_t acc,pc,zero,halted;unsigned long cycles;} Cpu;
void cpu_reset(Cpu* c);
int cpu_load(Cpu* c,const uint8_t* bytes,size_t count);
int cpu_step(Cpu* c);
