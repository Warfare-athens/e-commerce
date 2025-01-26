import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`relative cursor-pointer border-red-700 ${
        selectedId?._id === addressInfo?._id
          ? "border-red-900 border-[4px]"
          : "border-black"
      }`}
    >
      {selectedId?._id === addressInfo?._id ? (
        <div className="absolute flex items-center justify-center  text-white font-bold bg-green-400 rounded-md z-40 h-5 w-5 top-2 right-2"> ✓ </div>
      ) : (
        <div className="absolute flex items-center justify-center  text-black font-bold border border-black bg-white rounded-md z-40 h-5 w-5 top-2 right-2">  </div>
      )}
      
      <CardContent className="grid p-4 gap-4">
        <Label className="font-satoshi-medium">Address: <span className="font-satoshi-light"> {addressInfo?.address}</span></Label>
        <Label className="font-satoshi-medium">City: <span className="font-satoshi-light"> {addressInfo?.city}</span></Label>
        <Label className="font-satoshi-medium">pincode: <span className="font-satoshi-light">{addressInfo?.pincode}</span></Label>
        <Label className="font-satoshi-medium">Phone: <span className="font-satoshi-light">{addressInfo?.phone}</span></Label>
        <Label className="font-satoshi-medium">Notes: <span className="font-satoshi-light">{addressInfo?.notes}</span></Label>
      </CardContent>
      <CardFooter className="p-3 flex font-satoshi-medium justify-between">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;