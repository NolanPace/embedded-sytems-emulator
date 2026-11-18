#include "cpu.h"
#include <string.h>
void cpu_reset(Cpu* c){memset(c,0,sizeof(*c));}
int cpu_load(Cpu* c,const uint8_t* data,size_t count){
 if(!data||count>256)return -1;
 cpu_reset(c);memcpy(c->ram,data,count);return 0;
}
int cpu_step(Cpu* c){
 if(c->halted)return 0;
 uint8_t opcode=c->ram[c->pc++],arg=0;
 switch(opcode){
  case 0x10:arg=c->ram[c->pc++];c->acc=arg;break;
  case 0x11:arg=c->ram[c->pc++];c->acc=(uint8_t)(c->acc+arg);break;
  case 0x20:arg=c->ram[c->pc++];c->ram[arg]=c->acc;break;
  case 0x21:arg=c->ram[c->pc++];c->acc=c->ram[arg];break;
  case 0x30:arg=c->ram[c->pc++];c->pc=arg;break;
  case 0x31:arg=c->ram[c->pc++];if(c->zero)c->pc=arg;break;
  case 0xff:c->halted=1;break;
  default:c->halted=1;return -1;
 }
 c->zero=(c->acc==0);
 c->cycles++;
 return c->halted?0:1;
}
