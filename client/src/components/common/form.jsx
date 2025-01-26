// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "../ui/select";
// import { Textarea } from "../ui/textarea";
// import { Button } from "../ui/button";

// function CommonForm({
//   formControls,
//   formData,
//   setFormData,
//   onSubmit,
//   buttonText,
//   isBtnDisabled,
// }) {
//   function renderInputsByComponentType(getControlItem) {
//     let element = null;
//     const value = formData[getControlItem.name] || "";

//     switch (getControlItem.componentType) {
//       case "input":
//         element = (
//           <Input
//             name={getControlItem.name}
//             placeholder={getControlItem.placeholder}
//             id={getControlItem.name}
//             type={getControlItem.type}
//             value={value}
//             onChange={(event) =>
//               setFormData({
//                 ...formData,
//                 [getControlItem.name]: event.target.value,
//               })
//             }
//           />
//         );

//         break;
//       case "select":
//         element = (
//           <Select
//             onValueChange={(value) =>
//               setFormData({
//                 ...formData,
//                 [getControlItem.name]: value,
//               })
//             }
//             value={value}
//           >
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder={getControlItem.label} />
//             </SelectTrigger>
//             <SelectContent>
//               {getControlItem.options && getControlItem.options.length > 0
//                 ? getControlItem.options.map((optionItem) => (
//                     <SelectItem key={optionItem.id} value={optionItem.id}>
//                       {optionItem.label}
//                     </SelectItem>
//                   ))
//                 : null}
//             </SelectContent>
//           </Select>
//         );

//         break;
//       case "textarea":
//         element = (
//           <Textarea
//             name={getControlItem.name}
//             placeholder={getControlItem.placeholder}
//             id={getControlItem.id}
//             value={value}
//             onChange={(event) =>
//               setFormData({
//                 ...formData,
//                 [getControlItem.name]: event.target.value,
//               })
//             }
//           />
//         );
//         break;
//       case "arrayInput":
//           element = (
//             <div>
//               {value.map((item, index) => (
//                 <div key={index} className="flex items-center gap-2">
//                   <Input
//                     value={item}
//                     onChange={(event) => {
//                       const newArray = [...value];
//                       newArray[index] = event.target.value;
//                       setFormData({
//                         ...formData,
//                         [getControlItem.name]: newArray,
//                       });
//                     }}
//                     placeholder={getControlItem.placeholder}
//                   />
//                   <Button
//                     type="button"
//                     onClick={() => {
//                       const newArray = value.filter((_, i) => i !== index);
//                       setFormData({
//                         ...formData,
//                         [getControlItem.name]: newArray,
//                       });
//                     }}
//                   >
//                     Remove
//                   </Button>
//                 </div>
//               ))}
//               <Button
//                 type="button"
//                 onClick={() => {
//                   setFormData({
//                     ...formData,
//                     [getControlItem.name]: [...value, ""],
//                   });
//                 }}
//               >
//                 Add
//               </Button>
//             </div>
//           );
//           break;
//       default:
//         element = (
//           <Input
//             name={getControlItem.name}
//             placeholder={getControlItem.placeholder}
//             id={getControlItem.name}
//             type={getControlItem.type}
//             value={value}
//             onChange={(event) =>
//               setFormData({
//                 ...formData,
//                 [getControlItem.name]: event.target.value,
//               })
//             }
//           />
//         );
//         break;
//     }

//     return element;
//   }

//   return (
//     <form onSubmit={onSubmit}>
//       <div className="flex flex-col font-satoshi gap-3">
//         {formControls.map((controlItem) => (
//           <div className="grid w-full gap-1.5" key={controlItem.name}>
//             <Label className="mb-1">{controlItem.label}</Label>
//             {renderInputsByComponentType(controlItem)}
//           </div>
//         ))}
//       </div>
//       <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
//         {buttonText || "Submit"}
//       </Button>
//     </form>
//   );
// }

// export default CommonForm;


import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
      case "arrayInput":
        element = (
          <div>
            {(Array.isArray(value) ? value : []).map((item, index) => (
              <div key={`${getControlItem.name}-${index}`} className="flex items-center gap-2">
                <Input
                  value={item}
                  onChange={(event) => {
                    const newArray = [...value];
                    newArray[index] = event.target.value;
                    setFormData({
                      ...formData,
                      [getControlItem.name]: newArray,
                    });
                  }}
                  placeholder={getControlItem.placeholder}
                />
                <Button
                  type="button"
                  onClick={() => {
                    const newArray = value.filter((_, i) => i !== index);
                    setFormData({
                      ...formData,
                      [getControlItem.name]: newArray,
                    });
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => {
                setFormData({
                  ...formData,
                  [getControlItem.name]: [...value, ""],
                });
              }}
            >
              Add
            </Button>
          </div>
        );
        break;
      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col font-satoshi gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} type="submit" className="mt-2 font-satoshi-medium w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
