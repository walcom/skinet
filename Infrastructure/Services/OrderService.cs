using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregates;
using Core.Interfaces;
using Core.Specifications;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        /* private readonly IGenericRepository<Order> orderRepo;
        private readonly IGenericRepository<DeliveryMethod> dmRepo;
        private readonly IGenericRepository<Product> productRepo; */
        private readonly IBasketRepository basketRepo;
        private readonly IUnitOfWork unitOfWork;

        public OrderService(
            /* IGenericRepository<Order> orderRepo,
            IGenericRepository<DeliveryMethod> dmRepo,
            IGenericRepository<Product> productRepo, */
            IBasketRepository basketRepo, IUnitOfWork unitOfWork)
        {
            this.basketRepo = basketRepo;
            this.unitOfWork = unitOfWork;
            /* this.productRepo = productRepo;
            this.orderRepo = orderRepo;
            this.dmRepo = dmRepo; */
        }

    public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
    {
        // get basket from the repo
        var basket = await basketRepo.GetBasketAsync(basketId);

        // get item from the product repo
        var items = new List<OrderItem>();
        foreach(var item in basket.Items)
        {
            //var productItem = await productRepo.GetbyIdAsync(item.Id);
            var productItem = await unitOfWork.Repository<Product>().GetbyIdAsync(item.Id);
            var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.PictureUrl);
            var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);

            items.Add(orderItem);
        }

        // get delivery method from repo
        //var deliveryMethod = await dmRepo.GetbyIdAsync(deliveryMethodId);
        var deliveryMethod = await unitOfWork.Repository<DeliveryMethod>().GetbyIdAsync(deliveryMethodId);

        // caclulate subtotal
        var subtotal = items.Sum(item => item.Price * item.Quantity);

        // create order
        var order = new Order(items, buyerEmail, shippingAddress , deliveryMethod, subtotal);
        unitOfWork.Repository<Order>().Add(order);

        // save to db
        var result = await unitOfWork.Complete();
        if(result <= 0)
            return null;

        // delete basket
        await basketRepo.DeleteBasketAsync(basketId);

        // return order
        return order;
    }

    public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
    {
        return await unitOfWork.Repository<DeliveryMethod>().ListAllAsync();
        //throw new System.NotImplementedException();
    }

    public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
    {
        var spec = new OrdersWithItemsAndOrderingSpecifications(id, buyerEmail);

        return await unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        //throw new System.NotImplementedException();
    }

    public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
    {
        var spec = new OrdersWithItemsAndOrderingSpecifications(buyerEmail);

        return await unitOfWork.Repository<Order>().ListAsync(spec);
        //throw new System.NotImplementedException();
    }
}
}