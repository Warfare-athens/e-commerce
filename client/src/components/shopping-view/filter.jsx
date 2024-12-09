import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

import {
  DropdownMenu,DropdownMenuContent,  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "../ui/button";


function ProductFilter({ filters, handleFilter }) {
  return (
    <DropdownMenu>
      <div >
        <div >
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Filters</Button>
        </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent>
          <div className="p-4 space-y-4">
            {Object.keys(filterOptions).map((keyItem) => (
              <Fragment key={keyItem}>
                <div>
                  <h3 className="text-base font-bold">{keyItem}</h3>
                  <div className="grid gap-2 mt-2">
                    {filterOptions[keyItem].map((option) => (
                      <Label key={option.id} className="flex font-medium items-center gap-2 ">
                        <Checkbox 
                          checked={
                            filters &&
                            Object.keys(filters).length > 0 &&
                            filters[keyItem] &&
                            filters[keyItem].indexOf(option.id) > -1
                          }
                          onCheckedChange={() => handleFilter(keyItem, option.id)}
                        />
                        {option.label}
                      </Label>
                    ))}
                  </div>
                </div>
                <Separator />
              </Fragment>
            ))}
          </div>
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
}

export default ProductFilter;