import { product } from '../model/productSchema.js'

export const productaddcontroller = {
    addproduct: async (req, res) => {
      const {
        productname,
        description,
        price,
        category,
        brand,
        size,
        color,
        userId
      } = req.body;
  
      let imageUrl = req.file ? req.file.filename : '';
  
      try {
      
        const existingproduct = await product.findOne({ productname });
  
        if (existingproduct) {
          return res.status(406).json("Product already exists");
        }
  
        const newProduct = new product({
          productname,
          description,
          price,
          category,
          brand,
          size,
          color,
          imageUrl,
          userId,
        });
  
        await newProduct.save();
        res.status(200).json(newProduct);
      } catch (err) {
        res.status(401).json(`Error Transaction Failed: ${err}`);
      }
    }
  };

export const getallproductcontroller = {
    getallproduct: async (req, res) => {
      const userId = req.user;
      const { category, minPrice, maxPrice, brand, size, color } = req.query;
  
      let filter = { userId };
  
      if (category) filter.category = category;
      if (brand) filter.brand = brand;
      if (size) filter.size = size;
      if (color) filter.color = color;
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = parseFloat(minPrice);
        if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
      }
  
      try {
        const filteredProducts = await product.find(filter);
        res.status(200).json(filteredProducts);
      } catch (err) {
        res.status(401).json(`Error !!! Transaction failed: ${err}`);
      }
    }
  };


export const deleteproductcontroller = {
    deleteproduct:async(req,res)=>{
        const {id} = req.params
    try {
       const removedproduct = await product.findByIdAndDelete({_id:id})
        res.status(200).json(removedproduct)
    } catch (err) {
        res.status(401).json(`Error !!! transaction Faile ${err}`)
    }
    }
}

export const updateproductcontroller = {
    updateproduct:async(req,res)=>{
        const userId = req.user 
    console.log("userId",userId); //userid
    const {productname,description,price,category,imageUrl} = req.body
    const uploadedimage = req.file?req.file.filename:imageUrl
    const {id} = req.params //project id
    console.log("req params: ",req.params);
    try{
        const updateproduct = await product.findByIdAndUpdate({_id:id},{productname,description,price,category,imageUrl:uploadedimage,userId},{new:true})
        await updateproduct.save()
        res.status(200).json(updateproduct)
        
    }catch (err){
        res.status(401).json(`Error !!! transaction Faile ${err}`)
    }
    }
}