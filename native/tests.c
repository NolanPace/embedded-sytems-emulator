#include "cpu.h"
#include <assert.h>
#include <stdio.h>
int main(void){
 Cpu cpu;uint8_t p[]={0x10,5,0x11,3,0x20,128,0xff};
 assert(cpu_load(&cpu,p,sizeof p)==0);
 for(int i=0;i<10&&!cpu.halted;i++)assert(cpu_step(&cpu)>=0);
 assert(cpu.halted&&cpu.acc==8&&cpu.ram[128]==8);
 uint8_t jump[]={0x10,0,0x31,6,0x10,77,0xff};
 assert(cpu_load(&cpu,jump,sizeof jump)==0);
 for(int i=0;i<6&&!cpu.halted;i++)assert(cpu_step(&cpu)>=0);
 assert(cpu.acc==0);
 assert(cpu_load(&cpu,(uint8_t[]){0x92},1)==0);
 assert(cpu_step(&cpu)==-1);
 puts("CPU emulator tests passed");return 0;
}