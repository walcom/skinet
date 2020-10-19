using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IProductRepository
    {
         Task<Product> GetProductbyIdAsync(int id);
         Task<IReadOnlyList<Product>> GetProductsAsync();
    }
}