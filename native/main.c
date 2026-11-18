#include "cpu.h"
#include <stdio.h>
int main(void){
 Cpu c;const uint8_t program[]={0x10,5,0x11,3,0x20,0x80,0xff};
 cpu_load(&c,program,sizeof program);
 printf("step,pc,acc,zero\n");
 for(int i=0;i<20&&!c.halted;i++){
  int result=cpu_step(&c);
  printf("%d,%u,%u,%u\n",i,c.pc,c.acc,c.zero);
  if(result<0)return 1;
 }
 printf("RAM[0x80]=%u\n",c.ram[0x80]);return c.halted?0:1;
}