using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers { 
    //[ApiController] 
    //[Route("api/[controller]")]
    public class ProductsController : BaseApiController // ControllerBase
    {
        //private readonly IProductRepository repository;
        private readonly IGenericRepository<Product> productsRepo;
        private readonly IGenericRepository<ProductType> productTypeRepo;
        private readonly IGenericRepository<ProductBrand> productBrandRepo;
        private readonly IMapper mapper;

        //private readonly StoreContext _context;

        // (//IProductRepository repository) //StoreContext context)
        public ProductsController(IGenericRepository<Product> productsRepo, 
            IGenericRepository<ProductType> productTypeRepo, 
            IGenericRepository<ProductBrand> productBrandRepo, 
            IMapper mapper)
        {
            this.productsRepo = productsRepo;
            this.productTypeRepo = productTypeRepo;
            this.productBrandRepo = productBrandRepo;
            this.mapper = mapper;

            //this.repository = repository;
            //this._context = context;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDTO>>> GetProducts( // IReadOnlyList
            [FromQuery]ProductSpecParams productSpecParams)
            //string sort, int? brandId, int? typeId) 
        {  // List<Product>
            //return " return list of products ";
            var spec=new ProductsWithTypesAndBrandsSpecification(productSpecParams); //sort, brandId, typeId);


            var countSpec = new ProductWithFiltersForCountSpecifications(productSpecParams);     
            var totalItems = await productsRepo.CountAsync(countSpec);

            
            //await  repository.GetProductsAsync(); //_context.Products.ToListAsync();
            var products = await productsRepo.ListAsync(spec); //.ListAllAsync();
            var data = mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDTO>>(products);
            
            return Ok(new Pagination<ProductToReturnDTO>(productSpecParams.PageIndex, productSpecParams.PageSize, 
                totalItems, data));
            //return Ok(products);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDTO>> GetProduct(int id){
            //return " Single product "; string
            //return await repository.GetProductbyIdAsync(id); //_context.Products.FindAsync(id);
            var spec=new ProductsWithTypesAndBrandsSpecification(id);

            //return await productsRepo.GetEntityWithSpec(spec); //.GetbyIdAsync(id);
            var product = await productsRepo.GetEntityWithSpec(spec);
            if(product==null)
                return NotFound(new ApiResponse(404));

            return mapper.Map<Product, ProductToReturnDTO>(product);

            /*return new ProductToReturnDTO{
                Id = product.Id, 
                Name=product.Name, 
                Description =product.Description,
                Price = product.Price,
                PictureUrl=product.PictureUrl,
                ProductBrand = product.ProductBrand.Name,
                ProductType=product.ProductType.Name
            };*/
        }


        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetPRoductBrands(){
            return Ok(await productBrandRepo.ListAllAsync());
            //repository.GetProductBrandsAsync());
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetPRoductTypes(){
            return Ok(await productTypeRepo.ListAllAsync());
             //repository.GetProductTypesAsync());
        }   

    }
}