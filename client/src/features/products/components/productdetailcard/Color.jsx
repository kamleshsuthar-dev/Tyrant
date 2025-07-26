import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useState } from 'react'


function Color({colors,selectedColor ,setSelectedColor}) {
   
  return (
     <div>
                       <Label className="text-xl">Color</Label>
                       <RadioGroup
                         defaultValue={selectedColor}
                         onValueChange={setSelectedColor}
                         className="mt-2 flex gap-2"
                       >
                         {colors.map((color) => (
                           <Label
                             key={color}
                             className={`h-8 w-8 cursor-pointer rounded-[11px] border-[3px] transition-transform duration-300 hover:translate-y-[-4px] hover:drop-shadow-[0_4px_9.6px_rgba(0,0,0,0.15)] ${
                               selectedColor === color
                                 ? "-translate-y-[2px] border-primary drop-shadow-[0_4px_9.6px_rgba(0,0,0,0.20)] hover:translate-y-[-2px] hover:border-primary"
                                 : "border-transparent"
                             }`}
                           >
                             <RadioGroupItem value={color} className="sr-only" />
                             <span
                               className="block h-full w-full rounded-[8px]"
                               style={{ backgroundColor: color }}
                             />
                           </Label>
                         ))}
                       </RadioGroup>
                     </div>
  )
}

export default Color