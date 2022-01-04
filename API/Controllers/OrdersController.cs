using System.Collections.Generic;
using System.Security.Claims;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities.OrderAggregates;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Extensions;
using API.Errors;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        public readonly IOrderService OrderService;
        public readonly IMapper Mapper;

        public OrdersController(IOrderService orderService, IMapper mapper)
        {
            this.Mapper = mapper;
            this.OrderService = orderService;
        }


        public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();
            var address = this.Mapper.Map<AddressDto, Address>(orderDto.ShipToAddress);

            var order = await OrderService.CreateOrderAsync(email, orderDto.DeliveryMethodId, 
                orderDto.BasketId, address);

            if(order == null)
                return BadRequest(new ApiResponse(400, "Problem Creating Order"));

            return Ok(order);
        }


        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetOrdersForUser()
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();
            var orders  = await OrderService.GetOrdersForUserAsync(email);

            return Ok(Mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderToReturnDto>>(orders));
            //return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderToReturnDto>> GetOrderByIdForUser(int id)
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();
            var order  = await OrderService.GetOrderByIdAsync(id, email);

            if(order == null)
                return NotFound(new ApiResponse(404));
            
            return Mapper.Map<Order, OrderToReturnDto>(order);
            //return order;
        }

        [HttpGet("deliveryMethods")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
        {
            return Ok(await OrderService.GetDeliveryMethodsAsync());
        }


    }
}