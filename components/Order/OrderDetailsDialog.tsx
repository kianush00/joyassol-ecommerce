import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import PriceFormatter from "../Price/PriceFormatter";
import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "../ui/button";
import Link from "next/link";
import NoImageFallback from "../Image/NoImageFallback";

interface OrderDetailsDialogProps {
  order: MY_ORDERS_QUERYResult[number] | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailsDialog = ({
  order,
  isOpen,
  onClose,
}: OrderDetailsDialogProps) => {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-scroll bg-white">
        <DialogHeader>
          <DialogTitle>Detalles del pedido - {order.orderNumber}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p>
            <strong>Cliente:</strong> {order.customerName}
          </p>
          <p>
            <strong>Correo electrónico:</strong> {order.email}
          </p>
          <p>
            <strong>Fecha:</strong>{" "}
            <time dateTime={order.orderDate} suppressHydrationWarning>
              {order.orderDate &&
                new Date(order.orderDate).toLocaleDateString()}
            </time>
          </p>
          <p>
            <strong>Estado:</strong>{" "}
            <span className="capitalize text-green-600 font-medium">
              {order.status}
            </span>
          </p>
          <p>
            <strong>Número de factura:</strong> {order?.invoice?.number}
          </p>
          {order?.invoice && (
            <Button className="bg-transparent border text-darkColor/80 mt-2 hover:text-darkColor hover:border-darkColor hover:bg-darkColor/10 hoverEffect ">
              {order?.invoice?.hosted_invoice_url && (
                <Link href={order?.invoice?.hosted_invoice_url} target="_blank">
                  Descargar factura
                </Link>
              )}
            </Button>
          )}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Precio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.products?.map((product) => (
              <TableRow key={product?._key}>
                <TableCell className="flex items-center gap-2">
                  {product?.product?.images &&
                  product?.product?.images.length > 0 ? (
                    <Image
                      src={urlFor(product?.product?.images[0]).url()}
                      alt={product?.product?.name || "Producto sin nombre"}
                      width={50}
                      height={50}
                      className="border rounded-sm w-14 h-14 object-contain"
                    />
                  ) : (
                    <NoImageFallback className="border rounded-sm w-14 h-14" />
                  )}

                  {product?.product && (
                    <p className="line-clamp-1">{product?.product?.name}</p>
                  )}
                </TableCell>
                <TableCell>{product?.quantity}</TableCell>
                {product?.product?.price && product?.quantity && (
                  <TableCell>
                    <PriceFormatter
                      amount={product?.product?.price * product?.quantity}
                      className="text-black font-medium"
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 text-right flex items-center justify-end">
          <div className="w-44 flex flex-col gap-1">
            {order?.amountDiscount !== 0 && (
              <div className="w-full flex items-center justify-between">
                <strong>Descuento: </strong>
                <PriceFormatter
                  amount={order?.amountDiscount}
                  className="text-black font-bold"
                />
              </div>
            )}
            {order?.amountDiscount !== 0 && (
              <div className="w-full flex items-center justify-between">
                <strong>Subtotal: </strong>
                <PriceFormatter
                  amount={
                    (order?.totalPrice as number) +
                    (order?.amountDiscount as number)
                  }
                  className="text-black font-bold"
                />
              </div>
            )}
            <div className="w-full flex items-center justify-between">
              <strong>Total: </strong>
              <PriceFormatter
                amount={order?.totalPrice}
                className="text-black font-bold"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
