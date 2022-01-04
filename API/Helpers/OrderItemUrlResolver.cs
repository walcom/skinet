using API.Dtos;
using AutoMapper;
using Core.Entities.OrderAggregates;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    public class OrderItemUrlResolver : IValueResolver<OrderItem, OrderItemDto, string>        
    {
        private readonly IConfiguration config;

        public OrderItemUrlResolver(IConfiguration config)
        {
            this.config = config;
        }

        public string Resolve(OrderItem source, OrderItemDto destination, string destMember, ResolutionContext context)
        {
            if(!string.IsNullOrEmpty(source.ItemOrdered.PictureUrl))
                return config["ApiUrl"] + source.ItemOrdered.PictureUrl;

            return null;
            //throw new System.NotImplementedException();
        }
    }
}