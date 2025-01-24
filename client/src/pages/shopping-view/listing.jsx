import ProductFilter from "@/components/shopping-view/filter";
// import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast"
import { sortOptions } from "@/config";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice/index.js";
import { addLocalCartItem, setLocalCartItems } from "@/store/shop/localcart-slice";
import {fetchAllFilteredProducts,fetchProductDetails,} from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";


function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }


  return queryParams.join("&");
}

function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  console.log('listing page user:::::::::' , user);
  
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();

  const categorySearchParam = searchParams.get("category");
  

  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId))
    .then(() => navigate(`/product/${getCurrentProductId}`));
  }



  const handleAddToCart = (product) => {
    // console.log('prodcut----------------',product);
    // console.log( 'user id check in handle Add to cart ----------' , user);
    
    if (!user){
      // Logic for unauthenticated user
      // console.log( 'we are in else block');
      dispatch(addLocalCartItem({
        productId: product._id,
        title: product.title,
        images: product.images,
        price: product.price,
        quantity:1,
      }));
      toast({ title: "Product is added to cart" });
    }
    else if (user){      
      console.log(  'user-----------' , user)
      dispatch(addToCart({ userId: user?.id, productId: product._id, quantity:1 })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          toast({ title: "Product is added to cart" });
        }
      });
    }
  };

  
    



  // const logLocalCartItems = () => {
  //   const localCartItems = getLocalCartItems();
  //   console.log('Local Cart Items:::::::::::::::::::::::::::::::::::::', localCartItems);
  // };


  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);


  return (
    <div className=" font-satoshi bg-[#e2dfda] gap-6 p-2 md:px-8 md:p-6 lg:px-12  xl:px-20">
      <div className=" w-full rounded-lg shadow-sm">
        <div className="p-2 border-b flex items-center justify-between">
          <h2 className="text-lg font-satoshi-medium  hidden md:block ">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground text-sm md:text-base">
              {productList?.length} Products
            </span>
            <ProductFilter filters={filters} handleFilter={handleFilter} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-2 md:gap-4  mt-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => ( 
                <ShoppingProductTile
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  handleAddtoCart={handleAddToCart}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default ShoppingListing;