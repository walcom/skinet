using System.Runtime.Serialization;

namespace Core.Entities.OrderAggregates
{
    public enum OrderStatus
    {
        [EnumMember(Value = "Pending")]
        pending, 
        [EnumMember(Value = "Payment Received")]
        PaymentReceived,
        [EnumMember(Value = "Payment Failed")]
        PaymentFailed
    };
}