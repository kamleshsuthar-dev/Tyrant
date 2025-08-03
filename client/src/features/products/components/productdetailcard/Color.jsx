import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useState } from 'react'


function Color({colors,selectedColor ,setSelectedColor}) {
   
  return (
     <div className="flex flex-col gap-1">
        <Label className="text-xl font-medium  ">Color</Label>
        <RadioGroup
          defaultValue={selectedColor}
          onValueChange={setSelectedColor}
          className=" flex gap-2"
        >
          {/* {colors.map((color) => (
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
          ))} */}
          {/* <div className='w-20 h-24  bg-["#FF0066"] rounded-lg' >
            <img src="https://placehold.co/87x94" alt="" className="h-full w-full rounded-lg" />
          </div> */}

          <div className="w-20 h-24 relative bg-primary-contrast rounded-xl   overflow-hidden">
            <img className="w-full h-full p-1 absolute rounded-xl z-20" src="https://placehold.co/87x94" />
          </div>
          <div className="w-20 h-24 relative bg-primary-contrast rounded-xl   overflow-hidden">
            <img className="w-full h-full p-1 absolute rounded-xl z-20" src="https://placehold.co/87x94" />
          </div>
          <div className="w-20 h-24 relative bg-primary-contrast rounded-xl   overflow-hidden">
            <img className="w-full h-full p-1 absolute rounded-xl z-20" src="https://placehold.co/87x94" />
          </div>
        </RadioGroup>
     </div>
  )
}

export default Color