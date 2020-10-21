using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository repository;
        //private readonly StoreContext _context;

        public ProductsController(IProductRepository repository) //StoreContext context)
        {
            this.repository = repository;
            //this._context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts(){
            //return "return list of products";
            var products = await  repository.GetProductsAsync(); //_context.Products.ToListAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id){
            //return "Single product"; string
            return await repository.GetProductbyIdAsync(id); //_context.Products.FindAsync(id);
        }


        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetPRoductBrands(){
            return Ok(await repository.GetProductBrandsAsync());
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetPRoductTypes(){
            return Ok(await repository.GetProductTypesAsync());
        }   

    }
}