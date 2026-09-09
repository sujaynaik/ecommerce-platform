import { ordersApi, Order, OrderStatus } from "@commerce/api";
import { Button, Heading, Text } from "@commerce/ui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./styles.css";
const key = ["orders"];
export default function App() {
  const client = useQueryClient();
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({ queryKey: key, queryFn: ordersApi.getAll });
  const update = useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      ordersApi.updateStatus(id, status),
    onSuccess: () => client.invalidateQueries({ queryKey: key }),
  });
  return (
    <section className="remote-panel">
      <div className="remote-heading">
        <div>
          <Text className="eyebrow">FULFILLMENT QUEUE</Text>
          <Heading level={2}>Orders</Heading>
        </div>
        <Text>{data.length} orders</Text>
      </div>
      {isLoading && <Text>Loading orders...</Text>}
      {isError && <Text>Unable to load orders.</Text>}
      <div className="order-list">
        {data.map((order: Order) => (
          <article className="order-row" key={order.id}>
            <div>
              <Text className="product-name">
                {order.id} · {order.customerName}
              </Text>
              <Text className="muted">
                {order.customerEmail} ·{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </Text>
            </div>
            <strong>${order.total.toFixed(2)}</strong>
            <select
              value={order.status}
              disabled={update.isPending}
              onChange={(event) =>
                update.mutate({
                  id: order.id,
                  status: event.target.value as OrderStatus,
                })
              }
            >
              {["PENDING", "PAID", "SHIPPED", "CANCELLED"].map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </article>
        ))}
      </div>
    </section>
  );
}
