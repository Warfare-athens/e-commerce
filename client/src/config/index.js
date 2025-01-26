export const registerFormControls = [
    {
      name: "userName",
      label: "User Name",
      placeholder: "Enter your user name",
      componentType: "input",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
  ];
  
  export const loginFormControls = [
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
  ];
  
  export const addProductFormElements = [
    {
      label: "Title",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "Enter product title",
    },
    {
      label: "Description",
      name: "description",
      componentType: "textarea",
      placeholder: "Enter product description",
    },
    {
      label: "Subtitle",
      name: "subtitle",
      componentType: "input",
      type: "text",
      placeholder: "Enter product subtitle",
    },
    {
      label: "size",
      name: "size", 
      componentType: "input",
      type: "text",
      placeholder: "Enter product size",
    },
    {
      label: "Category",
      name: "category",
      componentType: "select",
      options: [
        { id: "men", label: "Men" },
        { id: "women", label: "Women" },
        { id: "eye", label: "Eye" },
        { id: "brain", label: "Brain" },
        { id: "heart", label: "Heart" },
        { id: "sleep", label: "Sleep" },
        { id: "face", label: "Face" },
        { id: "body", label: "Body" },
        { id: "supplements", label: "Supplements" }
      ],
    },
    {
      label: "Brand",
      name: "brand",
      componentType: "select",
      options: [
        { id: "serum", label: "Serum" },
        { id: "moisturizer", label: "Moisturizer" },
        { id: "facewash", label: "Facewash" },
        { id: "eyecream", label: "Eye Cream" },
        { id: "supplements", label: "Supplements" },
        { id: "tablets", label: "Tablets" },
      ],
    },
    {
      label: "Price",
      name: "price",
      componentType: "input",
      type: "number",
      placeholder: "Enter product price",
    },
    {
      label: "Sale Price",
      name: "salePrice",
      componentType: "input",
      type: "number",
      placeholder: "Enter sale price (optional)",
    },
    {
      label: "Total Stock",
      name: "totalStock",
      componentType: "input",
      type: "number",
      placeholder: "Enter total stock",
    },
    {
      label: "Benefits",
      name: "benefits",
      componentType: "arrayInput",
      placeholder: "Enter product benefits",
    },
    {
      label: "Ingredients",
      name: "ingredients",
      componentType: "arrayInput",
      placeholder: "Enter product ingredients",
    },
    {
      label: "How to Use",
      name: "howToUse",
      componentType: "arrayInput",
      placeholder: "Enter how to use instructions",
    },
  ];
  
  export const shoppingViewHeaderMenuItems = [
    {
      id: "",
      label: "All",
      path: "/listing",
    },
    {
      id: "skin",
      label: "Skin care",
      path: "/listing",
    },
    {
      id: "face",
      label: "Face care",
      path: "/listing",
    },
    {
      id: "brain",
      label: "Brain Care",
      path: "/listing",
    },
    {
      id: "sleep",
      label: "Sleep Help",
      path: "/listing",
    },
    {
      id: "supplements",
      label: "Supplements",
      path: "/listing",
    },
    {
      id: "search",
      label: "search",
      path: "/search",
    },
  ];
  
  export const categoryOptionsMap = {
    men: "Men",
    women: "Women",
    skin: "Skin Care",
    face : "Face Care",
    sleep: "Sleep Help",
    brain: "Brain Health",
    supplements: "Supplements" 
  };
  
  export const brandOptionsMap = {
    serum: "Serum", 
    moisturizer :"Moisturizer" ,
    facewash: "Facewash" ,
    eyecream: "Eye Cream" ,
    supplements: "Supplements" ,
    tablets: "Tablets"
  };
  
  export const filterOptions = {
    category: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "skin", label: "Skin Care" },
      { id: "face", label: "Face Care" },
      { id: "sleep", label: "Sleep Help" },
      { id: "brain", label: "Brain Health" },
      { id: "supplements", label: "Supplements" },
    ],
    sub_category: [
      { id: "serum", label: "Serum" },
      { id: "moisturizer", label: "Moisturizer" },
      { id: "facewash", label: "Facewash" },
      { id: "eyecream", label: "Eye Cream" },
      { id: "supplements", label: "Supplements" },
      { id: "tablets", label: "Tablets" },
    ],
  };
  
  export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
  ];
  
  export const addressFormControls = [
    {
      label: "Address",
      name: "address",
      componentType: "input",
      type: "text",
      placeholder: "Enter your address",
    },
    {
      label: "City",
      name: "city",
      componentType: "input",
      type: "text",
      placeholder: "Enter your city",
    },
    {
      label: "Pincode",
      name: "pincode",
      componentType: "input",
      type: "text",
      placeholder: "Enter your pincode",
    },
    {
      label: "Phone",
      name: "phone",
      componentType: "input",
      type: "text",
      placeholder: "Enter your phone number",
    },
    {
      label: "Notes",
      name: "notes",
      componentType: "textarea",
      placeholder: "Enter any additional notes",
    },
  ];